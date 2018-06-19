var User = require('../../models/user');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
    "title": "User Schema",
    "type": "object",
    "properties": {
		"_id": {"type":"string"},
		"email": {"type":"string"},
		"firstName": {"type":"string"},
		"lastName": {"type":"string"},
		"isAdmin": {"type":"boolean"},
		"createdBy": {"type":"string"},
		"createdOn": {"type":"date"},
		"modifiedBy": {"type":"string"},
		"modifiedOn": {"type":"date"},
	},
}

var writeFilterSchema = {
    "title": "User Schema",
    "type": "object",
    "properties": {
		"firstName": {"type":"string"},
		"lastName": {"type":"string"},
		"isAdmin": {"type":"string"},
		"email": {"type":"string"},
	},
}

module.exports = new RestFilter({
	path : "/user",
	model: User,
	readFilterSchema: readFilterSchema,
	writeFilterSchema: writeFilterSchema,
	findOnePublic: function (id, callback) { return callback({}); },
	findOneToken: function (token, id, callback) { return callback({}); },
	findOneUser: function (user, id, callback) {
    if (!user) user = {};
    if (user.isAdmin) {
    	User.findOne({"_id": id}).exec(function (err, result) {
  			return callback(result);
  		});
    } else {
    	User.findOne({"_id": id}).where({$or: [{"_id": user.id}]})
        .exec(function (err, result) { return callback(result); });
    }
  },
	findManyPublic: function (callback) { return callback({}); },
	findManyToken: function (token, callback) { return callback({}); },
	findManyUser: function (user, callback) {
    if (!user) user = {};
    if (user.isAdmin) {
    	User.find().exec(function (err, result) { return callback(result); });
    } else {
    	User.find().where({$or: [{"_id": user.id}]})
        .exec(function (err, result) { return callback(result); });
    }
  },
	security: {
		create: function (user, token) { return (user && user.isAdmin); },
		read: function (user, token) { return (user && user.isAdmin) || token; },
		update: function (user, token) { return (user && user.isAdmin); },
		destroy: function (user, token) { return false; },
	}
});
