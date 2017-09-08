var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var CartStore = require('../../stores').cart;
var $ = require('jquery');

var basePrice = 2499;
var computer = [0, 300, 400];
var computerName = ["NVIDIA Jetson TK1", "NVIDIA Jetson TX1", "NVIDIA Jetson TX2"];
var linearActuator = [0, 50];
var linearActuatorName = ["12in 5.7mm/s Linear Actuator", "12in 10mm/s Linear Actuator"];
var battery = [0, 30];
var batteryName = ["12V 8AH Lead-Acid Battery", "12V 20AH Lead-Acid Battery"];
var shipping = [0, 125, 375, 550];
var shippingName = ["Local Pickup - Springfield, MO", "UPS Ground", "UPS 3 Day Select®", "UPS 2nd Day Air®"];

var Component = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false,
      error: '',
      order: {
        id: 0,
        total: 0,
        config: {},
        shipping: {},
        billing: {},
        payment: {},
      }
    }
  },

  componentWillMount: function () {
    CartStore.getOne(0, function (doc) {
      if (!doc) {
        return BrowserHistory.push("/shop/tr1");
      }

      this.setState({order: doc});
    }.bind(this));
  },

  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
            <h1>Order Review</h1>
            <div style={{color:"#da383c"}}>
              Your order has yet not been placed. Please review
              the details below and click "Place Order".
            </div>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
        <div className="row">
          <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-6 col-xs-12" style={{textAlign:"left",paddingBottom:"15px"}}>
                <h2 style={{marginTop:"0px"}}>Shipping Details</h2>
                <div style={{lineHeight:"150%"}}>
                  <div>{this.state.order.shipping.firstName + " " + this.state.order.shipping.lastName}</div>
                  <div>{this.state.order.shipping.address1}</div>
                  <div>{this.state.order.shipping.address2}</div>
                  <div>{this.state.order.shipping.city + ", " + this.state.order.shipping.state + " " + this.state.order.shipping.zip}</div>
                </div>
              </div>
                <div className="col-md-6 col-xs-12" style={{textAlign:"left",paddingBottom:"15px"}}>
                  <h2 style={{marginTop:"0px"}}>Billing Details</h2>
                  {this.getBillingDetails()}
                </div>
              <div className="col-md-6 col-xs-12" style={{textAlign:"left",paddingBottom:"15px"}}>
                <h2 style={{marginTop:"0px"}}>TR1 Configuration</h2>
                <div style={{lineHeight:"150%"}}>
                  <div style={{color:"#aaa"}}>TR1 Base Price ($2,499.00)</div>
                  <div>{this.getOverviewText(this.state.order.config.computer, computerName, computer)}</div>
                  <div>{this.getOverviewText(this.state.order.config.linearActuator, linearActuatorName, linearActuator)}</div>
                  <div>{this.getOverviewText(this.state.order.config.battery, batteryName, battery)}</div>
                  <div>{this.getOverviewText(this.state.order.config.shipping, shippingName, shipping)}</div>
                </div>
              </div>
              <div className="col-md-6 col-xs-12" style={{textAlign:"left",paddingBottom:"15px"}}>
                <h2 style={{marginTop:"0px"}}>Payment Details</h2>
                <div style={{lineHeight:"150%"}}>
                  <div>Credit/Debit Card: **** {this.getLast4()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-10 col-xs-12 col-centered"
            style={{borderTop:"1px solid #ccc",paddingTop:"15px"}}>
            <div style={{textAlign:"left"}}>
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                  Subtotal
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6" style={{textAlign:"right"}}>
                  {this.getSubtotalString()}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                  Estimated Tax
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6" style={{textAlign:"right"}}>
                  {this.getTaxString()}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                  <h3>Total</h3>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6" style={{textAlign:"right"}}>
                  <h3>{this.getTotalString()}</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12" style={{paddingBottom:"15px",fontStyle:"italic",fontSize:"14px"}}>
                  Estimated Shipment Date: 12/15/2017
                </div>
              </div>
              {this.getButtons()}
            </div>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
      </div>
    );
  },

  handleClick_Edit: function () {
    BrowserHistory.push("/checkout");
  },

  handleClick_Place: function () {
    var state = this.state;
    state.isLoading = true;
    state.error = '';
    this.setState(state);

    var order = this.state.order;
    if (order.billing.isSame) {
      order.billing = order.shipping;
      order.card = {
        token: order.payment.token.id,
        last4: order.payment.token.card.last4,
      }
      order.user = {
        email: order.shipping.email,
        phone: order.shipping.phone,
      }
      order.products = [{
        productId: "tr1",
        config: [
          {name: "computer", value: order.config.computer},
          {name: "linearActuator", value: order.config.linearActuator},
          {name: "battery", value: order.config.battery},
          {name: "shipping", value: order.config.shipping}
        ],
      }];
    }

    $.ajax({
      type: "POST",
      url: "/placeOrder",
      data: order,
      success: function (result) {
        if (result.success == true) {
          CartStore.clear();
          BrowserHistory.push("/checkout/success");
        } else {
          var state = this.state;
          state.isLoading = false;
          state.error = result.message;
          this.setState(state);
        }
      }.bind(this),
      dataType: "json"
    });
  },

  getLast4: function () {
    if (this.state.order.payment.token) {
      if (this.state.order.payment.token.card) {
        return this.state.order.payment.token.card.last4;
      }
    }
  },

  getBillingDetails: function () {
    if (this.state.order.billing.isSame == true) {
      return (
        <div style={{lineHeight:"150%"}}>
          <div>{this.state.order.shipping.firstName + " " + this.state.order.shipping.lastName}</div>
          <div>{this.state.order.shipping.address1}</div>
          <div>{this.state.order.shipping.address2}</div>
          <div>{this.state.order.shipping.city + ", " + this.state.order.shipping.state + " " + this.state.order.shipping.zip}</div>
        </div>
      )
    } else {
      return (
        <div style={{lineHeight:"150%"}}>
          <div>{this.state.order.billing.firstName + " " + this.state.order.billing.lastName}</div>
          <div>{this.state.order.billing.address1}</div>
          <div>{this.state.order.billing.address2}</div>
          <div>{this.state.order.billing.city + ", " + this.state.order.billing.state + " " + this.state.order.billing.zip}</div>
        </div>
      )
    }
  },

  getButtons: function () {
    if (this.state.isLoading == true) {
      return (
        <div>Processing...</div>
      )
    }

    return (
      <div>
        <ButtonSecondary
          label="Edit Order"
          onClick={this.handleClick_Edit} />
        <span style={{marginLeft:"15px"}} />
        <ButtonPrimary
          label="Place Order"
          onClick={this.handleClick_Place} />
        <div style={{marginTop:"10px", color:"#da383c"}}>
          {this.state.error}
        </div>
      </div>
    )
  },

  getOverviewText: function (index, arrayName, arrayPrice) {
    if (arrayPrice[index] == 0) {
      return (
        <span>{arrayName[index]}</span>
      )
    } else {
      var value = 0;
      if (arrayPrice[index]) {
        value = arrayPrice[index].toLocaleString('en-US', { minimumFractionDigits: 2 });
      }
      return (
        <b>{arrayName[index] + " (+$" + value + ")"}</b>
      )
    }
  },

  getSubtotalString: function () {
    var subtotal = 0;
    if (this.state.order && this.state.order.total) {
      subtotal = this.state.order.total;
    }
    return "$" + subtotal.toFixed(2).toLocaleString('en-US', { minimumFractionDigits: 2 });
  },

  calculateTaxes: function () {
    var mo = ["MO","MISSOURI"];
    var moSalesTax = 0.04225;
    var greeneCountySalesTax = 0.01250;
    var springfieldSalesTax = 0.02125;
    var salesTax = moSalesTax + greeneCountySalesTax + springfieldSalesTax;

    if (this.state.order.shipping.state) {
      if (mo.indexOf(this.state.order.shipping.state.toUpperCase()) > -1) {
        return (this.state.order.total * salesTax);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  },

  getTaxString: function () {
    return "$" + this.calculateTaxes().toFixed(2)
      .toLocaleString('en-US', { minimumFractionDigits: 2 });
  },

  getTotalString: function () {
    var total = 0;
    if (this.state.order && this.state.order.total) {
      total = this.state.order.total + this.calculateTaxes();
    }
    return "$" + total.toFixed(2).toLocaleString('en-US', { minimumFractionDigits: 2 });
  },
});

module.exports = Component;
