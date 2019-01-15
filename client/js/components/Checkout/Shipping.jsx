var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Form = require('../Form/Index.jsx');
var CartStore = require('../../stores').cart;

var Component = React.createClass({
  getInitialState: function () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
    }
  },

  componentWillMount: function () {
    var shipping = CartStore.getShipping();
    this.setState(shipping);
  },

  render: function() {
    return (
      <div className="row" style={{textAlign:"left"}}>
        <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
          <h2>Shipping Information</h2>
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <Form.Label label="First Name" isRequired />
              <Form.Input
                attribute="firstName"
                value={this.state.firstName}
                onChange={this.handleChange_Field} />
            </div>
            <div className="col-md-6 col-xs-12">
              <Form.Label label="Last Name" isRequired />
              <Form.Input
                attribute="lastName"
                value={this.state.lastName}
                onChange={this.handleChange_Field} />
            </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Email" isRequired />
                <Form.Input
                  attribute="email"
                  value={this.state.email}
                  onChange={this.handleChange_Field} />
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Phone" isRequired />
                <Form.Input
                  attribute="phone"
                  value={this.state.phone}
                  onChange={this.handleChange_Field} />
              </div>
            <div className="col-xs-12">
              <Form.Label label="Address" isRequired />
              <Form.Input
                attribute="address1"
                value={this.state.address1}
                onChange={this.handleChange_Field} />
              <div style={{marginTop:"15px"}} />
              <Form.Input
                attribute="address2"
                value={this.state.address2}
                onChange={this.handleChange_Field} />
            </div>
            <div className="col-md-6 col-xs-12">
              <Form.Label label="City" isRequired />
              <Form.Input
                attribute="city"
                value={this.state.city}
                onChange={this.handleChange_Field} />
            </div>
            <div className="col-md-3 col-xs-12">
              <Form.Label label="State" isRequired />
              <Form.Input
                attribute="state"
                value={this.state.state}
                onChange={this.handleChange_Field} />
            </div>
            <div className="col-md-3 col-xs-12">
              <Form.Label label="Zip/Postal Code" isRequired />
              <Form.Input
                attribute="zip"
                value={this.state.zip}
                onChange={this.handleChange_Field}
                onKeyPress={this.handleKeyPress_Zip} />
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);

    CartStore.setShipping(this.state);

    if (this.props.onChange) {
      this.props.onChange(state);
    }
  },

  handleKeyPress_Zip: function (attribute, keyCode) {
    if (keyCode == 13) {
      this.props.next();
    }
  },
});

module.exports = Component;
