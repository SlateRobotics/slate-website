module.exports = {

	types: {
		token: 0,
		user: 1,
		userOrToken: 2,
	},

	isNotAllowed: function (user) {
		return false;
	},

	isAllowed: function (user) {
		return true;
	},

	isActiveUser: function (user) {
		if (user && user._id) {
			return true;
		} else {
			return false;
		}
	},

	isAdmin: function (user) {
		if (user.isAdmin === true) {
			return true;
		} else {
			return false;
		}
	},

}
