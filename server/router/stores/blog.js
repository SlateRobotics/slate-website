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

function findOne(token, id, callback) {
  Blog
    .findOne({
      "_id": id,
    })
    .exec(function(err, result) {
      return callback(result);
    });
}

function findMany(user, callback) {
  Blog
    .find({
      "status": "active",
    })
    .exec(function(err, result) {
      return callback(result);
    });
}

module.exports = new RestFilter({
  path: "/blog",
  model: Blog,
  readFilterSchema: readFilterSchema,
  writeFilterSchema: writeFilterSchema,
  findOne: findOne,
  findMany: findMany,
  isPublicRead: true,
  securityRoles: {
    create: UserSecurity.isAdmin,
    read: UserSecurity.isAllowed,
    update: UserSecurity.isAdmin,
    destroy: UserSecurity.isAdmin,
  }
});
