var restful = require('node-restful');
var mongoose = restful.mongoose;

var voteSchema = new mongoose.Schema ({
  value: Number,
  userName: String,
});

var commentSchema = new mongoose.Schema ({
  text: String,
  votes: [voteSchema],
  createdBy: String,
  createdOn: Date,
  modifiedBy: String,
  modifiedOn: Date,
});

var answerSchema = new mongoose.Schema ({
  body: String,
  votesCount: Number,
  accepted: Boolean,
  userVote: voteSchema,
  votes: [voteSchema],
  comments: [commentSchema],
  createdBy: String,
  createdOn: Date,
  modifiedBy: String,
  modifiedOn: Date,
});

var schema = new mongoose.Schema ({
  title: String,
  body: String,
  tags: [String],
  viewsCount: Number,
  votes: [voteSchema],
  comments: [commentSchema],
  answers: [answerSchema],
  createdBy: String,
  createdOn: Date, // utc
  modifiedBy: String,
  modifiedOn: Date, // utc
});

module.exports = restful.model('question', schema);
