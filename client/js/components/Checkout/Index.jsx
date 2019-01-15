var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;

var Style = require('./Style.jsx');
var Billing = require('./Billing.jsx');
var Shipping = require('./Shipping.jsx');
var Payment = require('./Payment.jsx');
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ProductUtilities = require('../Products/Utilities.js');
var CartStore = require('../../stores').cart;

var pages = [Shipping, Billing, Payment];
var pagesNames = ["Shipping", "Billing", "Payment"];

var cardStyle = {
  base: {
    fontSize: '16px',
    lineHeight: '24px'
  }
};

var Component = React.createClass({
  getInitialState: function () {
    return {
      card: '',
      total: 0,
      page: 0,
      isLoading: false,
      errors: [],
    }
  },

  componentWillMount: function () {
    var state = this.state;
    state.card = elements.create('card', {style: cardStyle});
    this.setState(state);

    CartStore.get(function (docs) {
      if (!docs || docs.length <= 0) {
        return BrowserHistory.push("/shop");
      }

      state.total = 0;
      docs.map(function (item) {
        state.total += item.quantity * ProductUtilities.CalculateTotal(item.product, item.config);
      });
      this.setState(state);
    }.bind(this));
  },

  componentDidMount: function () {
    document.title = "Checkout - Slate Robotics";
    window.scrollTo(0,0);
  },

  componentWillUnmount: function () {
    this.state.card.unmount("#card-element");
    this.state.card.clear();
    this.state.card.destroy();
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
            <h1>Checkout</h1>
            <div>Your Subtotal: {this.getTotalString()}</div>
          </div>
        </div>
        <div className="row  hidden-xs" style={{marginTop:"25px"}}>
          <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
            <div className="row">
              {this.getOverview()}
            </div>
          </div>
        </div>
        {this.getErrors()}
        <div style={{marginTop:"25px"}} />
        {this.getPage()}
        <div style={{marginTop:"25px"}} />
        <div className="row" style={{textAlign:"right"}}>
          <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
            {this.getNavigationButtons()}
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
      </div>
    );
  },

  getOverview: function () {
    var style = {
      height:"40px",
      lineHeight:"40px",
      border:"1px solid #ccc",
      backgroundColor:"#fff",
    };

    var styleSelected = {
      height:"40px",
      lineHeight:"40px",
      border:"1px solid #45415E",
      backgroundColor:"#f9f9f9",
    };

    return pagesNames.map(function (item, i) {
      if (i == this.state.page) {
        return (
          <div key={"overview-"+i} className="col-sm-4" style={styleSelected}>
            {i + ". " + item}
          </div>
        )
      }

      return (
        <div key={"overview-"+i} className="col-sm-4" style={style}>
          {i + ". " + item}
        </div>
      )
    }.bind(this));
  },

  getPage: function () {
    var page = pages[this.state.page];
    return React.createElement(page, {next: this.handleClick_Next, card: this.state.card});
  },

  getErrorsMapped: function () {
    return this.state.errors.map(function (error, i) {
      return (
        <div key={"error-"+i}>{error}</div>
      )
    }.bind(this));
  },

  getErrors: function () {
    if (this.state.errors && this.state.errors.length > 0) {
      return (
        <div className="row" style={{color:"#da383c",paddingTop:"25px"}}>
          <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
            {this.getErrorsMapped()}
          </div>
        </div>
      )
    }
  },

  getNavigationButtons: function () {
    if (this.state.isLoading == true) {
      return (
        <div>
          Processing...
        </div>
      )
    }

    if (this.state.page == 0) {
      return (
        <div>
          <ButtonSecondary
            label="Edit"
            onClick={this.handleClick_Edit} />
          <span style={{marginLeft:"15px"}} />
          <ButtonPrimary
            label="Next"
            onClick={this.handleClick_Next} />
        </div>
      )
    } else if (this.state.page == pages.length - 1) {
      return (
        <div>
          <ButtonSecondary
            label="Back"
            onClick={this.handleClick_Back} />
          <span style={{marginLeft:"15px"}} />
          <ButtonPrimary
            label="Review Order"
            onClick={this.handleClick_Review} />
        </div>
      )
    }
    return (
      <div>
        <ButtonSecondary
          label="Back"
          onClick={this.handleClick_Back} />
        <span style={{marginLeft:"15px"}} />
        <ButtonPrimary
          label="Next"
          onClick={this.handleClick_Next} />
      </div>
    )
  },

  handleClick_Back: function () {
    var state = this.state;
    state.page--;
    state.errors = [];
    this.setState(state);
  },

  handleClick_Next: function () {
    this.validateData(false, function (errors) {
      if (!errors || errors.length == 0) {
        var state = this.state;
        state.page++;
        state.errors = errors;
        this.setState(state);
      } else {
        var state = this.state;
        state.errors = errors;
        this.setState(state);
      }
    }.bind(this));
  },

  handleClick_Edit: function () {
    BrowserHistory.push("/shop/cart");
  },

  handleClick_Review: function () {
    var state = this.state;
    state.isLoading = true;
    this.setState(state);

    this.validateData(false, function (errors) {
      if (!errors || errors.length == 0) {
        var payment = {};
        stripe.createToken(this.state.card).then(function(result) {
          if (result.error) {
            var state = this.state;
            state.isLoading = false;
            state.errors = [result.error.message];
            this.setState(state);
          } else {
            payment = {token: result.token};
            CartStore.setPayment(payment);
            BrowserHistory.push("/shop/checkout/review");
          }
        }.bind(this)).catch(function (error) {
          var state = this.state;
          state.isLoading = false;
          state.errors = [error];
          this.setState(state);
        }.bind(this));
      } else {
        var state = this.state;
        state.errors = errors;
        state.isLoading = false;
        this.setState(state);
      }
    }.bind(this));
  },

  validateData: function (validateAllData, callback) {
    var shipping = CartStore.getShipping();
    var billing = CartStore.getBilling();

    errors = [];
    if (this.state.page == 0 || validateAllData == true) {
      if (!shipping) {
        errors.push("You must enter your shipping information to continue");
      } else {
        if (!shipping.firstName) errors.push("Shipping: First Name field left blank");
        if (!shipping.lastName) errors.push("Shipping: Last Name field left blank");
        if (!shipping.email) errors.push("Shipping: Email field left blank");
        if (!shipping.phone) errors.push("Shipping: Phone field left blank");
        if (!shipping.address1) errors.push("Shipping: Address Line 1 field left blank");
        if (!shipping.city) errors.push("Shipping: City field left blank");
        if (!shipping.state) errors.push("Shipping: State field left blank");
        if (!shipping.zip) errors.push("Shipping: Zip/Postal Code field left blank");
      }
    }

    if (this.state.page == 1 || validateAllData == true) {
      if (billing.isSame == false) {
        if (!billing) {
          errors.push("You must enter your billing information to continue");
        } else {
          if (!billing.firstName) errors.push("Billing: First Name field left blank");
          if (!billing.lastName) errors.push("Billing: Last Name field left blank");
          if (!billing.address1) errors.push("Billing: Address Line 1 field left blank");
          if (!billing.city) errors.push("Billing: City field left blank");
          if (!billing.state) errors.push("Billing: State field left blank");
          if (!billing.zip) errors.push("Billing: Zip/Postal Code field left blank");
        }
      }
    }

    callback(errors);
  },

  getTotalString: function () {
    var total = 0;
    if (this.state.total) {
      total = this.state.total;
    }
    return "$" + total.toLocaleString('en-US', { minimumFractionDigits: 2 });
  },
});

module.exports = Component;
