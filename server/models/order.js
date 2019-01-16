var restful = require('node-restful');
var mongoose = restful.mongoose;

var configSchema = new mongoose.Schema({
  name: String, // computer
  categoryLabel: String, // Computer
  label: String, // Nvidia TX2
  value: Number, // 0, 1, 2
  price: Number, // $300
});

var productSchema = new mongoose.Schema({
  productId: String, // tr1
  quantity: Number, // 1
  basePrice: Number, // 654.00
  subtotal: Number, //2624.00
  config: [], //[{name:'computer',value:0},{name:'shipping',value:1}]
});

var schema = new mongoose.Schema({
  token: String,
  reservationToken: String,
  status: String, // placed, assembling, assembled, shipped
  subtotal: Number,
  tax: Number,
  total: Number,
  discount: Number,
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
    country: String,
    carrier: String,
    trackingUrl: String,
    trackingNumber: String,
  },
  billing: {
    firstName: String,
    lastName: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  card: {
    token: String,
    last4: String,
  },
  trackingNumber: String,
  trackingUrl: String,
  beganBuildOn: Date, // utc
  shippedOn: Date, // utc
  expectedShipmentDate: Date, // utc
  createdOn: Date, // utc
});

module.exports = restful.model('order', schema);
