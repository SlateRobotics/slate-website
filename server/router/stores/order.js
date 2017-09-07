var NeuralNetwork = require('../../models/neuralnetwork');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Order Schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "description": { "type": "string" },
    "authors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "url": { "type": "string" },
        }
      },
    },
  }
}

var writeFilterSchema = {
  "title": "Order Schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "description": { "type": "string" },
    "authors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "url": { "type": "string" },
        }
      },
    },
  }
}

function findOne(user, id, callback) {
  if (!user) return callback({});
  Order
    .findOne({
      "_id": id,
      "user.id": user.id,
    })
    .exec(function(err, result) {
      return callback(result);
    });
}

function findMany(user, callback) {
  if (!user) return callback([]);
  Order
    .find({
      "user.id": user.id,
    })
    .exec(function(err, result) {
      return callback(result);
    });
}

module.exports = new RestFilter({
  path: "/order",
  model: Order,
  readFilterSchema: readFilterSchema,
  writeFilterSchema: writeFilterSchema,
  findOne: findOne,
  findMany: findMany,
  securityRoles: {
    create: UserSecurity.isNotAllowed,
    read: UserSecurity.isActiveUser,
    update: UserSecurity.isNotAllowed,
    destroy: UserSecurity.isNotAllowed,
  }
});
