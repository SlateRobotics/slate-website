var React = require('react');
var $ = require('jquery');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Form = require('../Form/Index.jsx');
var application = require('./application.js');
var jobs = require('./jobs.js');

var Component = React.createClass({
  getInitialState: function () {
    return {
      job: {},
      name: '',
      email: '',
      phone: '',
      basicQuestions: [],
      jobQuestions: [],
      error: '',
      isSubmitted: false,
      isSubmitting: false,
    }
  },

  componentDidMount: function () {
    document.title = "Apply - Slate Robotics";
    window.scrollTo(0,0);

    var state = this.state;
    state.basicQuestions = application.questions;
    for (var i = 0; i < jobs.length; i++) {
      if (this.props.params.id == jobs[i]._id) {
        state.job = jobs[i];
        for (var j = 0; j < state.job.questions.length; j++) {
          state.jobQuestions.push(state.job.questions[j]);
        }
        break;
      }
    }

    document.title = "Apply for " + state.job.name + " - Slate Robotics";
    this.setState(state);
  },

  render: function() {
    if (this.state.isSubmitted) {
      return (
          <div className="container-fluid" style={Style.container}>
            <div className="row">
              <div className="col-md-8 col-xs-12 col-centered">
                <h1>Thanks for applying!</h1>
                <h3>You should receive a confirmation email shortly that your application has been received. Have a great day!</h3>
              </div>
            </div>
          </div>
      )
    }

    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>{this.state.job.name + " Application"}</h1>
            <h4>
              We're building the future of general purpose robots. Join our
              growing team and play an integral part of the most important
              technological revolution of our lifetime.
            </h4>
            <p>
              {"Total Questions: "
                + (this.state.basicQuestions.length + this.state.jobQuestions.length)
                + " | Estimated Time: "
                + (this.state.basicQuestions.length + this.state.jobQuestions.length) * 1
                + " - "
                + (this.state.basicQuestions.length + this.state.jobQuestions.length) * 3
                + " minutes"}
            </p>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <div className="row">
              <div className="col-xs-12" style={{marginBottom:"15px"}}>
                <h2>Contact Information</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-xs-12" style={{marginBottom:"15px"}}>
                <p>First and Last Name</p>
                <Form.Input
                  attribute={"name"}
                  value={this.state.name}
                  onChange={this.handleChange_Application} />
              </div>
              <div className="col-lg-4 col-md-6 col-xs-12" style={{marginBottom:"15px"}}>
                <p>Email Address</p>
                <Form.Input
                  attribute={"email"}
                  value={this.state.email}
                  onChange={this.handleChange_Application} />
              </div>
              <div className="col-lg-4 col-md-6 col-xs-12" style={{marginBottom:"15px"}}>
                <p>Phone Number</p>
                <Form.Input
                  attribute={"phone"}
                  value={this.state.phone}
                  onChange={this.handleChange_Application} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12" style={{marginBottom:"15px"}}>
                <h2>Personality and Background</h2>
              </div>
            </div>
            <div className="row">
              {this.getQuestions("basicQuestions")}
            </div>
            {this.getJobQuestions()}
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <p style={{marginBottom:"15px"}}>
              Thanks for taking the time to apply! If we're interested in moving forward, we will follow-up with you within 3 business days, where we may schedule an in-person interview. If you have any questions, you may contact us using the contact  information presented in the footer of this page.
            </p>
            {this.getError()}
            {this.getSubmitButton()}
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
      </div>
    );
  },

  getError: function () {
    if (this.state.error) {
      return (
        <p style={{color:"red",marginBottom:"15px"}}>
          {this.state.error}
        </p>
      )
    }
  },

  getSubmitButton: function () {
    if (!this.state.isSubmitting) {
      return (
        <ButtonPrimary
          label="Submit"
          onClick={this.handleClick_Submit} />
      )
    } else {
      return (
        <p>Submitting...</p>
      )
    }
  },

  getJobQuestions: function () {
    if (this.state.jobQuestions.length > 0) {
      return (
        <div>
          <div className="row">
            <div className="col-xs-12" style={{marginBottom:"15px"}}>
              <h2>Job-specific Questions</h2>
            </div>
          </div>
          <div className="row">
            {this.getQuestions("jobQuestions")}
          </div>
        </div>
      )
    }
  },

  getQuestions: function (type) {
    return this.state[type].map(function (question, i) {
      var getResponseField  = function (q, idx) {
        function handleChange (value) {
          var state = this.state;
          if (type == "basicQuestions") {
            state.basicQuestions[idx].answer = value;
          } else if (type == "jobQuestions") {
            state.jobQuestions[idx].answer = value;
          }
          this.setState(state);
        }

        if (question.type == "input") {
          return (
            <Form.Input
              value={q.answer}
              onChange={handleChange.bind(this)} />
          )
        } else {
          return (
            <Form.TextArea
              value={q.answer}
              onChange={handleChange.bind(this)} />
          )
        }
      }.bind(this)

      return (
        <div key={"question-" + i} className="col-xs-12" style={{marginBottom:"25px"}}>
          <p>{(i + 1) + ". " + question.name}</p>
          {getResponseField(question, i)}
        </div>
      )
    }.bind(this));
  },

  handleClick_Submit: function () {
    var state = this.state;
    state.isSubmitting = true;
    this.setState(state);

    var application = {};
    application.position = this.state.job.name;
    application.name = this.state.name;
    application.email = this.state.email;
    application.phone = this.state.phone;
    application.questions = [];

    for (var i = 0; i < this.state.basicQuestions.length; i++) {
      application.questions.push(this.state.basicQuestions[i]);
    }

    for (var i = 0; i < this.state.jobQuestions.length; i++) {
      application.questions.push(this.state.jobQuestions[i]);
    }

    $.ajax({
      url: '/stores/application/',
      type: 'POST',
  		contentType: "application/json",
  		data: JSON.stringify({application: application}),
  		dataType: 'json',
      success: function(data) {
        if (data.success) {
          var state = this.state;
          state.isSubmitting = false;
          state.isSubmitted = true;
          this.setState(state);
          window.scrollTo(0,0);
        } else {
          var state = this.state;
          state.error = data.message;
          state.isSubmitted = false;
          state.isSubmitting = false;
          this.setState(state);
        }
      }.bind(this),
      error: function(xhr, ajaxOptions, thrownError) {
        console.log("XHR Status:", xhr.status);
        console.log("Thrown Error:", thrownError);
      }
    });
  },

  handleChange_Application: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
  },
});

module.exports = Component;
