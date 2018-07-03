var filter = require('../JsonFilter');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res) {
		var userEmail = req.session.email || req.query.email;
		var userAccessToken = req.query.token || req.query.accessToken;

		// public access
		if (config.security.read()) {
			if (!config.findManyPublic) return res.json([]);
			return config.findManyPublic(function (docs) {
				if (!docs) docs = [];
				var result = [];
				for (var i = 0; i < docs.length; i++) {
					result.push(filter(config.readFilterSchema, docs[i]));
				}
				return res.json(result);
			});
		}

		// unauthenticated access w/ token
		if (config.security.read(null, userAccessToken)) {
			if (!config.findManyToken) return res.json([]);
			return config.findManyToken(userAccessToken, function (docs) {
				if (!docs) docs = [];
				var result = [];
				for (var i = 0; i < docs.length; i++) {
					result.push(filter(config.readFilterSchema, docs[i]));
				}
				return res.json(result);
			});
		}

		// user-authenticated access
		// email and access token both required
		if (req.cookies["accessToken"]) userAccessToken = req.cookies["accessToken"];
		var userAccessToken = userAccessToken || req.headers['accesstoken'] || req.cookies["accessToken"];
		if (!userEmail || !userAccessToken) return res.json([]);
		getUser(userEmail, userAccessToken, function (user) {
			if (config.security.read(user, userAccessToken)) {
				if (!config.findManyUser) return res.json([]);
				return config.findManyUser(user, function (docs) {
					if (!docs) docs = [];
					var result = [];
					for (var i = 0; i < docs.length; i++) {
						result.push(filter(config.readFilterSchema, docs[i]));
					}
					return res.json(result);
				});
			} else {
				return res.json([]);
			}
		});
	}

}
