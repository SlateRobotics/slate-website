var Order = require('../../models/order');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Order Schema",
  "type": "object",
  "properties": {
    "_id": {"type":"string"},
    "token": {"type":"string"},
    "reservationToken": {"type":"string"},
    "status": { "type": "string" },
    "beganBuildOn": {"type":"date"},
    "shippedOn": {"type":"date"},
    "expectedShipmentDate": {"type":"date"},
    "createdOn": {"type":"date"},
    "subtotal": { "type": "string" },
    "tax": { "type": "string" },
    "total": { "type": "string" },
    "discount": { "type": "string" },
    "products": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "productId": { "type": "string" },
          "subtotal": { "type": "number" },
          "config": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": { "type": "string" },
                "value": { "type": "number" },
              }
            },
          }
        }
      }
    },
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
        "trackingUrl": { "type": "string" },
        "trackingNumber": { "type": "string" },
      }
    },
    "billing": {
      "type": "object",
      "properties": {
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
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
        "token": { "type": "string" },
        "last4": { "type": "string" },
      }
    },
  }
}

var writeFilterSchema = {
  "title": "Order Schema",
  "type": "object",
  "properties": {
    "_id": {"type":"string"},
    "token": {"type":"string"},
    "reservationToken": {"type":"string"},
    "status": { "type": "string" },
    "beganBuildOn": {"type":"date"},
    "shippedOn": {"type":"date"},
    "expectedShipmentDate": {"type":"date"},
    "createdOn": {"type":"date"},
    "expectedShipmentDate": { "type": "date" },
    "subtotal": { "type": "string" },
    "tax": { "type": "string" },
    "total": { "type": "string" },
    "discount": { "type": "string" },
    "products": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "productId": { "type": "string" },
          "subtotal": { "type": "number" },
          "config": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": { "type": "string" },
                "value": { "type": "number" },
              }
            },
          }
        }
      }
    },
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
        "trackingUrl": { "type": "string" },
        "trackingNumber": { "type": "string" },
      }
    },
    "billing": {
      "type": "object",
      "properties": {
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
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
        "token": { "type": "string" },
        "last4": { "type": "string" },
      }
    },
  }
}

restFilter = new RestFilter({
  path: "/order",
  model: Order,
  readFilterSchema: readFilterSchema,
  writeFilterSchema: writeFilterSchema,
	findOnePublic: function (id, callback) { return callback({}); },
	findOneToken: function (token, id, callback) {
    Order
      .findOne({
        "_id": id,
        "token": token,
      })
      .exec(function (err, result) {
        return callback(result);
      });
  },
	findOneUser: function (user, id, callback) {
    if (user.isAdmin) {
      Order
        .findOne({
          "_id": id,
        })
        .exec(function (err, result) {
          return callback(result);
        });
    } else {
      return callback({});
    }
  },
	findManyPublic: function (callback) { return callback([]); },
	findManyToken: function (token, callback) {
    return callback([]);
  },
	findManyUser: function (user, callback) {
    if (user.isAdmin) {
    	Order
    		.find()
    		.exec(function (err, result) {
    			return callback(result);
    		});
    } else {
      return callback([]);
    }
  },
	security: {
		create: function (user, token) { return false; },
		read: function (user, token) { return (user && user.isAdmin) || token; },
		update: function (user, token) { return (user && user.isAdmin); },
		destroy: function (user, token) { return false; },
  },
});

module.exports = restFilter.router;
