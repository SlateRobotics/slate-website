// A little recursive magic to ensure that unnecessary requests
// aren't sent to the server. I should probably decouple this into
// it's own component at some point.

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

module.exports = function(ApiService) {

  this._docs = [];

  this.getParams = function (opts) {
    if (opts.params) {
      return opts.params;
    }

    if (opts.allAttributes === false) {
      return "s=!layers"
    } else {
      return "";
    }
  }.bind(this);

  this.get = function(opts) {
    if (!opts) opts = {};
    if (opts.id) return this.getOne(opts);
    var params = this.getParams(opts);
    if (this._docs.length === 0 || opts.refresh === true) {
      ApiService.get(params, function(docs) {
        this._docs = docs;
        opts.success(this._docs);
        this.Store.emitChange();
      }.bind(this));
    } else {
      opts.success(this._docs);
    }
  }.bind(this);

  this.getOne = function(opts) {
    if (!opts) opts = {};
    var params = this.getParams(opts);

    if (!opts.refresh) {
      for (var i = 0; i < this._docs.length; i++) {
        if (this._docs[i]._id == opts.id) {
          return opts.success(this._docs[i]);
        }
      }
    }

    ApiService.getOne(opts.id, params, function (doc) {
      this.replaceOne(doc);
      opts.success(doc);
      this.Store.emitChange();
    }.bind(this));
  }.bind(this);

  this.find = function () {
    return this._docs;
  }.bind(this);

  this.findOne = function (id) {
    var doc = '';
    for (var i = 0; i < this._docs.length; i++) {
      if (this._docs[i]._id === id) {
        doc = this._docs[i];
        break;
      }
    }
    return doc;
  }.bind(this);

  this.replaceOne = function (doc) {
    var replaced = false;
    for (var i = 0; i < this._docs.length; i++) {
      if (this._docs[i].name === doc.name) {
        replaced = true;
  			this._docs[i] = doc;
      }
    }
    if (!replaced) {
      this._docs.push(doc);
    }
    this.Store.emitChange();
  }.bind(this);

  this.Store = assign({}, EventEmitter.prototype, {
    get: this.get,
    getOne: this.getOne,
    find: this.find,
    findOne: this.findOne,

    insert: function(doc, callback) {
      ApiService.insert(doc, callback);
    },

    update: function(doc, callback) {
      ApiService.update(doc, callback);
    },

    delete: function(doc, callback) {
      ApiService.delete(doc, callback);
    },

    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  });

  return this.Store;

}
