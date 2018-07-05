var restful = require('node-restful');
var mongoose = restful.mongoose;

var schema = new mongoose.Schema({
  sku: String,
  type: String, // raw materials, work in process, finished goods
  source: String, // 3d print, vendor, cnc, build
  description: String,
  stock: Number,
  price: Number,
  filament: Number,
  url: String,
  notes: String,
  parentAssemblySKU: String,
  createdOn: Date, // utc
});

module.exports = restful.model('inventoryItem', schema);
