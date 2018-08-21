var Blog = require('../../models/blog');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Blog Schema",
  "type": "object",
  "properties": {
    "_id": { "type": "string" },
    "status": { "type": "string" },
    "title": { "type": "string" },
    "subtitle": { "type": "string" },
    "by": { "type": "string" },
    "body": { "type": "string" },
    "img": { "type": "string" },
    "publishedOn": { "type": "date" },
    "createdOn": { "type": "date" },
  }
}

var writeFilterSchema = {
  "title": "Blog Schema",
  "type": "object",
  "properties": {
    "status": { "type": "string" },
    "title": { "type": "string" },
    "subtitle": { "type": "string" },
    "by": { "type": "string" },
    "body": { "type": "string" },
    "img": { "type": "string" },
    "publishedOn": { "type": "date" },
  }
}

restFilter = new RestFilter({
  path: "/blog",
  model: Blog,
  readFilterSchema: readFilterSchema,
  writeFilterSchema: writeFilterSchema,
	findOnePublic: function (id, callback) {
    Blog.findOne({"_id": id}).exec(function(err, result) {
      return callback(result);
    });
  },
	findOneToken: function (token, id, callback) { findOne(id, callback); },
	findOneUser: function (user, id, callback) { findOne(id, callback); },
	findManyPublic: function (callback) {
    Blog.find().exec(function(err, result) {
      return callback(result);
    });
  },
	findManyToken: function (token, callback) { findManyPublic(callback); },
	findManyUser: function (user, callback) { findManyPublic(callback); },
	security: {
		create: function (user, token) { return (user && user.isAdmin); },
		read: function (user, token) { return true; },
		update: function (user, token) { return (user && user.isAdmin); },
		destroy: function (user, token) { return false; },
  },
});

module.exports = restFilter.router;
