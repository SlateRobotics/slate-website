var React = require('react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var BlogStore = require('../../stores').blog;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var Component = React.createClass({
  getInitialState: function () {
    return {
      errors: [],
      isLoading: true,
      blog: {},
    }
  },

  componentWillMount: function () {
    if (this.props.params.id) {
      BlogStore.get({
        id: this.props.params.id,
        error: function (error) {
          var state = this.state;
          state.errors.push({name:"load",message:error});
          state.isLoading = false;
          this.setState(state);
        }.bind(this),
        success: function (doc) {
          var state = this.state;
          state.blog = doc;
          state.isLoading = false;
          this.setState(state);
          document.title = this.state.blog.title + " - Blog - Slate Robotics";
        }.bind(this),
      });
    } else {
      var state = this.state;
      state.isLoading = false;
      this.setState(state);
    }
  },

  componentDidMount: function () {
    document.title = this.state.blog.title + " - Blog - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-8 col-xs-12 col-centered" style={{
              backgroundColor: "#fbfbfb",
              paddingTop: "15px",
              paddingBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "25px",
              marginBottom: "25px",
            }}>
            <h3>Edit blog</h3>
            <div className="row">
              <div className="col-xs-12">
                <Form.Label label="Status" isRequired />
                <Form.Select
                  attribute="status"
                  options={["Active","In Progress","Archive"]}
                  value={this.state.blog.status}
                  onChange={this.handleChange_Field} />
                {this.getError("status")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Title" isRequired />
                <Form.Input
                  attribute="title"
                  value={this.state.blog.title}
                  onChange={this.handleChange_Field} />
                {this.getError("title")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Subtitle" isRequired />
                <Form.Input
                  attribute="subtitle"
                  value={this.state.blog.subtitle}
                  onChange={this.handleChange_Field} />
                {this.getError("subtitle")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="By" isRequired />
                <Form.Input
                  attribute="by"
                  value={this.state.blog.by}
                  onChange={this.handleChange_Field} />
                {this.getError("by")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Main Image" isRequired />
                <Form.Input
                  attribute="img"
                  value={this.state.blog.img}
                  onChange={this.handleChange_Field} />
                {this.getError("img")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Published On" />
                <Form.Input
                  attribute="publishedOn"
                  value={this.state.blog.publishedOn}
                  onChange={this.handleChange_Field} />
                {this.getError("publishedOn")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Body" isRequired />
                <Form.TextArea
                  attribute="body"
                  value={this.state.blog.body}
                  onChange={this.handleChange_Field} />
                {this.getError("body")}
              </div>
            </div>
            <div style={{marginTop:"25px"}} />
            <div className="row">
              <div className="col-xs-12">
                {this.getButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  getButton: function () {
    if (this.state.isLoading) {
      return (
        <ButtonSecondary label="Processing..." disabled />
      )
    } else {
      return (
        <ButtonPrimary label="Submit" onClick={this.handleClick_Submit} />
      )
    }
  },

  validateData: function (callback) {
    var errors = [];
    if (!this.state.blog.status) {
      errors.push({name:"status", message: "Status is a required field"});
    }
    if (!this.state.blog.title) {
      errors.push({name:"title", message: "Title is a required field"});
    }
    if (!this.state.blog.subtitle) {
      errors.push({name:"subtitle", message: "Subtitle is a required field"});
    }
    if (!this.state.blog.by) {
      errors.push({name:"by", message: "By is a required field"});
    }
    if (!this.state.blog.img) {
      errors.push({name:"img", message: "Image is a required field"});
    }
    if (!this.state.blog.status == "Active" && this.state.blog.publishedOn) {
      errors.push({name:"publishedOn", message: "Published on is a required field for Active blogs"});
    }
    if (!this.state.blog.img) {
      errors.push({name:"body", message: "Body is a required field"});
    }
    callback(errors);
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state.blog[attribute] = value;
    this.setState(state);
  },

  handleClick_Submit: function () {
    var state = this.state;
    state.isLoading = true;
    state.errors = [];
    this.setState(state);

    this.validateData(function (errors) {
      state.errors = errors;
      this.setState(state);

      if (errors.length > 0) {
        state.isLoading = false;
        this.setState(state);
        return;
      }

      var blog = this.state.blog;
      if (blog._id) {
        BlogStore.update(blog, function (data) {
          BrowserHistory.push("/blog");
        });
      } else {
        BlogStore.insert(blog, function (data) {
          BrowserHistory.push("/blog");
        });
      }
    }.bind(this));
  },

  getError: function (name) {
    var messages = "";
    for (var i = 0; i < this.state.errors.length; i++) {
      var error = this.state.errors[i];
      if (error.name == name) {
        messages += error.message + " ";
      }
    }

    if (messages != "") {
      return (
        <span style={{fontSize:"11px",fontStyle:"italic",color:"red"}}>
          {messages}
        </span>
      )
    }
  },
});

module.exports = Component;
