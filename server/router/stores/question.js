var Question = require('../../models/question');
var User = require('../../models/user');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Question Schema",
  "type": "object",
  "properties": {
    "_id": { "type": "string" },
    "title": { "type": "string" },
    "body": { "type": "string" },
    "votesCount": { "type": "number" },
    "answersCount": { "type": "number" },
    "viewsCount": { "type": "number" },
    "answered": { "type": "boolean" },
    "tags": {
      "type": "array",
      "items": {
        "value": { "type":"string" },
      },
    },
    "userVote": {
      "type": "object",
      "properties": {
        "_id": { "type":"string" },
        "value": { "type":"number" },
        "userName": { "type":"string" },
      },
    },
    "votes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": { "type":"string" },
          "value": { "type":"number" },
          "userName": { "type":"string" },
        },
      },
    },
    "comments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": { "type":"string" },
          "text": { "type":"string" },
          "votesCount": { "type": "number" },
          "votes": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "_id": { "type":"string" },
                "value": { "type":"number" },
                "userName": { "type":"string" },
              },
            },
          },
          "createdBy": { "type":"string" },
          "createdOn": { "type":"date" },
          "modifiedBy": { "type":"string" },
          "modifiedOn": { "type":"date" },
        },
      },
    },
    "answers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": { "type":"string" },
          "body": { "type":"string" },
          "accepted": { "type": "boolean" },
          "votesCount": { "type": "number" },
          "userVote": {
            "type": "object",
            "properties": {
              "_id": { "type":"string" },
              "value": { "type":"number" },
              "userName": { "type":"string" },
            },
          },
          "votes": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "_id": { "type":"string" },
                "value": { "type":"number" },
                "userName": { "type":"string" },
              },
            },
          },
          "comments": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "_id": { "type":"string" },
                "text": { "type":"string" },
                "votesCount": { "type": "number" },
                "votes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "_id": { "type":"string" },
                      "value": { "type":"number" },
                      "userName": { "type":"string" },
                    },
                  },
                },
                "createdBy": { "type":"string" },
                "createdOn": { "type":"date" },
                "modifiedBy": { "type":"string" },
                "modifiedOn": { "type":"date" },
              },
            },
          },
          "createdBy": { "type":"string" },
          "createdOn": { "type":"date" },
          "modifiedBy": { "type":"string" },
          "modifiedOn": { "type":"date" },
        },
      },
    },
    "createdBy": { "type": "string" },
    "createdOn": { "type": "date" },
    "modifiedBy": { "type": "string" },
    "modifiedOn": { "type": "date" },
  }
}

var writeFilterSchema = {
  "title": "Question Schema",
  "type": "object",
  "properties": {
    "_id": { "type": "string" },
    "title": { "type": "string" },
    "body": { "type": "string" },
    "tags": {
      "type": "array",
      "items": {
        "value": { "type":"string" },
      },
    },
    "votes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": { "type":"string" },
          "value": { "type":"number" },
          "userName": { "type":"string" },
        },
      },
    },
    "comments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": { "type":"string" },
          "text": { "type":"string" },
          "votesCount": { "type": "number" },
          "votes": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "_id": { "type":"string" },
                "value": { "type":"number" },
                "userName": { "type":"string" },
              },
            },
          },
          "createdBy": { "type":"string" },
          "createdOn": { "type":"date" },
          "modifiedBy": { "type":"string" },
          "modifiedOn": { "type":"date" },
        },
      },
    },
    "answers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": { "type":"string" },
          "body": { "type":"string" },
          "votesCount": { "type": "number" },
          "userVote": {
            "type": "object",
            "properties": {
              "_id": { "type":"string" },
              "value": { "type":"number" },
              "userName": { "type":"string" },
            },
          },
          "votes": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "_id": { "type":"string" },
                "value": { "type":"number" },
                "userName": { "type":"string" },
              },
            },
          },
          "comments": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "_id": { "type":"string" },
                "text": { "type":"string" },
                "votesCount": { "type": "number" },
                "votes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "_id": { "type":"string" },
                      "value": { "type":"number" },
                      "userName": { "type":"string" },
                    },
                  },
                },
                "createdBy": { "type":"string" },
                "createdOn": { "type":"date" },
                "modifiedBy": { "type":"string" },
                "modifiedOn": { "type":"date" },
              },
            },
          },
          "createdBy": { "type":"string" },
          "createdOn": { "type":"date" },
          "modifiedBy": { "type":"string" },
          "modifiedOn": { "type":"date" },
        },
      },
    },
    "createdBy": { "type": "string" },
    "createdOn": { "type": "date" },
    "modifiedBy": { "type": "string" },
    "modifiedOn": { "type": "date" },
  }
}

var restFilter = new RestFilter({
  path: "/question",
  model: Question,
  readFilterSchema: readFilterSchema,
  writeFilterSchema: writeFilterSchema,
  methodOrderOne: ['user','public','token'],
  trackWithUserName: true,
  beforeFilterOne: function (question, user) {
    if (!question) return;
    if (!user) user = {};
		var votesCount = 0;
		if (question.votes) {
      var userVote = false;
			for (var j = 0; j < question.votes.length; j++) {
				if (question.votes[j].value > 0) votesCount++;
				else if (question.votes[j].value < 0) votesCount--;
        if (question.votes[j].userName == user.userName) {
          votesCount -= question.votes[j].value;
          question.userVote = question.votes[j];
          userVote = true;
        }
			}
      if (!userVote) question.userVote = {value: 0, userName: user.userName};
		}
		question.votesCount = votesCount;

		var answersCount = 0;
		if (question.answers) answersCount = question.answers.length;
		question.answersCount = answersCount;

    for (var i = 0; i < question.answers.length; i++) {
      var answerVoteCount = 0;
      var userVote = false;
      for (var j = 0; j < question.answers[i].votes.length; j++) {
				if (question.answers[i].votes[j].value > 0) answerVoteCount++;
				else if (question.answers[i].votes[j].value < 0) answerVoteCount--;
        if (question.answers[i].votes[j].userName == user.userName) {
          answerVoteCount -= question.answers[i].votes[j].value;
          question.answers[i].userVote = question.answers[i].votes[j];
          userVote = true;
        }
      }
      if (!userVote) question.answers[i].userVote = {value: 0, userName: user.userName};
  		question.answers[i].votesCount = answerVoteCount;
    }

		if (!question.viewsCount) question.viewsCount = 1;
    else question.viewsCount++;

    Question.update({"_id": question._id}, {
        viewsCount: question.viewsCount,
    }, function(err, numberAffected, rawResponse) {
       //handle it
    });

    // for efficiency!
    question.votes = undefined;
  },
  beforeFilterMany: function (question) {
    if (!question) return;
		var votesCount = 0;
		if (question.votes) {
			for (var j = 0; j < question.votes.length; j++) {
				if (question.votes[j].value > 0) votesCount++;
				else if (question.votes[j].value < 0) votesCount--;
			}
		}
		question.votesCount = votesCount;

		var answersCount = 0;
		if (question.answers) answersCount = question.answers.length;
		question.answersCount = answersCount

    question.answered = false;
    for (var i = 0; i < question.answers.length; i++) {
      if (question.answers[i].accepted) {
        question.answered = true;
      }
    }

    // for efficiency!
    question.votes = undefined;
    question.comments = undefined;
    question.answers = undefined;
    question.body = undefined;

    if (!question.viewsCount) question.viewsCount = 1;

    return question;
  },
	findOnePublic: function (id, callback) {
    Question.findOne({"_id": id}).exec(function(err, result) {
      return callback(result);
    });
  },
	findOneToken: function (token, id, callback) {
    Question.findOne({"_id": id}).exec(function(err, result) {
      return callback(result);
    });},
	findOneUser: function (user, id, callback) {
    Question.findOne({"_id": id}).exec(function(err, result) {
      return callback(result);
    });},
	findManyPublic: function (callback) {
    Question.find().exec(function(err, result) {
      return callback(result);
    });
  },
	findManyToken: function (token, callback) { findManyPublic(callback); },
	findManyUser: function (user, callback) { findManyPublic(callback); },
	security: {
		create: function (user, token) { return (user); },
		read: function (user, token) { return true; },
		update: function (user, token) { return (user); },
		destroy: function (user, token) { return false; },
  },
});

// vote on existing question
restFilter.router.post('/question/:id/vote', function (req, res) {
  var questionId = req.params.id;
  var vote = req.body.vote;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, question) {
        if (err) return res.json({});
        if (!question) return res.json({});

        var voteExists = false;
        for (var i = 0; i < question.votes.length; i++) {
          if (question.votes[i].userName == user.userName) {
            voteExists = true;
            question.votes[i].value = vote.value;
            question.votes[i].userName = user.userName;
          }
        }

        if (!voteExists) {
          question.votes.push({
            value: vote.value,
            userName: user.userName,
          });
        }

        question.save(function (err) {
          res.json(question);
        });
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });
});

// edit existing question
restFilter.router.post('/question/:id', function (req, res) {
  var questionId = req.params.id;
  var question = req.body.question;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, doc) {
        if (err) return res.json({});
        if (!doc) return res.json({});
        if (user.isAdmin || question.createdBy == user.userName) {
          var currentDate = new Date(new Date().toUTCString());
          doc.title = question.title;
          doc.body = question.body;
          doc.tags = question.tags;
          doc.modifiedBy = user.userName;
          doc.modifiedOn = currentDate;

          doc.save(function (err) {
            res.json(doc);
          });
        } else {
          return res.json({success:false,message:"User not authorized to make these changes."});
        }
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });
});

// delete existing question
restFilter.router.post('/question/:id/delete', function (req, res) {
  var questionId = req.params.id;
  var question = req.body.question;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, doc) {
        if (err) return res.json({success:false,message:"An error occurred"});
        if (!doc) return res.json({success:false,message:"Doc does not exist"});
        if (user.isAdmin || doc.createdBy == user.userName) {
          doc.remove(function (err) {
            res.json({success:true});
          });
        } else {
          return res.json({success:false,message:"User not authorized to make these changes."});
        }
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });
});

// add new comment
restFilter.router.post('/question/:id/comment', function (req, res) {
  var questionId = req.params.id;
  var comment = req.body.comment;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, question) {
        if (err) return res.json({});
        if (!question) return res.json({});

        var currentDate = new Date(new Date().toUTCString());
        comment.createdBy = user.userName;
        comment.createdOn = currentDate;
        comment.modifiedBy = user.userName;
        comment.modifiedOn = currentDate;

        question.comments.push(comment);
        question.save(function (err) {
          res.json(question);
        });
      });
    } else {
      res.json({success:false,message:"You must be signed-in in order to post a comment"});
    }
  });
});

// edit existing comment
restFilter.router.post('/question/:id/comment/:cid', function (req, res) {
  var questionId = req.params.id;
  var commentId = req.params.cid;
  var comment = req.body.comment;

});

// delete existing comment
restFilter.router.post('/question/:id/comment/:cid/delete', function (req, res) {
  var questionId = req.params.id;
  var commentId = req.params.cid;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, question) {
        if (err) return res.json({success:false,message:"An error occurred"});
        if (!question) return res.json({success:false,message:"Could not find document with id " + questionId});

        var authorized = false;
        for (var i = 0; i < question.comments.length; i++) {
          if (question.comments[i]._id == commentId) {
            if (user.isAdmin || user.userName == question.comments[i].createdBy) {
              authorized = true;
              question.comments.splice(i, 1);
            }
          }
        }

        if (authorized) {
          question.save(function (err) {
            res.json(question);
          });
        } else {
          res.json({success:false,message:"Not authorized"})
        }
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });

});

// vote on existing comment
restFilter.router.post('/question/:id/comment/:cid/vote', function (req, res) {
  var questionId = req.params.id;
  var commentId = req.params.cid;
  var vote = req.body.vote;

});

// add new answer
restFilter.router.post('/question/:id/answer', function (req, res) {
  var questionId = req.params.id;
  var answer = req.body.answer;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, question) {
        if (err) return res.json({});
        if (!question) return res.json({});

        var currentDate = new Date(new Date().toUTCString());
        answer.createdBy = user.userName;
        answer.createdOn = currentDate;
        answer.modifiedBy = user.userName;
        answer.modifiedOn = currentDate;

        question.answers.push(answer);
        question.save(function (err) {
          res.json(question);
        });
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });
});

// edit existing answer
restFilter.router.post('/question/:id/answer/:aid', function (req, res) {
  var questionId = req.params.id;
  var answerId = req.params.aid;
  var answer = req.body.answer;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, question) {
        if (err) return res.json({});
        if (!question) return res.json({});

        for (var i = 0; i < question.answers.length; i++) {
          if (question.answers[i]._id == answerId) {
            if (user.isAdmin || question.answers[i].createdBy == user.userName) {
              var currentDate = new Date(new Date().toUTCString());
              question.answers[i].body = answer.body;
              question.answers[i].modifiedBy = user.userName;
              question.answers[i].modifiedOn = currentDate;
            } else {
              return res.json({success:false,message:"User not authorized to make these changes."});
            }
          }
        }

        for (var i = 0; i < question.answers.length; i++) {
          var answerVoteCount = 0;
          for (var j = 0; j < question.answers[i].votes.length; j++) {
    				if (question.answers[i].votes[j].value > 0) answerVoteCount++;
    				else if (question.answers[i].votes[j].value < 0) answerVoteCount--;
            if (question.answers[i].votes[j].userName == user.userName) {
              answerVoteCount -= question.answers[i].votes[j].value;
              question.answers[i].userVote = question.answers[i].votes[j];
            }
          }
      		question.answers[i].votesCount = answerVoteCount;
        }

        question.save(function (err) {
          res.json(question);
        });
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });
});

// delete existing answer
restFilter.router.post('/question/:id/answer/:aid/delete', function (req, res) {
  var questionId = req.params.id;
  var answerId = req.params.aid;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, question) {
        if (err) return res.json({});
        if (!question) return res.json({});

        for (var i = 0; i < question.answers.length; i++) {
          if (question.answers[i]._id == answerId) {
            if (user.isAdmin || question.answers[i].createdBy == user.userName) {
              question.answers.splice(i, 1);
              break;
            } else {
              return res.json({success:false,message:"User not authorized to make these changes."});
            }
          }
        }

        for (var i = 0; i < question.answers.length; i++) {
          var answerVoteCount = 0;
          for (var j = 0; j < question.answers[i].votes.length; j++) {
    				if (question.answers[i].votes[j].value > 0) answerVoteCount++;
    				else if (question.answers[i].votes[j].value < 0) answerVoteCount--;
            if (question.answers[i].votes[j].userName == user.userName) {
              answerVoteCount -= question.answers[i].votes[j].value;
              question.answers[i].userVote = question.answers[i].votes[j];
            }
          }
      		question.answers[i].votesCount = answerVoteCount;
        }

        question.save(function (err) {
          res.json(question);
        });
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });
});

// vote on existing answer
restFilter.router.post('/question/:id/answer/:aid/vote', function (req, res) {
  var questionId = req.params.id;
  var answerId = req.params.aid;
  var vote = req.body.vote;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, question) {
        if (err) return res.json({});
        if (!question) return res.json({});

        for (var i = 0; i < question.answers.length; i++) {
          var voteExists = false;
          if (question.answers[i]._id == answerId) {
            var currentDate = new Date(new Date().toUTCString());
            vote.createdBy = user.userName;
            vote.createdOn = currentDate;
            vote.modifiedBy = user.userName;
            vote.modifiedOn = currentDate;

            var voteExists = false;
            for (var j = 0; j < question.answers[i].votes.length; j++) {
              if (question.answers[i].votes[j].userName == user.userName) {
                voteExists = true;
                question.answers[i].votes[j].value = vote.value;
                question.answers[i].votes[j].userName = user.userName;
                question.answers[i].votes[j].modifiedBy = vote.modifiedBy;
                question.answers[i].votes[j].modifiedOn = vote.modifiedOn;
              }
            }

            if (!voteExists) {
              question.answers[i].votes.push({
                value: vote.value,
                userName: user.userName,
              });
            }
          }
        }

        for (var i = 0; i < question.answers.length; i++) {
          var answerVoteCount = 0;
          for (var j = 0; j < question.answers[i].votes.length; j++) {
    				if (question.answers[i].votes[j].value > 0) answerVoteCount++;
    				else if (question.answers[i].votes[j].value < 0) answerVoteCount--;
            if (question.answers[i].votes[j].userName == user.userName) {
              answerVoteCount -= question.answers[i].votes[j].value;
              question.answers[i].userVote = question.answers[i].votes[j];
            }
          }
      		question.answers[i].votesCount = answerVoteCount;
        }

        question.save(function (err) {
          res.json(question);
        });
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });
});

// add comment to existing answer
restFilter.router.post('/question/:id/answer/:aid/comment', function (req, res) {
  var questionId = req.params.id;
  var answerId = req.params.aid;
  var comment = req.body.comment;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, question) {
        if (err) return res.json({});
        if (!question) return res.json({});

        for (var i = 0; i < question.answers.length; i++) {
          if (question.answers[i]._id == answerId) {
            var currentDate = new Date(new Date().toUTCString());
            comment.createdBy = user.userName;
            comment.createdOn = currentDate;
            comment.modifiedBy = user.userName;
            comment.modifiedOn = currentDate;

            question.answers[i].comments.push(comment);
          }
        }

        for (var i = 0; i < question.answers.length; i++) {
          var answerVoteCount = 0;
          for (var j = 0; j < question.answers[i].votes.length; j++) {
    				if (question.answers[i].votes[j].value > 0) answerVoteCount++;
    				else if (question.answers[i].votes[j].value < 0) answerVoteCount--;
            if (question.answers[i].votes[j].userName == user.userName) {
              answerVoteCount -= question.answers[i].votes[j].value;
              question.answers[i].userVote = question.answers[i].votes[j];
            }
          }
      		question.answers[i].votesCount = answerVoteCount;
        }

        question.save(function (err) {
          res.json(question);
        });
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });
});


// delete existing comment
restFilter.router.post('/question/:id/answer/:aid/comment/:cid/delete', function (req, res) {
  var questionId = req.params.id;
  var answerId = req.params.aid;
  var commentId = req.params.cid;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, question) {
        if (err) return res.json({success:false,message:"An error occurred"});
        if (!question) return res.json({success:false,message:"Could not find document with id " + questionId});

        var authorized = false;
        for (var i = 0; i < question.answers.length; i++) {
          for (var j = 0; j < question.answers[i].comments.length; j++) {
            if (question.answers[i].comments[j]._id == commentId) {
              if (user.isAdmin || user.userName == question.answers[i].comments[j].createdBy) {
                authorized = true;
                question.answers[i].comments.splice(j, 1);
              }
            }
          }
        }

        if (authorized) {
          question.save(function (err) {
            res.json(question);
          });
        } else {
          res.json({success:false,message:"Not authorized"})
        }
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });

});

// accept existing answer
restFilter.router.post('/question/:id/answer/:aid/accept', function (req, res) {
  var questionId = req.params.id;
  var answerId = req.params.aid;

  var userEmail = req.session.email || req.query.email;
  var userAccessToken = req.cookies["accessToken"] || req.query.accessToken;

  User.getUserAndValidate(userEmail, userAccessToken, function (user) {
    if (user) {
      Question.findOne({"_id": questionId}).exec(function (err, question) {
        if (err) return res.json({});
        if (!question) return res.json({});

        for (var i = 0; i < question.answers.length; i++) {
          question.answers[i].accepted = false;
          if (question.answers[i]._id == answerId) {
            // only question's creator can accept answers
            if (question.createdBy == user.userName) {
              question.answers[i].accepted = true;
            }
          }
        }

        for (var i = 0; i < question.answers.length; i++) {
          var answerVoteCount = 0;
          for (var j = 0; j < question.answers[i].votes.length; j++) {
    				if (question.answers[i].votes[j].value > 0) answerVoteCount++;
    				else if (question.answers[i].votes[j].value < 0) answerVoteCount--;
            if (question.answers[i].votes[j].userName == user.userName) {
              answerVoteCount -= question.answers[i].votes[j].value;
              question.answers[i].userVote = question.answers[i].votes[j];
            }
          }
      		question.answers[i].votesCount = answerVoteCount;
        }

        question.save(function (err) {
          res.json(question);
        });
      });
    } else {
      res.json({success:false,message:"Not authorized"})
    }
  });
});

// edit comment on existing answer
restFilter.router.post('/question/:id/answer/:aid/comment/:cid', function (req, res) {
  var questionId = req.params.id;
  var answerId = req.params.aid;
  var commentId = req.params.cid;
  var comment = req.body.comment;

});

module.exports = restFilter.router;
