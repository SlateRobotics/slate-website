var React = require('react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var UserStore = require('../../stores').user;
var OrderStore = require('../../stores').order;

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
      errors: [],
      isLoading: true,
      order: {
        shipping: {},
      },
    }
  },

  componentWillMount: function () {
    UserStore.addChangeListener(this.handleChange_UserStore);
    if (this.props.params.id) {
  		OrderStore.get({
        refresh: true,
        id: this.props.params.id,
        params: "token=" + gup('token', location.href),
        error: function (error) {
          var state = this.state;
          state.errors.push({name:"load",message:error});
          state.isLoading = false;
          this.setState(state);
        }.bind(this),
        success: function (data) {
    			var state = this.state;
    			state.order = data;
          state.isLoading = false;
    			this.setState(state);
        }.bind(this),
      });
    } else {
      var state = this.state;
      state.isLoading = false;
      this.setState(state);
    }
  },

  componentDidMount: function () {
    document.title = "Edit Order - Slate Robotics";
    window.scrollTo(0,0);
  },

  componentWillUnmount: function () {
		UserStore.removeChangeListener(this.handleChange_UserStore);
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
            <h3>Edit Order</h3>
            <div className="row">
              <div className="col-xs-12">
                <Form.Label label="Status" isRequired />
                <Form.Select
                  attribute="status"
                  options={["Placed","Began Build","Shipped"]}
                  value={this.state.order.status}
                  onChange={this.handleChange_Field} />
                {this.getError("status")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Token" isRequired />
                <Form.Input
                  attribute="token"
                  value={this.state.order.token}
                  onChange={this.handleChange_Field} />
                {this.getError("token")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Total" isRequired />
                <Form.Input
                  attribute="total"
                  value={this.state.order.total}
                  onChange={this.handleChange_Field} />
                {this.getError("total")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Began Build On" isRequired />
                <Form.Input
                  attribute="beganBuildOn"
                  value={this.state.order.beganBuildOn}
                  onChange={this.handleChange_Field} />
                {this.getError("beganBuildOn")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Shipped On" isRequired />
                <Form.Input
                  attribute="shippedOn"
                  value={this.state.order.shippedOn}
                  onChange={this.handleChange_Field} />
                {this.getError("shippedOn")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Tracking URL" isRequired />
                <Form.Input
                  attribute="trackingUrl"
                  value={this.state.order.shipping.trackingUrl}
                  onChange={this.handleChange_Field} />
                {this.getError("trackingUrl")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Tracking Number" isRequired />
                <Form.Input
                  attribute="trackingNumber"
                  value={this.state.order.shipping.trackingNumber}
                  onChange={this.handleChange_Field} />
                {this.getError("trackingNumber")}
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
    if (!this.state.order.status) {
      errors.push({name:"status", message: "Status is a required field"});
    }
    if (!this.state.order.token) {
      errors.push({name:"token", message: "Token is a required field"});
    }
    if (!this.state.order.total) {
      errors.push({name:"total", message: "Total is a required field"});
    }
    callback(errors);
  },

	handleChange_UserStore: function () {
		var users = UserStore.find();
		if (users.length > 0) {
			var state = this.state;
			state.user = users[0];
			this.setState(state);
		}
	},

  handleChange_Field: function (attribute, value) {
    var state = this.state;

    if (attribute == "trackingUrl") {
      state.order.shipping[attribute] = value;
    } else if (attribute == "trackingNumber") {
      state.order.shipping[attribute] = value;
    } else {
      state.order[attribute] = value;
    }
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

      var order = this.state.order;
      if (order._id) {
        OrderStore.update(order, function (data) {
          BrowserHistory.push("/admin/orders");
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
