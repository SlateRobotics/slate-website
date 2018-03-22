var restful = require('node-restful');
var mongoose = restful.mongoose;

var schema = new mongoose.Schema({
  token: String,
  total: Number,
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
  },
  card: {
    token: String,
    last4: String,
  },
  createdOn: Date, // utc
});

module.exports = restful.model('reservation', schema);
