var filter = require('../JsonFilter');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res) {
		var id = req.params.id;
		var userEmail = req.session.email;
		var userAccessToken = req.headers['accesstoken'];

		if (config.isPublicRead || !userEmail || !userAccessToken) {
			// don't need user-specific authentication
			if (config.securityRoles.read({})) {
				return config.findOne(userAccessToken, id, function (doc) {
					return res.json(doc);
				});
			}
		}

		// token-based authentication
		if (config.securityRoles.read(userAccessToken) == true) {
			return config.findOne(userAccessToken, id, function (doc) {
				if (doc && doc._id) {
					var result = filter(config.readFilterSchema, doc);
					return res.json(result);
				}

				return res.json({});
			});
		}

		if (!userEmail || !id) {
			return res.status(401).json(config.invalidRequest);
		}

		getUser(userEmail, function (user) {

			var requestSecurity = new RequestSecurity({
				method : req.method,
				user: user,
				securityRoles: config.securityRoles
			});

			if (!requestSecurity.isAuthorized()) {
				return res.status(401).json(config.invalidRequest);
			}

			config.findOne(user, id, function (doc) {
				if (doc && doc._id) {
					var result = filter(config.readFilterSchema, doc);
					return res.json(result);
				}

				return res.json({});
			});
		});
	}

}
