var StoreTemplate = require('./Template');
var DataService = require('../services/data');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/reservation');

var Store = new StoreTemplate(DataService.reservation);

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.RESERVATION_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.RESERVATION_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.RESERVATION_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
