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

		var methods = {};

		var methodOrder = ['public','token','user'];
		if (config.methodOrderOne) methodOrder = config.methodOrderOne;

		// public access
		methods['public'] = function (lock) {
			if (config.security.read({})) {
				lock();
				if (!config.findOnePublic) return res.json({});
				return config.findOnePublic(id, function (doc) {
					if (config.beforeFilterOne) config.beforeFilterOne(doc);
					var result = filter(config.readFilterSchema, doc);
					if (config.afterFilterOne) config.afterFilterOne(result);
					return res.json(result);
				});
			}
		}

		// unauthenticated access w/ token
		methods['token'] = function (lock) {
			if (config.security.read({}, userAccessToken)) {
				lock();
				if (!config.findOneToken) return res.json({});
				return config.findOneToken(userAccessToken, id, function (doc) {
					if (config.beforeFilterOne) config.beforeFilterOne(doc);
					var result = filter(config.readFilterSchema, doc);
					if (config.afterFilterOne) config.afterFilterOne(result);
					return res.json(result);
				});
			}
		}

		// user-authenticated access
		// email and access token both required
		methods['user'] = function (lock) {
			if (req.cookies["accessToken"]) userAccessToken = req.cookies["accessToken"];
			var userAccessToken = userAccessToken || req.headers['accesstoken'] || req.cookies["accessToken"];
			if (!userEmail || !userAccessToken) return res.json({});

			lock();
			getUser(userEmail, userAccessToken, function (user) {
				if (config.security.read(user, userAccessToken)) {
					if (!config.findOneUser) return res.json({});
					return config.findOneUser(user, id, function (doc) {
						if (config.beforeFilterOne) config.beforeFilterOne(doc, user);
						var result = filter(config.readFilterSchema, doc);
						if (config.afterFilterOne) config.afterFilterOne(result, user);
						return res.json(result);
					});
				} else {
					return res.json({});
				}
			});
		}

		var isLocked = false;
		function lock () {
			isLocked = true;
		}

		for (var i = 0; i < methodOrder.length; i++) {
			if (!isLocked) {
				methods[methodOrder[i]](lock);
			}
		}

	}
}
