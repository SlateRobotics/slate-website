var StoreTemplate = require('./Template');
var DataService = require('../services/data');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/order');

var Store = new StoreTemplate(DataService.order);

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.ORDER_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.ORDER_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.ORDER_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
