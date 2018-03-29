var filter = require('../JsonFilter');
var moment = require('moment');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res, next) {
		var userEmail = req.session.email;
		var userAccessToken = req.headers['accesstoken'];

		if (!userEmail || !userAccessToken) {
			return res.status(401).json(config.invalidRequest);
		}

		req.body = filter(config.writeFilterSchema, req.body);

		getUser(userEmail, userAccessToken, function (user) {

			var requestSecurity = new RequestSecurity({
				method : req.method,
				user: user,
				securityRoles: config.securityRoles
			});

			if (!requestSecurity.isAuthorized()) {
				return res.status(401).json(config.invalidRequest);
			}
;
			req.body.createdBy = user._id;
			req.body.createdOn = moment();
			req.body.modifiedBy = user._id;
			req.body.modifiedOn = moment();

			return next();
		});
	}
}
