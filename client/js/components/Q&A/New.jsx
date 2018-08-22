var React = require('react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ListItemComment = require('./ListItemComment.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var QuestionStore = require('../../stores').question;
var Form = require('../Form/Index.jsx');
var UserStore = require('../../stores').user;

var Component = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      question: {
        title: '',
        body: '',
        tagsString: '',
        tags: [],
      },
      user: {},
    }
  },

  componentDidMount: function () {
    document.title = "Ask Question - Slate Robotics";
    window.scrollTo(0,0);

    UserStore.getMe(function (me) {
      var state = this.state;
      state.isLoading = false,
      state.user = me;
      this.setState(state);
    }.bind(this));
  },

  render: function() {
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

    if (!this.state.user._id) {
      return (
        <div className="container-fluid" style={Style.container}>
          <div className="row" style={{paddingTop:"3px"}}>
            <div className="col-md-10 col-xs-12 col-centered" style={{textAlign:"left"}}>
              <div className="row" style={{marginBottom:"20px"}}>
                <div className="col-xs-12 col-centered">
                  <h3>You must be logged in to post a question</h3>
                  <Link to="/sign-in">Sign in here</Link>
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
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <h1>Post a question</h1>
                <h3>Title</h3>
                <Form.Input
                  attribute="title"
                  value={this.state.question.title}
                  onChange={this.handleChange_Field} />
                <h3>Question</h3>
                <p>You can use markdown to format your post.</p>
                <Form.TextArea
                  attribute="body"
                  value={this.state.question.body}
                  onChange={this.handleChange_Field} />
                <div style={{marginTop:"10px"}} />
                <h3>Tags</h3>
                <p><i>Comma delineated (e.x.: tr1, gazebo, tr1_gazebo)</i></p>
                <Form.Input
                  attribute="tagsString"
                  value={this.state.question.tagsString}
                  onChange={this.handleChange_Field} />
                <div style={{marginTop:"10px"}} />
                <ButtonPrimary
                  label="Post your question"
                  onClick={this.handleClick_Post} />
              </div>
              <div className="col-md-6 col-xs-12">
                <h1>{this.state.title}</h1>
                {this.getBody()}
                <div className="row">
                  <div className="col-xs-12">
                    {this.getTags()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  getBody: function () {
    var body = "";
    if (this.state.question.body) body = this.state.question.body;
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

  handleClick_Post: function () {
    QuestionStore.insert(this.state.question, function (data) {
      BrowserHistory.push("/questions");
    });
  },

  parseTags: function () {
    var state = this.state;
    var tags = this.state.question.tagsString.split(",");
    state.question.tags = [];
    for (var i = 0; i < tags.length; i++) {
      // make sure it's not empty
      if (tags[i]) state.question.tags.push(tags[i]);
    }
    this.setState(state);
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state.question[attribute] = value;
    this.setState(state);
    this.parseTags();
  },
});

module.exports = Component;
