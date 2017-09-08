var Order = require('../../models/order');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Order Schema",
  "type": "object",
  "properties": {
    "status": { "type": "string" },
    "createdOn": { "type": "date" },
    "subtotal": { "type": "string" },
    "tax": { "type": "string" },
    "total": { "type": "string" },
    "user": {
      "type": "object",
      "properties": {
        "email": { "type": "string" },
        "phone": { "type": "string" },
      }
    },
    "shipping": {
      "type": "object",
      "properties": {
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
        "address1": { "type": "string" },
        "address2": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "zip": { "type": "string" },
        "shippedOn": { "type": "string" },
        "carrier": { "type": "string" },
        "trackingNumber": { "type": "string" },
      }
    },
    "billing": {
      "type": "object",
      "properties": {
        "address1": { "type": "string" },
        "address2": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "zip": { "type": "string" },
      }
    },
    "card": {
      "type": "object",
      "properties": {
        "last4": { "type": "string" },
      }
    },
  }
}

var writeFilterSchema = {
  "title": "Order Schema",
  "type": "object",
  "properties": {
    "status": { "type": "string" },
    "createdOn": { "type": "date" },
    "subtotal": { "type": "string" },
    "tax": { "type": "string" },
    "total": { "type": "string" },
    "user": {
      "type": "object",
      "properties": {
        "email": { "type": "string" },
        "phone": { "type": "string" },
      }
    },
    "shipping": {
      "type": "object",
      "properties": {
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
        "address1": { "type": "string" },
        "address2": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "zip": { "type": "string" },
        "shippedOn": { "type": "string" },
        "carrier": { "type": "string" },
        "trackingNumber": { "type": "string" },
      }
    },
    "billing": {
      "type": "object",
      "properties": {
        "address1": { "type": "string" },
        "address2": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "zip": { "type": "string" },
      }
    },
    "card": {
      "type": "object",
      "properties": {
        "last4": { "type": "string" },
      }
    },
  }
}

function findOne(user, id, callback) {
  Order
    .findOne({
      "_id": id,
    })
    .exec(function(err, result) {
      return callback(result);
    });
}

function findMany(user, callback) {
  callback([]);
  // Order
  //   .find({
  //     "user.id": user.id,
  //   })
  //   .exec(function(err, result) {
  //     return callback(result);
  //   });
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
    read: UserSecurity.isAllowed,
    update: UserSecurity.isNotAllowed,
    destroy: UserSecurity.isNotAllowed,
  }
});
