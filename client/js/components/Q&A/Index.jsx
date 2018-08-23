var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ListItem = require('./ListItem.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Form = require('../Form/Index.jsx');
var QuestionStore = require('../../stores').question;

function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

var Component = React.createClass({
  getInitialState: function () {
    return {
      search: '',
      questions: [],
      questionsAll: [],
      isLoading: true,
    }
  },

  componentDidMount: function () {
    document.title = "Q&A - Slate Robotics";
    window.scrollTo(0,0);

    var state = this.state;
    state.unlisten = BrowserHistory.listen(function (location) {
      if (location.pathname == "/questions") this.setQuestionState();
    }.bind(this));
    this.setState(state);

    QuestionStore.get({
      refresh: true,
      error: function (error) {
        var state = this.state;
        state.isLoading = false;
        state.error = "An error occurred loading the questions";
        this.setState(state);
      }.bind(this),
      success: function (docs) {
        var state = this.state;
        state.isLoading = false;
        state.questions = docs;
        state.questionsAll = docs;
        state.error = "";
        this.setState(state);
        this.setQuestionState();
      }.bind(this),
    });
  },

  componentWillUnmount: function () {
    this.state.unlisten();
  },

  setQuestionState: function () {
    var state = this.state;
    state.questions = state.questionsAll;
    state.questions.sort(function(a,b) {
      return new Date(b.modifiedOn) - new Date(a.modifiedOn);
    });

    if (state.search) {
      var search = state.search.toLowerCase();
      state.questions = state.questions.filter(function(question){
        var keep = false;
        keep = question.title.toLowerCase().includes(state.search);
        for (var i = 0; i < question.tags.length; i++) {
          if (question.tags[i].toLowerCase().includes(state.search)) {
            keep = true;
          }
        }
        return keep;
      });
    }

    var tag = gup('tag', location.href);
    if (tag) {
      state.questions = state.questions.filter(function(question){
        var keep = false;
        for (var i = 0; i < question.tags.length; i++) {
          if (question.tags[i] == tag) {
            keep = true;
          }
        }
        return keep;
      });
    }

    this.setState(state);
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{paddingTop:"3px"}}>
          <div className="col-md-10 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <div />
            <div className="row">
              <div className="col-md-10 col-xs-12">
                <h1>Question & Answer</h1>
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
            <div className="row" style={{marginBottom:"20px"}}>
              <div className="col-xs-12">
                <Form.Input
                  attribute="search"
                  placeholder="Search for a question..."
                  value={this.state.search}
                  onChange={this.handleChange_Field} />
              </div>
              {this.getTag()}
            </div>
            {this.getQuestions()}
          </div>
        </div>
      </div>
    )
  },

  getTag: function () {
    var tag = gup('tag', location.href);
    if (tag) {
      return (
        <div className="col-xs-12" style={{fontStyle:"italic",marginTop:"15px",color:"#777"}}>
          {"Searching for questions with tag: "}
          <span style={{backgroundColor:"#E1ECF4",marginRight:"5px",border:"1px solid #E1ECF4",color:"#39739d",padding:".4em .5em",fontSize:"12px"}}>
            <Link to={"/questions?tag=" + tag}>{tag}</Link>
          </span>
          <span style={{color:"#337ab7",cursor:"pointer",fontSize:"12px"}} onClick={this.handleClick_ClearTag}>
            clear
          </span>
        </div>
      )
    }
  },

  getQuestions: function () {
    if (this.state.isLoading) {
      return (
        <div className="row" style={{marginBottom:"20px"}}>
          <div className="col-xs-12 col-centered">
            <img src="/img/wait" style={{marginTop:"50px",display:"block",marginLeft:"auto",marginRight:"auto"}} />
          </div>
        </div>
      )
    }

    return this.state.questions.map(function (question, i) {
      return (
        <ListItem key={"question-" + i} question={question} />
      );
    }.bind(this));
  },

  handleClick_ClearTag: function () {
    BrowserHistory.push("/questions");
  },

  handleClickNewQuestion: function () {
    BrowserHistory.push("/questions/new");
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
    this.setQuestionState();
  },
});

module.exports = Component;
