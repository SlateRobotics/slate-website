var React = require('react');
var $ = require('jquery');
var moment = require('moment');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var OrderStore = require('../../stores/order');

var basePrice = 2499;
var computer = [0, 300, 400];
var computerName = ["NVIDIA Jetson TK1", "NVIDIA Jetson TX1", "NVIDIA Jetson TX2"];
var linearActuator = [0, 50];
var linearActuatorName = ["12in 5.7mm/s Linear Actuator", "12in 10mm/s Linear Actuator"];
var battery = [0, 30];
var batteryName = ["12V 8AH Lead-Acid Battery", "12V 20AH Lead-Acid Battery"];
var shipping = [0, 125, 375, 550];
var shippingName = ["Local Pickup - Springfield, MO", "UPS Ground", "UPS 3 Day Select®", "UPS 2nd Day Air®"];

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
      isLoading: true,
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
    this.isLoading();
    OrderStore.getOne({
      id: this.props.params.id,
      params: "?token=" + gup('token', location.href),
      success: function (data) {
        var state = this.state;
        state.order = data;
        state.isLoading = false;
        state.error = "";
        this.setState(state);
      }.bind(this),
      error: function (error) {
        var state = this.state;
        state.isLoading = false;
        state.error = "An error occurred loading your order.";
        this.setState(state);
      }.bind(this),
    });
  },

  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function () {
    if (this.state.isLoading) {
      return (
        <div className="container-fluid" style={Style.container}>
          <div className="row">
            <div className="col-md-10 col-xs-12 col-centered">
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.error) {
      return (
        <div className="container-fluid" style={Style.container}>
          <div className="row">
            <div className="col-md-10 col-xs-12 col-centered">
              <h1 style={{color:"#da383c"}}>{this.state.error}</h1>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{borderBottom:"1px solid #ccc"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div style={{textAlign:"left"}}>
              <h2>Track Order</h2>
              {this.getStatusDetails()}
            </div>
            <div className="row" style={{padding:"15px",backgroundColor:"#eee",margin:"15px 0px",border:"1px solid #ccc"}}>
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-4">
                    <h1><span style={{color:"green"}}>✔</span></h1>
                  </div>
                  <div className="col-xs-4">
                    <h1>{this.getShippedIcon()}</h1>
                  </div>
                  <div className="col-xs-4">
                    <h1>{this.getShippedIcon()}</h1>
                  </div>
                </div>
                <div className="row hidden-lg hidden-md hidden-sm">
                  <div className="col-xs-4">
                    <h4>Placed</h4>
                  </div>
                  <div className="col-xs-4">
                    <h4>Assembled</h4>
                  </div>
                  <div className="col-xs-4">
                    <h4>Shipped</h4>
                  </div>
                </div>
                <div className="row hidden-xs">
                  <div className="col-xs-4">
                    <h3 style={{marginTop:"0px"}}>Placed</h3>
                  </div>
                  <div className="col-xs-4">
                    <h3 style={{marginTop:"0px"}}>Assembled</h3>
                  </div>
                  <div className="col-xs-4">
                    <h3 style={{marginTop:"0px"}}>Shipped</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-4">
                    <div>{this.getCreatedOnString("MMM D")}</div>
                  </div>
                  <div className="col-xs-4">
                    <div>{this.getAssembledOnString("MMM D")}</div>
                  </div>
                  <div className="col-xs-4">
                    <div>{this.getShippedOnString("MMM D")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
        <div className="row">
          <div className="col-md-10 col-xs-12 col-centered">
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
                  {this.getProductConfig()}
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
          <div className="col-md-10 col-xs-12 col-centered"
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
            </div>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
      </div>
    );
  },

  isLoading: function () {
    var state = this.state;
    state.isLoading = true;
    this.setState(state);
  },

  isNotLoading: function () {
    var state = this.state;
    state.isLoading = false;
    this.setState(state);
  },

  getLast4: function () {
    if (this.state.order.card) {
      return this.state.order.card.last4;
    }
  },

  getAssebmledIcon: function () {
    if (this.state.order.assembledOn) {
      return (<span style={{color:"green"}}>✔</span>);
    } else {
      return (<span>⏳</span>)
    }
  },

  getShippedIcon: function () {
    if (this.state.order.shippedOn) {
      return (<span style={{color:"green"}}>✔</span>);
    } else {
      return (<span>⏳</span>)
    }
  },

  getStatusDetails: function () {
    var status = ""; // placed, assembling, assembled, shipped
    if (this.state.order.status) {
      status = this.state.order.status.toUpperCase();
    }

    if (status != "SHIPPED") {
      var expected = "";
      if (this.state.order.expectedShipmentDate) {
        expected = moment(this.state.order.expectedShipmentDate).format("MMM D");
      }
      return (
        <div>
          <div>Status: {status}</div>
          <div>Expected Shipment Date: {expected}</div>
        </div>
      )
    } else if (status == "SHIPPED") {
      var tracking = "1Z30Y8241367880737";
      var trackingUrl = "https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=" + tracking;
      return (
        <div>
          <div>Status: {status}</div>
          <div>Carrier: UPS</div>
          <div>Tracking #: <a href={trackingUrl} target="_blank">tracking</a></div>
        </div>
      )
    }
  },

  getBillingDetails: function () {
    return (
      <div style={{lineHeight:"150%"}}>
        <div>{this.state.order.billing.firstName + " " + this.state.order.billing.lastName}</div>
        <div>{this.state.order.billing.address1}</div>
        <div>{this.state.order.billing.address2}</div>
        <div>{this.state.order.billing.city + ", " + this.state.order.billing.state + " " + this.state.order.billing.zip}</div>
      </div>
    )
  },

  getCreatedOnString: function (format) {
    if (this.state.order && this.state.order.createdOn) {
      return moment(this.state.order.createdOn).format(format);
    }
  },

  getAssembledOnString: function (format) {
    if (this.state.order && this.state.order.assembledOn) {
      return moment(this.state.order.assembledOn).format(format);
    } else {
      return "---";
    }
  },

  getShippedOnString: function (format) {
    if (this.state.order && this.state.order.shippedOn) {
      return moment(this.state.order.shippedOn).format(format);
    } else {
      return "---";
    }
  },

  getStatus: function () {
    if (this.state.order && this.state.order.status) {
      return this.state.order.status.toUpperCase();
    } else {
      return "---";
    }
  },

  getProductConfig: function () {
    if (!this.state.order.products) { return; }
    return this.state.order.products.map(function (product, i) {
      if (!product.config) { return; }
      return product.config.map(function (config, j) {
        if (config.name == "computer") {
          if (computer[config.value] == 0) {
            return (<div>{computerName[config.value]}</div>)
          } else {
            return (<div><b>{computerName[config.value] + " (+$" + computer[config.value] + ")"}</b></div>)
          }
        } else if (config.name == "linearActuator") {
          if (linearActuator[config.value] == 0) {
            return (<div>{linearActuatorName[config.value]}</div>)
          } else {
            return (<div><b>{linearActuatorName[config.value] + " (+$" + linearActuator[config.value] + ")"}</b></div>)
          }
        } else if (config.name == "battery") {
          if (battery[config.value] == 0) {
            return (<div>{batteryName[config.value]}</div>)
          } else {
            return (<div><b>{batteryName[config.value] + " (+$" + battery[config.value] + ")"}</b></div>)
          }
        } else if (config.name == "shipping") {
          if (shipping[config.value] == 0) {
            return (<div>{shippingName[config.value]}</div>)
          } else {
            return (<div><b>{shippingName[config.value] + " (+$" + shipping[config.value] + ")"}</b></div>)
          }
        }
      });
    });
  },

  getSubtotalString: function () {
    if (!this.state.order || !this.state.order.subtotal) {
      return "$0.00";
    }

    return "$" + this.state.order.subtotal
      .toFixed(2)
      .toLocaleString('en-US', { minimumFractionDigits: 2 });
  },

  getTaxString: function () {
    if (!this.state.order || !this.state.order.tax) {
      return "$0.00";
    }

    return "$" + this.state.order.tax
      .toFixed(2)
      .toLocaleString('en-US', { minimumFractionDigits: 2 });
  },

  getTotalString: function () {
    if (!this.state.order || !this.state.order.total) {
      return "$0.00";
    }

    return "$" + this.state.order.total
      .toFixed(2)
      .toLocaleString('en-US', { minimumFractionDigits: 2 });
  },
});

module.exports = Component;
