var restful = require('node-restful');
var mongoose = restful.mongoose;

var questionSchema = new mongoose.Schema ({
  name: String,
  answer: String,
  type: String,
});

var schema = new mongoose.Schema ({
  name: String,
  position: String,
  email: String,
  phone: String,
  questions: [questionSchema],
});

module.exports = restful.model('application', schema);
