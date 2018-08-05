var restful = require('node-restful');
var mongoose = restful.mongoose;

var schema = new mongoose.Schema({
  status: String,
  title: String,
  subtitle: String,
  by: String,
  img: String,
  body: String,
  publishedOn: Date, // utc
  createdOn: Date, // utc
});

module.exports = restful.model('blog', schema);
