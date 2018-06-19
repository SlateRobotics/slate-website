var filter = require('../JsonFilter');
var moment = require('moment');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res, next) {
		var id = req.params.id;
		var userEmail = req.session.email || req.query.email;
		var userAccessToken = req.query.accessToken || req.query.token;

		// id required
		if (!id) {
			return res.status(401).json(config.invalidRequest);
		}

		// public access
		if (config.security.update({})) {
			return next();
		}

		// unauthenticated access w/ token
		if (config.security.update({}, userAccessToken)) {
			return next();
		}

		// user-authenticated access
		// email and access token both required
		if (req.cookies["accessToken"]) userAccessToken = req.cookies["accessToken"];
		var userAccessToken = userAccessToken || req.headers['accesstoken'] || req.cookies["accessToken"];
		if (!userEmail || !userAccessToken) return res.status(401).json(config.invalidRequest);
		getUser(userEmail, userAccessToken, function (user) {
			if (config.security.update(user, userAccessToken)) {
				return next();
			} else {
				return res.status(401).json(config.invalidRequest);
			}
		});
	}

}
