var StoreTemplate = require('./Template');
var DataService = require('../services/data');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/order');

var Store = new StoreTemplate(DataService.inventoryItem);

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.INVENTORYITEM_INSERT:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.INVENTORYITEM_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.INVENTORYITEM_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
