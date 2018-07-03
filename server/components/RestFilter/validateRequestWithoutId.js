var filter = require('../JsonFilter');
var moment = require('moment');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res, next) {
	var userEmail = req.session.email || req.query.email;
	var userAccessToken = req.query.token || req.query.accessToken;

		// public access
		if (config.security.create()) {
			return next();
		}

		// unauthenticated access w/ token
		if (config.security.create(null, userAccessToken)) {
			return next();
		}

		// user-authenticated access
		// email and access token both required
		if (req.cookies["accessToken"]) userAccessToken = req.cookies["accessToken"];
		var userAccessToken = userAccessToken || req.headers['accesstoken'] || req.cookies["accessToken"];
		if (!userEmail || !userAccessToken) return res.status(401).json(config.invalidRequest);
		getUser(userEmail, userAccessToken, function (user) {
			if (config.security.create(user, userAccessToken)) {
				return next();
			} else {
				return res.status(401).json(config.invalidRequest);
			}
		});
	}
}
