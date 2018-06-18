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
		"isAdmin": {"type":"boolean"},
		"email": {"type":"string"},
	},
}

function findOne (user, id, callback) {
  var userId = "";
  if (user && user._id) userId = user._id;
  if (user.isAdmin) {
  	User
  		.findOne({"_id": id})
  		.exec(function (err, result) {
  			return callback(result);
  		});
  } else {
  	User
  		.findOne({"_id": id})
  		.where({
  			$or: [
  				{"_id": userId},
  			]
  		})
  		.exec(function (err, result) {
  			return callback(result);
  		});
  }
}

function findMany (user, callback) {
  var userId = "";
  if (user && user._id) userId = user._id;
  if (user.isAdmin) {
  	User
  		.find()
  		.exec(function (err, result) {
  			return callback(result);
  		});
  } else {
  	User
  		.find()
  		.where({
  			$or: [
  				{"_id": userId},
  			]
  		})
  		.exec(function (err, result) {
  			return callback(result);
  		});
  }
}

module.exports = new RestFilter({
	path : "/user",
	model: User,
	readFilterSchema: readFilterSchema,
	writeFilterSchema: writeFilterSchema,
	findOne: findOne,
	findMany: findMany,
	securityRoles: {
		create: UserSecurity.isNotAllowed,
		read: UserSecurity.isAllowed,
		update: UserSecurity.isActiveUser,
		destroy: UserSecurity.isNotAllowed,
	}
});
