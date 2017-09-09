// A little recursive magic to ensure that unnecessary requests
// aren't sent to the server. I should probably decouple this into
// it's own component at some point.

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

module.exports = function(ApiService) {

  this._docs = [];

  this.get = function(opts) {
    var params = this.getParams(opts);
    if (this._docs.length === 0 || opts.refresh === true) {
      ApiService.get(params, function(docs) {
        this._docs = docs;
        opts.success(this._docs);
      }.bind(this));
    } else {
      opts.success(this._docs);
    }
  }.bind(this);

  this.getOne = function(opts) {
    var id = opts.id;
    if (!id && opts.doc) {
      id = opts.doc._id || opts.doc.id;
    }

    var success = function (doc) {
      this.replaceOne(doc);
      if (opts.success) {
        opts.success(doc);
      } else {
        var message = ApiService.name + "store call succeeded, but no ";
        message += "success function was defined in options";
        console.warn(message);
      }
    }.bind(this);

    var error = function (error) {
      if (opts.error) {
        opts.error(error);
      } else {
        var message = "An error occurred in the " + ApiService.name + "store";
        message += ", but no error function was defined in options";
        console.error(message);
      }
    }

    if (!id) {
      error({eror:"getOne method requires an ID via id or doc option"});
      return;
    }

    var url = opts.id;
    if (opts.params) { url += opts.params; }
    ApiService.getOne(url, success, error);
  }.bind(this);

  this.findOne = function (id) {
    var doc = '';
    for (var i = 0; i < this._docs.length; i++) {
      if (this._docs[i].name === id) {
        if (allAttributes === true && this._docs[i].layers) {
          doc = this._docs[i];
          break;
        } else if (!allAttributes) {
          doc = this._docs[i];
          break;
        }
      }
    }
    return doc;
  }.bind(this);

  this.replaceOne = function (doc) {
    for (var i = 0; i < this._docs.length; i++) {
      if (this._docs[i].name === doc.name) {
  			Object.keys(doc).forEach(function(key, index) {
  				this._docs[i][key] = doc[key];
  			}.bind(this));
      }
    }
  }.bind(this);

  this.Store = assign({}, EventEmitter.prototype, {
    get: this.get,
    getOne: this.getOne,

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

  return this.Store;

}
