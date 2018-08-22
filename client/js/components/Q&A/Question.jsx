var React = require('react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ListItemComment = require('./ListItemComment.jsx');
var ListItemAnswer = require('./ListItemAnswer.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var Form = require('../Form/Index.jsx');
var UserStore = require('../../stores').user;
var QuestionStore = require('../../stores').question;

var Component = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      openComment: false,
      flagDelete: false,
      comment: '',
      answer: '',
      user: {},
      vote: {
        value: 0,
        userId: '',
      },
      question: {
        votesCount: 0,
        answers: [],
        tags: [],
      },
    }
  },

  componentDidMount: function () {
    document.title = "Q&A - Slate Robotics";
    window.scrollTo(0,0);

    UserStore.getMe(function (me) {
      var state = this.state;
      state.user = me;
      this.setState(state);
    }.bind(this));

    QuestionStore.get({
      id: this.props.params.id,
      refresh: true,
      error: function (error) {
        var state = this.state;
        state.isLoading = false;
        state.error = "An error occurred loading the questions";
        this.setState(state);
      }.bind(this),
      success: function (doc) {
        document.title = doc.title;

        var state = this.state;
        state.isLoading = false;
        state.question = doc;
        state.question.votesCountOriginal = state.question.votesCount;
        state.tagsString = "";
        for (var i = 0; i < state.question.tags.length; i++) {
          state.tagsString += state.question.tags[i] + ",";
        }
        if (state.tagsString) state.tagsString = state.tagsString.substring(0, state.tagsString.length - 1);
        if (state.question.userVote) state.vote = state.question.userVote;
        state.error = "";
        this.setState(state);
        this.sortAnswers();
      }.bind(this),
    });
  },

  sortAnswers: function () {
    var state = this.state;
    state.question.answers = state.question.answers.sort(function (a, b) {
      var bCount = 0;
      if (b.userVote) bCount += b.userVote.value;
      if (b.votesCount) bCount += b.votesCount;

      var aCount = 0;
      if (a.userVote) aCount += a.userVote.value;
      if (a.votesCount) aCount += a.votesCount;

      return bCount - aCount;
    });
    this.setState(state);
  },

  render: function () {
    if (this.state.flagDelete) {
      return (
        <div className="container-fluid" style={Style.container}>
          <div className="row" style={{paddingTop:"3px"}}>
            <div className="col-md-10 col-xs-12 col-centered" style={{textAlign:"left"}}>
              <div className="row" style={{marginBottom:"20px"}}>
                <div className="col-md-8 col-xs-12 col-centered" style={{padding:"20px",backgroundColor:"#f2f2f2",marginTop:"50px",border:"3px solid #222",borderRadius:"15px"}}>
                  <h1 style={{marginBottom:"50px"}}>
                    {"Are you sure you wish to delete '"}
                    {this.state.question.title}
                    {"'?"}
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
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{paddingTop:"3px"}}>
          <div className="col-md-10 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <div className="row" style={{borderBottom:"1px solid #ccc"}}>
              <div className="col-md-10 col-xs-12">
                {this.getTitle()}
              </div>
              <div className="col-md-2 col-xs-12" style={{marginTop:"20px"}}>
                <div className="hidden-sm hidden-xs" style={{float:"right"}}>
                  <ButtonPrimary
                    label="Ask Question"
                    onClick={this.handleClickNewQuestion} />
                </div>
                <div className="hidden-lg hidden-md" style={{marginBottom:"20px"}}>
                  <ButtonPrimary
                    label="Ask Question"
                    onClick={this.handleClickNewQuestion} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-1 col-xs-2" style={{textAlign:"center",fontSize:"35px",color:"#888"}}>
                {this.getQuestionUpVote()}
                <div style={{fontSize:"28px"}}>
                  {this.state.question.votesCount + this.state.vote.value}
                </div>
                {this.getQuestionDownVote()}
              </div>
              <div className="col-md-8 col-xs-10">
                <div className="row">
                  <div className="col-xs-12" style={{marginTop:"15px"}}>
                    {this.getBody()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    {this.getTags()}
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
              </div>
              <div className="col-md-3 col-xs-12">
                {this.getTimeStampShort()}
                {this.getViews()}
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"3px",marginBottom:"50px"}}>
          <div className="col-md-10 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <div className="row" style={{borderBottom:"1px solid #ccc",marginBottom:"25px"}}>
              <div className="col-md-10 col-xs-12">
                {this.getAnswersHeader()}
              </div>
            </div>
            {this.getAnswers()}
            {this.getAnswerInput()}
            <div className="row" style={{marginTop:"10px"}}>
              <div className="col-md-1 col-xs-12">
              </div>
              <div className="col-md-8 col-xs-12">
                {this.getBody("answer")}
              </div>
              <div className="col-md-3 col-xs-12">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  handleClick_DeleteFoReal: function () {
    var state = this.state;
    state.flagDelete = false;
    state.isLoading = true;
    this.setState(state);

    QuestionStore.deleteQuestion(this.state.question._id, function (res) {
      BrowserHistory.push("/questions");
    }.bind(this));
  },

  handleClick_CancelDelete: function () {
    var state = this.state;
    state.flagDelete = false;
    this.setState(state);
  },

  handleClick_EditSave: function () {
    var state = this.state;
    state.isLoading = true;
    this.setState(state);

    QuestionStore.editQuestion(this.state.question._id, this.state.question, function (doc) {
      var state = this.state;
      state.question.title = doc.title;
      state.question.body = doc.body;
      state.question.tags = doc.tags;
      state.isLoading = false;
      state.edit = false;
      this.setState(state);
      this.sortAnswers();
    }.bind(this));
  },

  getTitle: function () {
    if (this.state.edit) {
      return (
        <div style={{marginTop:"15px"}}>
          <Form.Input
            attribute="question.title"
            value={this.state.question.title}
            onChange={this.handleChange_Field} />
        </div>
      )
    }

    return (
      <h1>{this.state.question.title}</h1>
    )
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
      return (
        <div className="col-xs-12" style={{color:"#07C",cursor:"pointer",marginTop:"10px"}} onClick={this.handleClick_AddComment}>
          add a comment
        </div>
      )
    }
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

  getAnswerInput: function () {
    if (this.state.postingAnswer) {
      return (
        <div className="row" style={{}}>
          <div className="col-xs-12" style={{cursor:"pointer",marginTop:"10px"}}>
            posting answer...
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-md-1 col-xs-12">
        </div>
        <div className="col-md-8 col-xs-12">
          <h3 style={{marginTop:"0px"}}>Your Answer</h3>
          <p>You can use markdown to format your post.</p>
          <Form.TextArea
            attribute="answer"
            value={this.state.answer}
            onChange={this.handleChange_Field} />
          <div style={{marginTop:"10px"}} />
          <ButtonPrimary
            label="Post your answer"
            onClick={this.handleClick_PostAnswer} />
        </div>
        <div className="col-md-3 col-xs-12">
        </div>
      </div>
    )
  },

  getViews: function () {
    return (
      <div style={{marginTop:"15px"}}>
        {this.state.question.viewsCount + " views"}
      </div>
    )
  },

  getAnswersHeader: function () {
    var answersCount = this.state.question.answers.length;
    var label = "Answers";
    if (answersCount == 1) label = label.substring(0, label.length - 1);
    return (
      <h3>{answersCount + " " + label}</h3>
    )
  },

  getComments: function () {
    if (this.state.question.comments) {
      return this.state.question.comments.map(function (comment, i) {
        function handleDeleteComment () {
          var state = this.state;
          state.question.comments.splice(i, 1);
          this.setState(state);
        }

        return (
          <ListItemComment key={comment._id} comment={comment} question={this.state.question} user={this.state.user} onDelete={handleDeleteComment.bind(this)} />
        )
      }.bind(this));
    }
  },

  getAnswers: function () {
    if (this.state.question.answers) {
      return this.state.question.answers.map(function (answer, i) {
        function handleUpdate_Answer (answer) {
          var state = this.state;
          for (var i = 0; i < state.question.answers.length; i++) {
            if (state.question.answers[i]._id == answer._id) {
              state.question.answers[i] = answer;
            } else {
              state.question.answers[i].accepted = false;
            }
          }
          this.setState(state);
        }

        function handleDelete_Answer () {
          this.componentDidMount();
        }

        return (
          <ListItemAnswer key={answer._id} answer={answer} question={this.state.question} user={this.state.user} updateAnswer={handleUpdate_Answer.bind(this)} onDelete={handleDelete_Answer.bind(this)} />
        )
      }.bind(this));
    }
  },

  getBody: function (type) {
    if (this.state.edit && !type) {
      return (
        <div style={{marginTop:"15px"}}>
          <Form.TextArea
            attribute="question.body"
            value={this.state.question.body}
            onChange={this.handleChange_Field} />
        </div>
      )
    }

    var body = "";
    if (this.state.question.body) body = this.state.question.body;
    if (type == "answer") body = this.state.answer;
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

  getTags: function () {
    if (this.state.edit) {
      return (
        <div style={{marginTop:"15px"}}>
          <Form.Input
            attribute="tagsString"
            value={this.state.tagsString}
            onChange={this.handleChange_Tags} />
        </div>
      )
    }

    var tags = this.state.question.tags.map(function (tag, i) {
      return (
        <span key={"tag-" + i} style={{backgroundColor:"#E1ECF4",marginRight:"5px",border:"1px solid #E1ECF4",color:"#39739d",padding:".4em .5em",fontSize:"12px"}}>
          <Link to={"/questions?tag=" + tag}>{tag}</Link>
        </span>
      )
    }.bind(this));

    return (
      <div style={{float:"left"}}>
        {tags}
      </div>
    )
  },

  handleClick_Edit: function () {
    var state = this.state;
    state.edit = true;
    this.setState(state);
  },

  handleClick_EditCancel: function () {
    var state = this.state;
    state.edit = false;
    state.isLoading = true;
    this.setState(state);
    this.componentDidMount();
  },

  handleClick_FlagDelete: function () {
    var state = this.state;
    state.flagDelete = true;
    this.setState(state);
  },

  getControls: function () {
    var controls = [];

    if (this.state.user.isAdmin || this.state.user.userName == this.state.question.createdBy) {
      if (!this.state.edit) {
        controls.push((
          <span key={"e"} style={{color:"#888",cursor:"pointer",marginRight:"10px"}}
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
          <span key={"c"} style={{color:"#888",cursor:"pointer",marginRight:"10px"}}
            onClick={this.handleClick_EditCancel}>
            cancel
          </span>
        ));

        controls.push((
          <span key={"d"} style={{color:"#888",cursor:"pointer",marginRight:"10px"}} onClick={this.handleClick_FlagDelete}>
            {"delete"}
          </span>
        ));
      }
    }

    return (
      <div style={{fontSize:"12px",marginTop:"7px"}}>
        {controls}
      </div>
    )
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

  getTimeStamp: function (type) {
    var label = "asked by";
    var person = this.state.question.createdBy;

    var modifiedOn = new Date(this.state.question.modifiedOn);
    var createdOn = new Date(this.state.question.createdOn);

    var currentTime = new Date();
    var timeSeconds = (currentTime - createdOn) / 1000;
    var timeLabel = this.getTimeLabel(timeSeconds, "seconds");

    if (!this.state.question.modifiedOn) return;
    if (!this.state.question.createdOn) return;

    if (modifiedOn.getTime() != createdOn.getTime()) {
      label = "modified by";
      person = this.state.question.modifiedBy;
      timeSeconds = (currentTime - modifiedOn) / 1000;
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

  getTimeStampShort: function (type) {
    var label = "asked";
    var person = this.state.question.createdBy;

    var modifiedOn = new Date(this.state.question.modifiedOn);
    var createdOn = new Date(this.state.question.createdOn);

    var currentTime = new Date();
    var timeSeconds = (currentTime - createdOn) / 1000;
    var timeLabel = this.getTimeLabel(timeSeconds, "seconds");

    if (!this.state.question.modifiedOn) return;
    if (!this.state.question.createdOn) return;

    return (
      <div style={{marginTop:"15px"}}>
        {label + " " + timeLabel}
      </div>
    )
  },

  getUserInfo: function () {
    var label = "asked by";
    var person = this.state.question.createdBy;

    var modifiedOn = new Date(this.state.question.modifiedOn);
    var createdOn = new Date(this.state.question.createdOn);

    var currentTime = new Date();
    var timeSeconds = (currentTime - createdOn) / 1000;
    var timeLabel = this.getTimeLabel(timeSeconds, "seconds");

    if (!this.state.question.modifiedOn) return;
    if (!this.state.question.createdOn) return;

    return (
      <div style={{backgroundColor:"#E1ECF4",marginRight:"5px",border:"1px solid #E1ECF4",color:"#39739d",padding:".4em .5em",fontSize:"12px",width:"100%"}}>
        {label + " " + person + " " + timeLabel}
      </div>
    )
  },

  handleClick_UpVoteComment: function () {
    var state = this.state;
    var vote = {
      value: 1,
      userId: this.state.user._id,
    }

    if (this.state.vote.value > 0) {
      state.question.votesCount = state.question.votesCountOriginal;
      vote = {
        value: 0,
        userId: this.state.user._id,
      };
    }

    state.vote = vote;
    this.setState(state);

    if (!this.state.user._id) return;

    QuestionStore.voteQuestion(this.state.question._id, state.vote, function () {

    }.bind(this));
  },

  handleClick_DownVoteComment: function () {
    var state = this.state;
    var vote = {
      value: -1,
      userId: this.state.user._id,
    };

    if (this.state.vote.value < 0) {
      state.question.votesCount = state.question.votesCountOriginal;
      vote = {
        value: 0,
        userId: this.state.user._id,
      };
    }

    state.vote = vote;
    this.setState(state);

    if (!this.state.user._id) return;

    QuestionStore.voteQuestion(this.state.question._id, state.vote, function () {

    }.bind(this));

  },

  handleClick_PostAnswer: function () {
    var state = this.state;
    state.postingAnswer = true;
    this.setState(state);

    var answer = {
      body: state.answer,
    };

    QuestionStore.addQuestionAnswer(this.state.question._id, answer, function (question) {
      var state = this.state;
      state.answer = "";
      state.question.answers = question.answers;
      state.postingAnswer = false;
      this.setState(state);
    }.bind(this));
  },

  handleClick_AddComment: function () {
    var state = this.state;
    state.openComment = true;
    this.setState(state);
  },

  handleClickNewQuestion: function () {
    BrowserHistory.push("/questions/new");
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    if (attribute.includes("question.")) state.question[attribute.replace("question.","")] = value;
    else state[attribute] = value;
    this.setState(state);
    this.sortAnswers();
  },

  handleClick_PostComment: function () {
    var state = this.state;
    state.postingComment = true;
    this.setState(state);

    var comment = {
      text: state.comment,
    };

    QuestionStore.addQuestionComment(this.state.question._id, comment, function (question) {
      var state = this.state;
      state.comment = "";
      state.question.comments = question.comments;
      state.postingComment = false;
      state.openComment = false;
      this.setState(state);
      this.sortAnswers();

    }.bind(this));
  },

  handleChange_Tags: function (attribute, tagsString) {
    var state = this.state;
    state.tagsString = tagsString;

    var tags = state.tagsString.split(",");
    state.question.tags = [];
    for (var i = 0; i < tags.length; i++) {
      // make sure it's not empty
      if (tags[i]) state.question.tags.push(tags[i]);
    }

    this.setState(state);
    this.sortAnswers();
  },
});

module.exports = Component;
