var StoreTemplate = require('./Template');
var DataService = require('../services/data');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/doc');

var Store = new StoreTemplate(DataService.doc);

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.DOC_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.DOC_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.DOC_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
