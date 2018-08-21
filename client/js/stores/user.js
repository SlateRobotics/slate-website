var StoreTemplate = require('./Template');
var DataService = require('../services/data');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/user');
var $ = require('jquery');

var Store = new StoreTemplate(DataService.user);

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

Store.me = {};
Store.getMe = function (callback) {
	if (Store.me._id) {
		return callback(Store.me);
	}

  $.ajax({
    url: '/stores/me',
    type: 'GET',
		contentType: "application/json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
			Store.me = data;
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.USER_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.USER_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.USER_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
