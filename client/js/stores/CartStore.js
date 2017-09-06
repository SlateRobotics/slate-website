var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/CartConstants.js');

var CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
  data: [],

  get: function (callback) {
    callback(this.data);
  },

  getOne: function (id, callback) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        callback(this.data[i]);
        return;
      }
    }
    callback(null);
  },

  insert: function(doc, callback) {
    this.data.push(doc);

    if (callback) {
      callback();
    }
  },

  update: function(doc, callback) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id == doc.id) {
        this.data[i] = doc;
        break;
      }
    }

    if (callback) {
      callback();
    }
  },

  delete: function(doc, callback) {
    var index = -1;
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id = doc.id) {
        index = i;
      }
    }

    if (index > -1) {
      this.data.splice(index, 1);
    }

    if (callback) {
      callback();
    }
  },

  emitChange: function() {
    this.get(function(docs) {
      this.emit(CHANGE_EVENT);
    }.bind(this), true);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.CART_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;
		case Constants.CART_INSERT:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
		case Constants.CART_DELETE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
