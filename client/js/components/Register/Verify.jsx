var React = require('react');
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ApiService = require('../../services/data');

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var Component = React.createClass({
  getInitialState: function () {
    return {
      submitting: true,
    }
  },

  componentWillMount: function () {
    if (!getParameterByName('token')) {
      return this.setState({
        success: false,
        message: "A token was not supplied.",
      });
    }

    ApiService.setupUser({
      id: this.props.params.id,
      token: getParameterByName('token'),
    }, function (data) {
      var state = this.state;
  		state.submitting = false;
  		state.submitted = true;
  		state.success = data.success;
  		state.message = data.message;
      return this.setState(state);
    }.bind(this));
  },

  render: function () {
    if (this.state.submitting === true) {
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
              <h3>Verifying...</h3>
              <div className="row">
                <div className="col-xs-12">
                  <img src="/img/wait" style={{height:"40px",paddingRight:"5px"}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.submitted === true && this.state.success === true) {
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
              <h3>Verifying...</h3>
              <div className="row">
                <div className="col-xs-12">
                  <span>{this.getSuccessMessage()}</span>
                  <span>{" "}</span>
                  <span>Click <a href="/sign-in">here</a> to login.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

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
            <h3>Verifying...</h3>
            <div className="row">
              <div className="col-xs-12">
            		<div>
                  {this.getSuccessMessage()}
                  {this.getErrorMessage()}
            		</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  	)
  },

  getSuccessMessage: function () {
    if (this.state.success === true) {
      return (
        <div style={{paddingTop:"5px"}}>
          {this.state.message}
        </div>
      )
    }
  },

  getErrorMessage: function () {
  	if (this.state.success === false) {
  		return (
  			<div style={{color:"#da383c", paddingTop:"5px"}}>
          {this.state.message}
  			</div>
  		)
  	}
  },
});

module.exports = Component;
