var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var CartStore = require('../../stores').cart;

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
        //return BrowserHistory.push("/shop/tr1");
        return this.setState({
          order: {
            id: 0,
            total: 2624.00,
            config: {
              computer: 0,
              linearActuator: 0,
              battery: 0,
              shipping: 1,
            },
            shipping: {
              firstName: "Zachary",
              lastName: "Allen",
              address1: "4826 W Stanford St.",
              address2: "",
              city: "Springfield",
              state: "MO",
              zip: "65802",
            },
            billing: {
              isSame: true,
              firstName: "",
              lastName: "",
              address1: "",
              address2: "",
              city: "",
              state: "",
              zip: "",
            },
            payment: {
              name: "Zachary H Allen",
              number: "0000111122223333",
              expiration:"08/22",
              cvc: "656",
            }
          }
        });
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
                  <div>Credit/Debit Card: **** {this.state.order.payment.number.substr(this.state.order.payment.number.length - 4)}</div>
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
              <div>
                <ButtonSecondary
                  label="Edit Order"
                  onClick={this.handleClick_Edit} />
                <span style={{marginLeft:"15px"}} />
                <ButtonPrimary
                  label="Place Order"
                  onClick={this.handleClick_Place} />
              </div>
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
    BrowserHistory.push("/checkout/success");
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

  getOverviewText: function (index, arrayName, arrayPrice) {
    if (arrayPrice[index] == 0) {
      return (
        <span>{arrayName[index]}</span>
      )
    } else {
      var value = arrayPrice[index].toLocaleString('en-US', { minimumFractionDigits: 2 });
      return (
        <b>{arrayName[index] + " (+$" + value + ")"}</b>
      )
    }
  },

  getSubtotalString: function () {
    var total = this.state.order.total;
    return "$" + total.toFixed(2).toLocaleString('en-US', { minimumFractionDigits: 2 });
  },

  getTaxString: function () {
    var total = this.state.order.total * 0.04225;
    return "$" + total.toFixed(2).toLocaleString('en-US', { minimumFractionDigits: 2 });
  },

  getTotalString: function () {
    var total = this.state.order.total + (this.state.order.total * 0.04225);
    return "$" + total.toFixed(2).toLocaleString('en-US', { minimumFractionDigits: 2 });
  },
});

module.exports = Component;
