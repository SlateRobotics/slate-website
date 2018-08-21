var filter = require('../JsonFilter');
var moment = require('moment');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res, next) {
		var id = req.params.id;
		var userEmail = req.session.email || req.query.email;
		var userAccessToken = req.query.token || req.query.accessToken;

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
				if (req.body) {
					if (config.trackWithUserName) {
						req.body.modifiedBy = user.userName;
					} else {
						req.body.modifiedBy = user._id;
					}
					var currentDate = new Date(new Date().toUTCString());
					req.body.modifiedOn = currentDate;
				}
				return next();
			} else {
				return res.status(401).json(config.invalidRequest);
			}
		});
	}

}
