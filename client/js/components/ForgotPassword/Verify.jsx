var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ApiService = require('../../services/data');

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var Component = React.createClass({
  getInitialState: function () {
    return {
      errors: [],
      isLoading: false,
      password: '',
      passwordConfirm: '',
    }
  },

  componentDidMount: function () {
    document.title = "Forgot Password - Slate Robotics";
    window.scrollTo(0,0);
  },

  getSubmitError: function () {
    var messages = "";
    for (var i = 0; i < this.state.errors.length; i++) {
      var error = this.state.errors[i];
      if (error.name == "submit") {
        messages += error.message + " ";
      }
    }
    if (messages) {
      return (
        <div className="col-md-4 col-xs-12 col-centered" style={{
            backgroundColor: "#fbfbfb",
            paddingTop: "15px",
            paddingBottom: "15px",
            borderRadius: "5px",
            border: "2px solid red",
            marginTop: "25px",
            marginBottom: "25px",
            color: "red",
          }}>
          <span>
            {messages}
          </span>
        </div>
      )
    }
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

  getBody: function () {
    if (this.state.success) {
      return (
        <div className="row">
          <div className="col-xs-12">
            Success! Your password has been reset. You may now login to the applicaiton.
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <Form.Label label="Password" isRequired />
            <Form.Input
              attribute="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange_Field} />
            {this.getError("password")}
          </div>
          <div className="col-xs-12">
            <Form.Label label="Confirm Password" isRequired />
            <Form.Input
              attribute="passwordConfirm"
              type="password"
              value={this.state.passwordConfirm}
              onChange={this.handleChange_Field} />
            {this.getError("passwordConfirm")}
          </div>
        </div>
        <div className="row" style={{marginTop:"15px"}}>
          <div className="col-xs-12">
            {this.getButton()}
          </div>
        </div>
      </div>
    )
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.containerTop}>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-4 col-xs-12 col-centered" style={{
              backgroundColor: "#fbfbfb",
              paddingTop: "15px",
              paddingBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "25px",
              marginBottom: "25px",
            }}>
            <h3>Password Reset Request</h3>
            {this.getBody()}
          </div>
          {this.getSubmitError()}
        </div>
      </div>
    );
  },

  validateData: function (callback) {
    var errors = [];
    if (!this.state.password) {
      errors.push({name:"password", message: "Password is a required field"});
    }
    if (!this.state.passwordConfirm) {
      errors.push({name:"passwordConfirm", message: "Password confirm is a required field"});
    }
    if (this.state.password != this.state.passwordConfirm) {
      errors.push({name:"passwordConfirm", message: "Passwords do not match."});
    }
    callback(errors);
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
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

      ApiService.resetPassword({
        id: this.props.params.id,
        token: getParameterByName('token'),
        password: this.state.password,
      }, function(data) {
        if (!data.success) {
          errors.push({name:"submit", message: data.message});
        }
        state.isLoading = false;
        state.success = data.success;
        this.setState(state);
      }.bind(this));
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
