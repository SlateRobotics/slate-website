var restful = require('node-restful');
var mongoose = restful.mongoose;

var configSchema = new mongoose.Schema({
  name: String, // computer
  value: Number, // 0, 1, 2
});

var productSchema = new mongoose.Schema({
  productId: String, // tr1
  subtotal: Number, //2624.00
  config: [], //[{name:'computer',value:0},{name:'shipping',value:1}]
});

var schema = new mongoose.Schema({
  subtotal: Number,
  tax: Number,
  total: Number,
  products: [productSchema],
  user: {
    id: String,
    email: String,
    phone: String,
  },
  shipping: {
    firstName: String,
    lastName: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
  },
  billing: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
  },
  card: {
    token: String,
    last4: String,
  },
});

module.exports = restful.model('order', schema);
