var Reservation = require('../../models/reservation');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Reservation Schema",
  "type": "object",
  "properties": {
    "_id": {"type":"string"},
    "token": {"type":"string"},
    "total": {"type":"string"},
    "status": {"type":"string"},
    "user": {
      "type": "object",
      "properties": {
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
        "email": { "type": "string" },
        "phone": { "type": "string" },
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
        "country": { "type": "string" },
      }
    },
    "card": {
      "type": "object",
      "properties": {
        "token": { "type": "string" },
        "last4": { "type": "string" },
      }
    },
    "trackingNumber": {"type":"string"},
    "trackingUrl": {"type":"string"},
    "beganBuildOn": {"type":"date"},
    "shippedOn": {"type":"date"},
    "expectedShipmentDate": {"type":"date"},
    "createdOn": {"type":"date"},
  },
}

var writeFilterSchema = {
  "title": "Reservation Schema",
  "type": "object",
  "properties": {
    "token": {"type":"string"},
    "total": {"type":"string"},
    "status": {"type":"string"},
    "user": {
      "type": "object",
      "properties": {
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
        "email": { "type": "string" },
        "phone": { "type": "string" },
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
        "country": { "type": "string" },
      }
    },
    "card": {
      "type": "object",
      "properties": {
        "token": { "type": "string" },
        "last4": { "type": "string" },
      }
    },
    "trackingNumber": {"type":"string"},
    "trackingUrl": {"type":"string"},
    "beganBuildOn": {"type":"date"},
    "shippedOn": {"type":"date"},
    "expectedShipmentDate": {"type":"date"},
    "createdOn": {"type":"date"},
  },
}

function findOne (user, id, callback) {
  if (user.isAdmin) {
  	Reservation
      .findOne({
        "_id": id,
      })
  		.exec(function (err, result) {
  			return callback(result);
  		});
  }
}

function findOneToken (token, id, callback) {
  Reservation
    .findOne({
      "_id": id,
      "token": token,
    })
    .exec(function (err, result) {
      return callback(result);
    });
}

function findMany (user, callback) {
  var userId = "";
  if (user && user._id) userId = user._id;
  if (user.isAdmin === true) {
  } else {
    return callback([]);
  }
}

restFilter = new RestFilter({
	path : "/reservation",
	model: Reservation,
	readFilterSchema: readFilterSchema,
	writeFilterSchema: writeFilterSchema,
	findOnePublic: function (id, callback) {
    return callback({});
  },
	findOneToken: function (token, id, callback) {
    Reservation
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
      Reservation
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
	findManyPublic: function (callback) {
    return callback([]);
  },
	findManyToken: function (token, callback) {
    return callback([]);
  },
	findManyUser: function (user, callback) {
    if (user.isAdmin) {
    	Reservation
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
