var React = require('react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ListItemComment = require('./ListItemComment.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var Form = require('../Form/Index.jsx');
var UserStore = require('../../stores').user;
var QuestionStore = require('../../stores').question;

var Component = React.createClass({
  getInitialState: function () {
    return {
      openComment: false,
      showComments: 5,
      flagDelete: false,
      isLoading: false,
      body: '',
      comment: '',
      error: '',
      vote: {
        value: 0,
        userId: '',
      },
    }
  },

  componentDidMount: function () {
    var state = this.state;
    if (this.props.answer.userVote) state.vote = this.props.answer.userVote;
    if (this.props.answer.body) state.body = this.props.answer.body;
    this.setState(state);
  },

  componentDidUpdate: function (prevProps, prevState, snapshot) {
    if (!prevProps.answer.userVote) return;
    if (!this.props.answer.userVote) return;
    if (this.props.answer.userVote.value != prevProps.answer.userVote.value) {
      var state = this.state;
      if (this.props.answer.userVote) state.vote = this.props.answer.userVote;
      this.setState(state);
    }
  },

  render: function() {
    if (this.state.flagDelete) {
      return (
        <div className="container-fluid" style={Style.container}>
          <div className="row" style={{paddingTop:"3px"}}>
            <div className="col-md-10 col-xs-12 col-centered" style={{textAlign:"left"}}>
              <div className="row" style={{marginBottom:"20px"}}>
                <div className="col-md-8 col-xs-12 col-centered" style={{padding:"20px",backgroundColor:"#f2f2f2",border:"3px solid #222",borderRadius:"15px"}}>
                  <h1 style={{marginBottom:"50px"}}>
                    {"Are you sure you wish to delete this answer?"}
                  </h1>
                  <ButtonDanger
                    label="Delete It!"
                    onClick={this.handleClick_DeleteFoReal} />
                  <span style={{marginRight:"15px"}} />
                  <ButtonSecondary
                    label="Cancel"
                    onClick={this.handleClick_CancelDelete} />
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{marginBottom:"30px",paddingBottom:"30px",borderBottom:"1px solid #222"}} />
        </div>
      )
    }

    if (this.state.isLoading) {
      return (
        <div className="container-fluid" style={Style.container}>
          <div className="row" style={{paddingTop:"3px"}}>
            <div className="col-md-10 col-xs-12 col-centered" style={{textAlign:"left"}}>
              <div className="row" style={{marginBottom:"20px"}}>
                <div className="col-xs-12 col-centered">
                  <img src="/img/wait" style={{marginTop:"50px",display:"block",marginLeft:"auto",marginRight:"auto"}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-md-1 col-xs-12" style={{textAlign:"center",fontSize:"35px",color:"#888"}}>
          {this.getQuestionUpVote()}
          <div style={{fontSize:"28px"}}>
            {this.getVotesCount()}
          </div>
          {this.getQuestionDownVote()}
          {this.getCheckMark()}
        </div>
        <div className="col-md-8 col-xs-12">
        <div className="row">
            <div className="col-xs-12">
              {this.getBody()}
            </div>
          </div>
          <div className="row" style={{borderBottom:"1px solid #ccc",paddingBottom:"15px"}}>
            <div className="col-xs-12" style={{marginTop:"15px"}}>
              <div className="row">
                <div className="col-xs-4">
                  {this.getControls()}
                </div>
                <div className="col-xs-4">
                  {this.getTimeStamp()}
                </div>
                <div className="col-xs-4">
                  {this.getUserInfo()}
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{fontSize:"12px"}}>
            {this.getComments()}
            {this.getCommentControls()}
          </div>
          {this.getError()}
          <div className="row" style={{marginBottom:"30px",paddingBottom:"30px",borderBottom:"1px solid #222"}} />
        </div>
      </div>
    )
  },

  getError: function (){
    if (this.state.error) {
      return (
        <div className="row" style={{color:"red",marginTop:"15px",marginBottom:"15px"}}>
          <div className="col-xs-12">
            {this.state.error}
          </div>
        </div>
      )
    }
  },

  handleClick_DeleteFoReal: function () {
    var state = this.state;
    state.isLoading = true;
    this.setState(state);

    QuestionStore.deleteQuestionAnswer(this.props.question._id, this.props.answer._id, function (res) {
      var state = this.state;
      state.isLoading = false;
      state.flagDelete = false;
      state.error = '';
      this.setState(state);
      this.props.onDelete();
    }.bind(this));
  },

  handleClick_CancelDelete: function () {
    var state = this.state;
    state.flagDelete = false
    this.setState(state);
  },

  getVotesCount: function () {
    var total = 0;
    if (this.props.answer.votesCount) total += this.props.answer.votesCount;
    if (this.state.vote.value) total += this.state.vote.value;
    return total;
  },

  getQuestionUpVote: function () {
    if (this.state.vote.value > 0) {
      return (
        <div style={{cursor:"pointer",color:"orange"}} onClick={this.handleClick_UpVoteComment}>▲</div>
      )
    } else {
      return (
        <div style={{cursor:"pointer"}} onClick={this.handleClick_UpVoteComment}>▲</div>
      )
    }
  },

  getQuestionDownVote: function () {
    if (this.state.vote.value < 0) {
      return (
        <div style={{cursor:"pointer",color:"orange"}} onClick={this.handleClick_DownVoteComment}>▼</div>
      )
    } else {
      return (
        <div style={{cursor:"pointer"}} onClick={this.handleClick_DownVoteComment}>▼</div>
      )
    }
  },

  getComments: function () {
    if (this.props.answer.comments) {
      return this.props.answer.comments.map(function (comment, i) {
        if (i < this.state.showComments) {
          function handleDeleteComment (type) {
            if (type == "answer") {
              for (var j = 0; j < this.props.question.answers.length; j++) {
                if (this.props.question.answers[j]._id == this.props.answer._id) {
                  this.props.question.answers[j].comments.splice(i, 1);
                  this.props.updateAnswer(this.props.question.answers[j]);
                }
              }
            } else {
              this.props.question.comments.splice(i, 1);
            }
          }

          return (
            <ListItemComment key={i} answer={this.props.answer} comment={comment} question={this.props.question} user={this.props.user} onDelete={handleDeleteComment.bind(this)} />
          )
        }
      }.bind(this));
    }
  },

  getAnswers: function () {
    if (this.props.answer.answers) {
      return this.props.answer.answers.map(function (answer, i) {
        return (
          <ListItemAnswer key={i} answer={answer} />
        )
      });
    }
  },

  getCommentControls: function () {
    if (this.state.postingComment) {
      return (
        <div className="col-xs-12" style={{marginTop:"10px"}}>
          <div className="col-xs-12" style={{cursor:"pointer",marginTop:"10px"}}>
            posting comment...
          </div>
        </div>
      )
    } else if (this.state.openComment) {
      return (
        <div className="col-xs-12" style={{marginTop:"10px"}}>
          <Form.Input
            attribute="comment"
            value={this.state.comment}
            onChange={this.handleChange_Field} />
          <div style={{marginTop:"10px"}} />
          <ButtonPrimary
            label="Post Comment"
            onClick={this.handleClick_PostComment} />
        </div>
      )
    } else {
      var showMore = function () {
        var loadMoreComments = function (i) {
          var state = this.state;
          state.showComments += i;
          this.setState(state);
        }.bind(this);
        var commentsLeft = this.props.answer.comments.length - this.state.showComments;
        if (this.props.answer.comments.length > this.state.showComments) {
          var commentsToLoad = 10;
          if (commentsLeft < commentsToLoad) commentsToLoad = commentsLeft;
          var loadMoreCommentsWrapper = function () {
            loadMoreComments(commentsToLoad);
          }.bind(this);
          return (
            <span>
              {" | "}
              <span style={{color:"#07C",cursor:"pointer"}} onClick={loadMoreCommentsWrapper}>
                {"load "}
                <b>{commentsToLoad}</b>
                {" more comments"}
              </span>
            </span>
          )
        }
      }.bind(this)
      return (
        <div className="col-xs-12" style={{marginTop:"10px"}}>
          <span style={{color:"#07C",cursor:"pointer"}} onClick={this.handleClick_AddComment}>
            add a comment
          </span>
          {showMore()}
        </div>
      )
    }
  },

  getBody: function () {
    if (this.state.edit) {
      return (
        <div style={{marginTop:"15px"}}>
          <Form.TextArea
            attribute="body"
            value={this.state.body}
            onChange={this.handleChange_Field} />
        </div>
      )
    }

    var body = "";
    if (this.props.answer.body) body = this.props.answer.body;
    var html = marked(body);
    var options = {
      allowedTags: ['h1','h2','h3','h4','h5','h6','blockquote','p','a','ul','ol',
        'nl','li','b','i','strong','em','strike','code','hr','br','div',
        'table','thead','caption','tbody','tr','th','td','pre','img','iframe'],
      allowedAttributes: {
        a: ['href','name','target' ],
        iframe: ['src','height','width','frameborder','allow','style'],
        img: ['src','height','width','style']
      },
      selfClosing: ['img','br','hr','area','base','basefont','input','link','meta'],
      allowedSchemes: ['http','https','ftp','mailto'],
      allowedSchemesByTag: {},
      allowedSchemesAppliedToAttributes: ['href','src','cite'],
      allowProtocolRelative: true,
      allowedIframeHostnames: ['www.youtube.com','player.vimeo.com']
    };
    var cleanHtml = sanitizeHtml(html, options);
    return (<div dangerouslySetInnerHTML={{__html: cleanHtml}} />)
  },

  getControls: function () {
    var controls = [];

    if (this.props.user.userName == this.props.question.createdBy) {
      controls.push((
        <span key={"a"} style={{fontSize:"12px",marginRight:"10px",cursor:"pointer",color:"green"}} onClick={this.handleClick_AcceptAnswer}>
          accept as answer
        </span>
      ));
    }

    if (this.props.user.isAdmin || this.props.user.userName == this.props.answer.createdBy) {
      if (!this.state.edit) {
        controls.push((
          <span key={"e"} style={{fontSize:"12px",color:"#888",cursor:"pointer",marginRight:"10px"}}
            onClick={this.handleClick_Edit}>
            edit
          </span>
        ));

        controls.push((
          <span key={"d"} style={{fontSize:"12px",color:"#888",cursor:"pointer",marginRight:"10px"}}
            onClick={this.handleClick_FlagDelete}>
            {"delete"}
          </span>
        ));
      } else {
        controls.push((
          <span key={"e"} style={{fontSize:"12px",color:"#888",cursor:"pointer",marginRight:"10px"}}
            onClick={this.handleClick_EditSave}>
            save
          </span>
        ));

        controls.push((
          <span key={"c"} style={{fontSize:"12px",color:"#888",cursor:"pointer",marginRight:"10px"}}
            onClick={this.handleClick_EditCancel}>
            cancel
          </span>
        ));

        controls.push((
          <span key={"d"} style={{fontSize:"12px",color:"#888",cursor:"pointer",marginRight:"10px"}}
            onClick={this.handleClick_FlagDelete}>
            {"delete"}
          </span>
        ));
      }
    }

    return controls;
  },

  handleClick_FlagDelete: function () {
    var state = this.state;
    state.flagDelete = true;
    this.setState(state);
  },

  handleClick_Edit: function () {
    var state = this.state;
    state.edit = true;
    this.setState(state);
  },

  handleClick_EditCancel: function () {
    var state = this.state;
    state.edit = false;
    this.setState(state);
  },

  handleClick_EditSave: function () {
    var state = this.state;
    state.isLoading = true;
    state.edit = false;
    this.setState(state);

    var answer = this.props.answer;
    answer.body = this.state.body;

    QuestionStore.editQuestionAnswer(this.props.question._id, this.props.answer._id, answer, function (question) {
      var state = this.state;
      state.isLoading = false;
      state.error = '';
      this.setState(state);
      this.props.updateAnswer(answer);
    }.bind(this));
  },

  handleClick_AcceptAnswer: function () {
    var state = this.state;
    state.isLoading = true;
    this.setState(state);

    QuestionStore.acceptQuestionAnswer(this.props.question._id, this.props.answer._id, function (question) {
      var state = this.state;
      state.isLoading = false;
      state.error = '';
      this.setState(state);

      var answer = this.props.answer;
      answer.accepted = true;
      this.props.updateAnswer(answer);
    }.bind(this));
  },

  getTimeLabel: function (value, unit) {
    var units = ["seconds","minutes","hours","days","weeks","months","years"]
    var unitMax = [60, 60, 24, 7, 4, 12];
    var unitIndex = units.indexOf(unit);
    if (value > unitMax[unitIndex]) {
      return this.getTimeLabel(value / unitMax[unitIndex], units[unitIndex + 1]);
    } else {
      var valueLabel = Math.floor(value)
      var unitsLabel = units[unitIndex];
      if (valueLabel == 1) { unitsLabel = unitsLabel.substring(0, unitsLabel.length - 1); }
      return valueLabel + " " + unitsLabel + " ago";
    }
  },

  getCheckMark: function () {
    if (this.props.answer.accepted) {
      return (
        <div style={{marginTop:"15px", color:"green"}}>
          ✓
        </div>
      )
    }
  },

  getTimeStamp: function () {
    var label = "answered by";
    var person = this.props.answer.createdBy;

    var currentTime = new Date();
    var timeSeconds = (currentTime - new Date(this.props.answer.createdOn)) / 1000;
    var timeLabel = this.getTimeLabel(timeSeconds, "seconds");

    if (!this.props.answer.modifiedOn) return;
    if (!this.props.answer.createdOn) return;

    if (new Date(this.props.answer.modifiedOn).getTime() != new Date(this.props.answer.createdOn).getTime()) {
      label = "modified by";
      person = this.props.answer.modifiedBy;
      timeSeconds = (currentTime - new Date(this.props.answer.modifiedOn)) / 1000;
      timeLabel = this.getTimeLabel(timeSeconds, "seconds");

      return (
        <div style={{fontSize:"12px",marginTop:"7px"}}>
          {label + " "}
          <span style={{color:"#07C"}}>{person}</span>
          {" " + timeLabel}
        </div>
      )
    }
  },

  getUserInfo: function () {
    var label = "answered by";
    var person = this.props.answer.createdBy;

    var currentTime = new Date();
    var timeSeconds = (currentTime - new Date(this.props.answer.createdOn)) / 1000;
    var timeLabel = this.getTimeLabel(timeSeconds, "seconds");

    if (!this.props.answer.modifiedOn) return;
    if (!this.props.answer.createdOn) return;

    return (
      <div style={{backgroundColor:"#E1ECF4",marginRight:"5px",border:"1px solid #E1ECF4",color:"#39739d",padding:".4em .5em",fontSize:"12px",width:"100%"}}>
        {label + " " + person + " " + timeLabel}
      </div>
    )
  },

  handleClick_AddComment: function () {
    var state = this.state;
    state.openComment = true;
    this.setState(state);
  },

  handleClickNewQuestion: function () {

  },

  handleClick_PostComment: function () {
    var state = this.state;

    if (!this.props.user._id) {
      state.error = "You must be signed in to comment";
      this.setState(state);
      return;
    } else {
      state.postingComment = true;
      this.setState(state);
    }

    var comment = {
      text: state.comment,
    };

    QuestionStore.addQuestionAnswerComment(this.props.question._id, this.props.answer._id, comment, function (question) {
      var state = this.state;
      state.error = '';
      state.comment = "";
      for (var i = 0; i < question.answers.length; i++) {
        if (this.props.answer._id == question.answers[i]._id) {
          this.props.updateAnswer(question.answers[i]);
        }
      }
      state.openComment = false,
      state.postingComment = false;
      this.setState(state);

    }.bind(this));
  },

  handleClick_UpVoteComment: function () {
    var state = this.state;

    if (!this.props.user._id) {
      state.error = 'You must signed in to vote';
      this.setState(state);
      return;
    }

    var vote = {
      value: 1,
      userId: this.props.user._id,
    }

    if (this.state.vote.value > 0) {
      vote = {
        value: 0,
        userId: this.props.user._id,
      };
    }

    state.vote = vote;
    this.setState(state);

    if (!this.props.user._id) return;

    QuestionStore.voteQuestionAnswer(this.props.question._id, this.props.answer._id, state.vote, function () {

    }.bind(this));
  },

  handleClick_DownVoteComment: function () {
    var state = this.state;

    if (!this.props.user._id) {
      state.error = 'You must signed in to vote';
      this.setState(state);
      return;
    }

    var vote = {
      value: -1,
      userId: this.props.user._id,
    };

    if (this.state.vote.value < 0) {
      vote = {
        value: 0,
        userId: this.props.user._id,
      };
    }

    state.vote = vote;
    this.setState(state);

    if (!this.props.user._id) return;

    QuestionStore.voteQuestionAnswer(this.props.question._id, this.props.answer._id, state.vote, function () {

    }.bind(this));

  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
  },
});

module.exports = Component;
