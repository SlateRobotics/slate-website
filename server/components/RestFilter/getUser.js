var User = require('../../models/user');

module.exports = function(userId, callback) {
	User
		.findOne({"_id": userId})
		.exec(function (err, user) {
			return callback(user);
		});
}
