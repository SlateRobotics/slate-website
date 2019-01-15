var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var Products = require('../Products/Products.js');
var ProductUtilities = require('../Products/Utilities.js');
var CartStore = require('../../stores').cart;
var $ = require('jquery');

var Component = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false,
      error: '',
      cart: {
        shipping: {},
        billing: {},
        payment: {},
        items: []
      }
    }
  },

  componentWillMount: function () {
    CartStore.get(function (docs) {
      if (!docs || docs.length <= 0) {
        return BrowserHistory.push("/shop");
      }
      var state = this.state;
      state.cart.shipping = CartStore.getShipping();
      state.cart.billing = CartStore.getBilling();
      state.cart.payment = CartStore.getPayment();
      state.cart.items = docs;
      this.setState(state);
    }.bind(this));
  },

  componentDidMount: function () {
    document.title = "Checkout Review - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-10 col-xs-12 col-centered">
            <h1>Order Review</h1>
            <div style={{color:"#da383c"}}>
              Your order has not yet been placed. Please review
              the details below and click "Place Order".
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
                  <div>{this.state.cart.shipping.firstName + " " + this.state.cart.shipping.lastName}</div>
                  <div>{this.state.cart.shipping.address1}</div>
                  <div>{this.state.cart.shipping.address2}</div>
                  <div>{this.state.cart.shipping.city + ", " + this.state.cart.shipping.state + " " + this.state.cart.shipping.zip}</div>
                </div>
              </div>
                <div className="col-md-6 col-xs-12" style={{textAlign:"left",paddingBottom:"15px"}}>
                  <h2 style={{marginTop:"0px"}}>Billing Details</h2>
                  {this.getBillingDetails()}
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
          <div className="col-md-10 col-xs-12 col-centered" style={{borderTop:"1px solid #ccc", paddingTop:"15px"}} >
            <div className="row">
              <div className="col-xs-12" style={{textAlign:"left",paddingBottom:"15px"}}>
                <h2 style={{marginTop:"0px"}}>Your Order</h2>
                <div className="row" style={{borderBottom:"1px solid #ccc",marginBottom:"10px"}}>
                  <div className={"col-xs-2"} style={{textAlign:"center"}}>
                    <h4>Quantity</h4>
                  </div>
                  <div className={"col-xs-7"}>
                    <h4>Name</h4>
                  </div>
                  <div className={"col-xs-3"}>
                    <h4>Total</h4>
                  </div>
                </div>
                {this.getCartItems()}
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
              {/*<div className="row">
                <div className="col-xs-12" style={{paddingBottom:"15px",fontStyle:"italic",fontSize:"14px"}}>
                  Estimated Shipment Date: {this.getExpectedShipDate()}
                </div>
              </div>*/}
              {this.getButtons()}
            </div>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
      </div>
    );
  },

  handleClick_Edit: function () {
    BrowserHistory.push("/shop/checkout");
  },

  handleClick_Place: function () {
    var state = this.state;
    state.isLoading = true;
    state.error = '';
    this.setState(state);

    var cart = this.state.cart;
    $.ajax({
      type: "POST",
      url: "/placeOrder",
      data: cart,
      success: function (result) {
        if (result.success == true) {
          CartStore.clear();
          BrowserHistory.push("/shop/checkout/success");
        } else {
          var state = this.state;
          state.isLoading = false;
          state.error = result.message;
          this.setState(state);
        }
      }.bind(this),
      error: function (xhr, ajaxOptions, thrownError) {
        var state = this.state;
        state.isLoading = false;
        state.error = "An ajax error occured: " + thrownError;
        this.setState(state);
      }.bind(this),
      dataType: "json"
    });
  },

  getLast4: function () {
    if (this.state.cart.payment.token) {
      if (this.state.cart.payment.token.card) {
        return this.state.cart.payment.token.card.last4;
      }
    }
  },

  getBillingDetails: function () {
    if (this.state.cart.billing.isSame == true) {
      return (
        <div style={{lineHeight:"150%"}}>
          <div>{this.state.cart.shipping.firstName + " " + this.state.cart.shipping.lastName}</div>
          <div>{this.state.cart.shipping.address1}</div>
          <div>{this.state.cart.shipping.address2}</div>
          <div>{this.state.cart.shipping.city + ", " + this.state.cart.shipping.state + " " + this.state.cart.shipping.zip}</div>
        </div>
      )
    } else {
      return (
        <div style={{lineHeight:"150%"}}>
          <div>{this.state.cart.billing.firstName + " " + this.state.cart.billing.lastName}</div>
          <div>{this.state.cart.billing.address1}</div>
          <div>{this.state.cart.billing.address2}</div>
          <div>{this.state.cart.billing.city + ", " + this.state.cart.billing.state + " " + this.state.cart.billing.zip}</div>
        </div>
      )
    }
  },

  getExpectedShipDate: function () {
    var beginDate = new Date();
    beginDate.setDate(beginDate.getDate() + (7*8));
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + (7*12));
    return beginDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
  },

  getCartItems: function () {
    return this.state.cart.items.map(function (cartItem, i) {
      var total = cartItem.quantity * ProductUtilities.CalculateTotal(cartItem.product, cartItem.config);
      return (
        <div key={i} className="row">
          <div className={"col-xs-2"} style={{textAlign:"center"}}>
            <h4>{cartItem.quantity}</h4>
          </div>
          <div className={"col-xs-7"}>
            <h4>{cartItem.product.name + " - " + this.getConfigString(cartItem)}</h4>
          </div>
          <div className={"col-xs-3"}>
            <h4>{"$" + total.toLocaleString()}</h4>
          </div>
        </div>
      )
    }.bind(this));
  },

  getConfigString: function (item) {
    var result = "";

    item.config.map(function (cartConfig, i) {
      item.product.config.map(function (productConfig) {
        if (productConfig.name == cartConfig.name) {
          productConfig.items.map(function (configItem) {
            if (configItem.id == cartConfig.value) {
              result += configItem.label;
              if (i + 1 < item.config.length) {
                result += ", ";
              }
              return;
            }
          });
        }
      });
    });

    return result;
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

  getDiscountConfig: function () {
    if (this.state.order.discount && this.state.order.reservationToken) {
      return (
        <div style={{marginTop:"25px",color:"green"}}><b>{"Reservation discount (-$" + this.state.order.discount.toLocaleString() + ")"}</b></div>
      )
    } else if (this.state.discount) {
      return (
        <div style={{marginTop:"25px",color:"green"}}><b>{"Discount (-$" + this.state.order.discount.toLocaleString() + ")"}</b></div>
      )
    }
  },

  getSubtotalString: function () {
    var subtotal = this.calculateSubtotal();
    return "$" + subtotal.toFixed(2).toLocaleString('en-US', { minimumFractionDigits: 2 });
  },

  calculateSubtotal: function () {
    var subtotal = 0;
    this.state.cart.items.map(function (cartItem, i) {
      subtotal += cartItem.quantity * ProductUtilities.CalculateTotal(cartItem.product, cartItem.config);
    });
    return subtotal;
  },

  calculateTaxes: function () {
    var mo = ["MO","MISSOURI"];
    var moSalesTax = 0.04225;
    var greeneCountySalesTax = 0.01250;
    var springfieldSalesTax = 0.02125;
    var salesTax = moSalesTax + greeneCountySalesTax + springfieldSalesTax;

    if (this.state.cart.shipping.state) {
      if (mo.indexOf(this.state.cart.shipping.state.toUpperCase()) > -1) {
        return (this.calculateSubtotal() * salesTax);
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
    var total = this.calculateSubtotal();
    total += this.calculateTaxes();
    return "$" + total.toFixed(2).toLocaleString('en-US', { minimumFractionDigits: 2 });
  },

  getBasePrice: function () {
    var basePrice = this.state.product.basePrice;
    return "$" + basePrice.toLocaleString();
  },

  getProductConfigDetails: function (orderConfig) {
    for (var i = 0; i < this.state.product.config.length; i++) {
      var productConfig = this.state.product.config[i];
      if (orderConfig.name == productConfig.name) {
        return productConfig;
      }
    }
  },

  getProductConfig: function () {
    if (!this.state.order.config) { return; }
    return this.state.order.config.map(function (config, j) {
      var productConfig = this.getProductConfigDetails(config);
      if (productConfig) {
        var selectedConfig;
        for (var k = 0; k < productConfig.items.length; k++) {
          var item = productConfig.items[k];
          if (item.id == config.value) {
            selectedConfig = item;
          }
        }
        if (selectedConfig) {
          if (selectedConfig.price == 0) {
            return (<div key={config.name + "-" + j}>{selectedConfig.label}</div>)
          } else {
            return (<div key={config.name + "-" + j}><b>{selectedConfig.label + " (+$" + selectedConfig.price.toLocaleString() + ")"}</b></div>)
          }
        }
      }
    }.bind(this));
  },
});

module.exports = Component;
