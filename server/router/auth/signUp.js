var bcrypt = require('bcrypt-nodejs');

var User = require('../../models/user');
var UserSetupRequest = require('../../models/userSetupRequest');

function sendFailedJson(res) {
  res.json({
		success: false,
		message: 'Registration failed. Invalid token or id. If you have submitted multiple registration requests,'
			+ 'you will need to use the most recent link or submit a new registration request.'
	});
}

module.exports = function (app) {
	app.post('/sign-up', function(req, res) {
		var email = req.headers['email'];
		var password = req.headers['password'];
		var userName = req.headers['username'];

		if (!email || !password || !userName) {
			return res.json({
				success: false,
				message: "One or more required fields not supplied.",
			});
		}

    if (password.length < 8) {
			return res.json({
				success: false,
				message: "Password length must be at least 8 characters.",
			});
    }

    if (password.length > 160) {
			return res.json({
				success: false,
				message: "Password length cannot be over 160 characters.",
			});
    }

    if (userName.length < 3) {
			return res.json({
				success: false,
				message: "User Name length must be at least 3 characters.",
			});
    }

    if (userName.length > 15) {
			return res.json({
				success: false,
				message: "User Name length cannot be over 15 characters.",
			});
    }

		User.findOne({
			"email": email
		}, function(err, user) {
			if (err) {
				throw err;
			}
			if (user) {
				return res.json({
					success: false,
					message: "There is already a user with that email address.",
				});
			} else if (!user) {
        User.findOne({
          "userName": userName
        }, function(err, user) {
    			if (err) {
    				throw err;
    			}
    			if (user) {
    				return res.json({
    					success: false,
    					message: "That user name is already taken.",
    				});
    			} else if (!user) {
    				user = new User();
            user.userName = userName;
    				user.email = email;
    				user.password = user.generateHash(password);

    				UserSetupRequest.findOne({
    					"email": user.email
    				}, function (err, userSetupRequest) {
    					// if there is no user but there has already been a registration request,
    					// create a new token (because we don't store them plan-text) and
    					// send it to the user's email address
    					if (!userSetupRequest) {
    						userSetupRequest = new UserSetupRequest();
    					}

              userSetupRequest.userName = user.userName;
    					userSetupRequest.email = user.email;
    					userSetupRequest.password = user.password;
    					userSetupRequest.attempts = 0;
    					userSetupRequest.isExpired = false;
    					userSetupRequest.generateTokenAndSendEmail(function () {
    						return res.json({
    							success: true,
    							message: 'User registration request successfully submitted. Check your email for instructions on how to complete your registration.',
    						});
    					});
    				});
          }
				});
			}
		});
	});

	app.post('/sign-up/:id', function(req, res) {
		var token = req.headers['token'];
		var id = req.params.id;

		if (!token) {
			return sendFailedJson(res);
		}

		UserSetupRequest.findOne({
			"_id": id
		}, function (err, userSetupRequest) {
			if (err) {
				console.log(err);
				return sendFailedJson(res);
			}

			if (userSetupRequest.isValidToken(token)) {
				var user = new User();
				user.userName = userSetupRequest.userName;
				user.email = userSetupRequest.email.toLowerCase();
				user.password = userSetupRequest.password;
        user.createdOn = new Date();
        user.modifiedOn = new Date();

				userSetupRequest.isExpired = true;
				userSetupRequest.password = null;
				userSetupRequest.save(function (err) {
					if (err) { console.log(err); }
				});

				user.save(function (err) {
					if (err) { console.log(err); }
					return res.json({
						success: true,
						message: 'User successfully registered. You may now login to the application.',
					});
				});
			} else {
				return sendFailedJson(res);
			}
		});
	});
}
