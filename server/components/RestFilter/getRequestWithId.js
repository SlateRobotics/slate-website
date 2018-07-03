var filter = require('../JsonFilter');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res) {
		var id = req.params.id;
		var userEmail = req.session.email || req.query.email;
		var userAccessToken = req.query.token || req.query.accessToken;

		// id required
		if (!id) {
			return res.status(401).json(config.invalidRequest);
		}

		// public access
		if (config.security.read({})) {
			if (!config.findOnePublic) return res.json({});
			return config.findOnePublic(id, function (doc) {
				var result = filter(config.readFilterSchema, doc);
				return res.json(result);
			});
		}

		// unauthenticated access w/ token
		if (config.security.read({}, userAccessToken)) {
			if (!config.findOneToken) return res.json({});
			return config.findOneToken(userAccessToken, id, function (doc) {
				var result = filter(config.readFilterSchema, doc);
				return res.json(result);
			});
		}

		// user-authenticated access
		// email and access token both required
		if (req.cookies["accessToken"]) userAccessToken = req.cookies["accessToken"];
		var userAccessToken = userAccessToken || req.headers['accesstoken'] || req.cookies["accessToken"];
		if (!userEmail || !userAccessToken) return res.json({});
		getUser(userEmail, userAccessToken, function (user) {
			if (config.security.read(user, userAccessToken)) {
				if (!config.findOneUser) return res.json({});
				return config.findOneUser(user, id, function (doc) {
					var result = filter(config.readFilterSchema, doc);
					return res.json(result);
				});
			} else {
				return res.json({});
			}
		});
	}

}
