var filter = require('../JsonFilter');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res) {
		var userEmail = req.session.email;
		var userAccessToken = req.headers['accesstoken'];

		if (req.query.email) userEmail = req.query.email;
		if (req.query.accessToken) userAccessToken = req.query.accessToken;

		if (config.isPublicRead || !userAccessToken || !userEmail) {
			// don't need user-specific authentication
			if (config.securityRoles.read({})) {
				return config.findMany({}, function (docs) {
					var result = [];
					if (docs) {
						for (i=0;i<docs.length;i++) {
							result.push(filter(config.readFilterSchema, docs[i]));
						}
					}
					return res.json(result);
				});
			}
		}

		if (!userEmail) {
			return res.status(401).json(config.invalidRequest);
		}

		getUser(userEmail, userAccessToken, function (user) {
			var requestSecurity = new RequestSecurity({
				method : req.method,
				user: user,
				securityRoles: config.securityRoles
			});

			if (!requestSecurity.isAuthorized()) {
				return res.status(401).json(config.invalidRequest);
			}

			config.findMany(user, function (docs) {
				var result = [];
				if (docs) {
					for (i=0;i<docs.length;i++) {
						result.push(filter(config.readFilterSchema, docs[i]));
					}
				}
				return res.json(result);
			});
		});
	}

}
