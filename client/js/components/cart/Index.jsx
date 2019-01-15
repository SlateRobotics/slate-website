var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var Form = require('../Form/Index.jsx');
var Products = require('../Products/Products.js');
var ProductUtilities = require('../Products/Utilities.js');
var CartStore = require('../../stores').cart;

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
      state: {
        editQuantityId: -1,
        items: [],
      },
    }
  },

  componentWillMount: function () {
    var state = this.state;
    state.editQuantityId = -1;

    CartStore.get(function (docs) {
      this.setState({
        items: docs
      });
    }.bind(this));

    CartStore.addChangeListener(this.handleChange_CartStore);

    this.setState(state);
  },

  componentDidMount: function () {
    document.title = "Cart - Slate Robotics";
    window.scrollTo(0,0);
  },

  componentWillUnmount: function () {
    CartStore.removeChangeListener(this.handleChange_CartStore);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{marginTop:"5px"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row">
              <h2 style={{marginTop:"10px",marginBottom:"10px",display:"inline-block"}}>
                Your Cart
              </h2>
            </div>
            <div className="row" style={{borderBottom:"1px solid #ccc"}}>
              <div className={"col-xs-2"}>
                <h4>Remove?</h4>
              </div>
              <div className={"col-xs-2"}>
                <h4>Quantity</h4>
              </div>
              <div className={"col-xs-5"}>
                <h4>Name</h4>
              </div>
              <div className={"col-xs-3"}>
                <h4>Total</h4>
              </div>
            </div>
            {this.getItems()}
            <div className="row" style={{marginBottom:"15px"}}>
              <div className={"col-xs-2"}>
              </div>
              <div className="col-xs-2">
              </div>
              <div className="col-xs-5">
              </div>
              <div className="col-xs-3">
                <h4><b>{this.getTotalString()}</b></h4>
              </div>
            </div>
            <div className="row" style={{marginBottom:"15px"}}>
              <div className={"col-xs-2"}>
              </div>
              <div className="col-xs-2">
              </div>
              <div className="col-xs-5">
              </div>
              <div className="col-xs-3">
                {this.getCheckoutButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  getItems: function () {
    return this.state.items.map(function (item, i) {
      var total = "$" + (ProductUtilities.CalculateTotal(item.product, item.config) * item.quantity).toLocaleString();

      function handleRemove () {
        CartStore.delete(item);
      }

      function handleClick_EnableQuantity () {
        var state = this.state;
        state.editQuantityId = item.id;
        this.setState(state);
      }

      function handleQuantityChange (attribute, value) {
        if (value < 1) value = 1;
        item.quantity = value;
        CartStore.update(item);
      }

      var quantityComponent;
      if (this.state.editQuantityId == item.id) {
        quantityComponent = (
          <Form.Input
            attribute="attribute"
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange} />
        )
      } else {
        quantityComponent = (
          <h4 style={{cursor:"pointer"}} onClick={handleClick_EnableQuantity.bind(this)}>
            {item.quantity}
          </h4>
        )
      }

      return (
        <div key={i} style={{borderBottom:"1px solid #ccc"}}>
          <div className="row">
            <div className={"col-xs-2"}>
              <h4 style={{color:"red",cursor:"pointer"}} onClick={handleRemove.bind(this)}>
                x
              </h4>
            </div>
            <div className="col-xs-2">
              {quantityComponent}
            </div>
            <div className="col-xs-5">
              <h4>{item.product.name}</h4>
            </div>
            <div className="col-xs-3">
              <h4>{total}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">
            </div>
            <div className="col-xs-5" style={{fontStyle:"italic"}}>
              {this.getConfigString(item)}
            </div>
            <div className="col-xs-3">
            </div>
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

  handleChange_CartStore: function () {
    CartStore.get(function (docs) {
      this.setState({
        items: docs
      });
    }.bind(this));
  },

  handleClick_Checkout: function () {
    BrowserHistory.push("/shop/checkout");
  },

  getCheckoutButton: function () {
    return (
      <ButtonPrimary
        label={"Checkout"}
        onClick={this.handleClick_Checkout} />
    )
  },

  getTotalString: function () {
    var total = 0;
    for (var i = 0; i < this.state.items.length; i++) {
      var item = this.state.items[i];
      total += ProductUtilities.CalculateTotal(item.product, item.config) * item.quantity;
    }
    return "$" + total.toLocaleString();
  }
});

module.exports = Component;
