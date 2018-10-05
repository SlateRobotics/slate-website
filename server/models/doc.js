var restful = require('node-restful');
var mongoose = restful.mongoose;

var toc = new mongoose.Schema({
  name: String,
  link: String,
});

var schema = new mongoose.Schema({
  status: String,
  title: String,
  toc: [toc],
  ordinal: Number,
  subtitle: String,
  by: String,
  img: String,
  body: String,
  publishedOn: Date, // utc
  createdOn: Date, // utc
});

module.exports = restful.model('doc', schema);
