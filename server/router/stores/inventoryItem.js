var InventoryItem = require('../../models/inventoryItem');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Blog Schema",
  "type": "object",
  "properties": {
    "_id": { "type": "string" },
    "sku": { "type": "string" },
    "parentAssemblySKU": { "type": "string" },
    "type": { "type": "string" },
    "filament": { "type": "string" },
    "source": { "type": "string" },
    "description": { "type": "string" },
    "stock": { "type": "Number" },
    "price": { "type": "Number" },
    "url": { "type": "string" },
    "notes": { "type": "string" },
    "createdOn": { "type": "date" },
  }
}

var writeFilterSchema = {
  "title": "Blog Schema",
  "type": "object",
  "properties": {
    "sku": { "type": "string" },
    "parentAssemblySKU": { "type": "string" },
    "type": { "type": "string" },
    "filament": { "type": "string" },
    "source": { "type": "string" },
    "description": { "type": "string" },
    "stock": { "type": "Number" },
    "price": { "type": "Number" },
    "url": { "type": "string" },
    "notes": { "type": "string" },
    "createdOn": { "type": "date" },
  }
}

module.exports = new RestFilter({
  path: "/inventoryItem",
  model: InventoryItem,
  readFilterSchema: readFilterSchema,
  writeFilterSchema: writeFilterSchema,
	findOnePublic:  function (id, callback) { callback({}); },
	findOneToken: function (token, id, callback) { callback({}); },
	findOneUser: function (user, id, callback) {
    if (user.isAdmin) {
      InventoryItem
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
	findManyPublic:  function (callback) { callback([]); },
	findManyToken: function (token, callback) { callback([]); },
	findManyUser: function (user, callback) {
    if (user.isAdmin) {
    	InventoryItem
    		.find()
    		.exec(function (err, result) {
    			return callback(result);
    		});
    } else {
      return callback([]);
    }
  },
	security: {
		create: function (user, token) { return (user && user.isAdmin); },
		read: function (user, token) { return (user && user.isAdmin); },
		update: function (user, token) { return (user && user.isAdmin); },
		destroy: function (user, token) { return (user && user.isAdmin); },
  },
});
