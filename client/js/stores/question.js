var $ = require('jquery');
var StoreTemplate = require('./Template');
var DataService = require('../services/data');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/question');

var Store = new StoreTemplate(DataService.question);

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

Store.editQuestion = function (questionId, question, callback) {
  $.ajax({
    url: '/stores/question/' + questionId,
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({question: question}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });

}

Store.deleteQuestion = function (questionId, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/delete',
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({questionId: questionId}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });

}

Store.voteQuestion = function (questionId, vote, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/vote',
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({vote: vote}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Store.addQuestionComment = function (questionId, comment, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/comment',
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({comment: comment}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });

}

Store.editQuestionComment = function (questionId, comment, callback) {

}

Store.deleteQuestionComment = function (questionId, commentId, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/comment/' + commentId + '/delete',
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({commentId: commentId}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Store.deleteQuestionAnswerComment = function (questionId, answerId, commentId, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/answer/' + answerId + '/comment/' + commentId + '/delete',
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({commentId: commentId}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Store.voteQuestionComment = function (questionId, commentId, vote, callback) {

}

Store.acceptQuestionAnswer = function (questionId, answerId, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/answer/' + answerId + '/accept',
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({answerId: answerId}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Store.editQuestionAnswer = function (questionId, answerId, answer, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/answer/' + answerId,
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({answer: answer}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Store.deleteQuestionAnswer = function (questionId, answerId, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/answer/' + answerId + '/delete',
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({answerId: answerId}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Store.addQuestionAnswer = function (questionId, answer, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/answer',
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({answer: answer}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Store.voteQuestionAnswer = function (questionId, answerId, vote, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/answer/' + answerId + '/vote',
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({vote: vote}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Store.addQuestionAnswerComment = function (questionId, answerId, comment, callback) {
  $.ajax({
    url: '/stores/question/' + questionId + '/answer/' + answerId + '/comment',
    type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({comment: comment}),
		dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('accessToken', getCookie("accessToken"));
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.QUESTION_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.QUESTION_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.QUESTION_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
