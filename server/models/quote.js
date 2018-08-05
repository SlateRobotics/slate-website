var restful = require('node-restful');
var mongoose = restful.mongoose;

var schema = new mongoose.Schema({
  token: String,
  shippingDiscount: Number,
});

module.exports = restful.model('quote', schema);
