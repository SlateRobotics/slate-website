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
      name: '',
      number: '',
      expiration: '',
      cvc: '',
    }
  },

  componentWillMount: function () {
    CartStore.getOne(0, function (doc) {
      if (doc && doc.payment) {
        this.setState(doc.payment);
      } else {
        doc.payment = this.state;
        CartStore.update(doc);
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div className="row" style={{textAlign:"left"}}>
        <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
          <img
            src="/img/powered-by-stripe"
            className="hidden-xs"
            style={{height:"75px",float:"right"}} />
          <img
            src="/img/powered-by-stripe"
            className="hidden-lg hidden-md hidden-sm"
            style={{height:"75px",margin:"0px auto",display:"block",marginBottom:"35px"}} />
          <h2>Credit/Debit Card</h2>
          <div className="row">
            <div className="col-xs-12">
              <Form.Label label="Cardholder Name" isRequired />
              <Form.Input
                attribute="name"
                value={this.state.name}
                onChange={this.handleChange_Field} />
            </div>
            <div className="col-xs-12">
              <Form.Label label="Credit Card Number" isRequired />
              <Form.Input
                attribute="number"
                value={this.state.number}
                onChange={this.handleChange_Field} />
            </div>
            <div className="col-md-6 col-xs-12">
              <Form.Label label="Expiration" isRequired />
              <Form.Input
                attribute="expiration"
                value={this.state.expiration}
                placeholder="mm/yy"
                onChange={this.handleChange_Field} />
            </div>
            <div className="col-md-6 col-xs-12">
              <Form.Label label="CVC" isRequired />
              <Form.Input
                attribute="cvc"
                value={this.state.cvc}
                onChange={this.handleChange_Field} />
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

    CartStore.getOne(0, function (doc) {
      doc.payment = this.state;
      CartStore.update(doc);
    }.bind(this));

    if (this.props.onChange) {
      this.props.onChange(state);
    }
  },
});

module.exports = Component;
