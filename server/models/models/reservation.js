var restful = require('node-restful');
var mongoose = restful.mongoose;

var schema = new mongoose.Schema({
  token: String,
  total: Number,
  status: String,
  user: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  billing: {
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

module.exports = restful.model('reservation', schema);
