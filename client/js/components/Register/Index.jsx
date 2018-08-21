var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ApiService = require('../../services/data');

var Component = React.createClass({
  getInitialState: function () {
    return {
      errors: [],
      isLoading: false,
      success: false,
      userName: '',
      email: '',
      emailConfirm: '',
      password: '',
    }
  },

  componentDidMount: function () {
    document.title = "Register - Slate Robotics";
    window.scrollTo(0,0);
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
            Success! Check your email for a link to complete
            the registration process.
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <Form.Label label="User Name" isRequired />
            <Form.Input
              attribute="userName"
              value={this.state.userName}
              onChange={this.handleChange_Field} />
            {this.getError("userName")}
          </div>
          <div className="col-xs-12">
            <Form.Label label="Email" isRequired />
            <Form.Input
              attribute="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange_Field} />
            {this.getError("email")}
          </div>
          <div className="col-xs-12">
            <Form.Label label="Confirm email" isRequired />
            <Form.Input
              attribute="emailConfirm"
              type="email"
              value={this.state.emailConfirm}
              onChange={this.handleChange_Field} />
            {this.getError("emailConfirm")}
          </div>
          <div className="col-xs-12">
            <Form.Label label="Password" isRequired />
            <Form.Input
              attribute="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange_Field} />
            {this.getError("password")}
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
            <h3>Register an account</h3>
            {this.getBody()}
          </div>
          {this.getSubmitError()}
          <div className="col-md-4 col-xs-12 col-centered" style={{
              backgroundColor: "#fbfbfb",
              paddingTop: "15px",
              paddingBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "25px",
              marginBottom: "25px",
            }}>
            <span>{"Already have an account? "}</span>
            <Link to="/sign-in">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
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
        <span style={{fontSize:"11px",fontStyle:"italic",color:"red"}}>{messages}</span>
      )
    }
  },

  validateData: function (callback) {
    var errors = [];
    if (!this.state.userName) {
      errors.push({name:"userName", message: "User Name is a required field"});
    }
    if (!this.state.email) {
      errors.push({name:"email", message: "Email is a required field"});
    }
    if (!this.state.emailConfirm) {
      errors.push({name:"emailConfirm", message: "Email confirm is a required field"});
    }
    if (!this.state.password) {
      errors.push({name:"password", message: "Password is a required field"});
    }
    if (this.state.email != this.state.emailConfirm) {
      errors.push({name:"emailConfirm", message: "Emails do not match"});
    }
    callback(errors);
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

      ApiService.requestUserSetup({
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password
      }, function(data) {
        if (data.success == false) {
          state.errors.push({name:"submit", message: data.message})
        }
        state.isLoading = false;
        state.success = data.success;
        this.setState(state);
      }.bind(this));

    }.bind(this));
  },
});

module.exports = Component;
