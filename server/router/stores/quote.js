var Quote = require('../../models/quote');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Reservation Schema",
  "type": "object",
  "properties": {
    "_id": {"type":"string"},
    "token": {"type":"string"},
    "shippingDiscount": {"type":"string"},
  },
}

var writeFilterSchema = {
  "title": "Reservation Schema",
  "type": "object",
  "properties": {
    "_id": {"type":"string"},
    "token": {"type":"string"},
    "shippingDiscount": {"type":"string"},
  },
}

function findOne (user, id, callback) {
  if (user.isAdmin) {
  	Quote
      .findOne({
        "_id": id,
      })
  		.exec(function (err, result) {
  			return callback(result);
  		});
  }
}

function findOneToken (token, id, callback) {
  Quote
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

var restFilter = new RestFilter({
	path : "/reservation",
	model: Reservation,
	readFilterSchema: readFilterSchema,
	writeFilterSchema: writeFilterSchema,
	findOnePublic: function (id, callback) {
    return callback({});
  },
	findOneToken: function (token, id, callback) {
    Quote
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
      Quote
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
    	Quote
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

module.exports = restFilter.route;
