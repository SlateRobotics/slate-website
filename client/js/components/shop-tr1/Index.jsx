var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ConfigItem = require('./ConfigItem.jsx');
var Products = require('../Products/Products.js');
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
      product: Products[0],
      discount: 0,
      order: {
        config: [{
          name: "arm",
          value: 1
        }, {
          name: "computer",
          value: 0,
        }, {
          name: "linearActuator",
          value: 0,
        }, {
          name: "battery",
          value: 0,
        }, {
          name: "shipping",
          value: 1,
        }]
      }
    }
  },

  componentWillMount: function () {
    CartStore.getOne(0, function (doc) {
      if (!doc) {
        CartStore.insert({
          id: 0,
          config: this.state.config,
        });
      } else {
        this.setState(doc.config);
      }
    }.bind(this));

    var reservationToken = gup('reservationToken', location.href);
    if (reservationToken) {
      var state = this.state;
      state.discount = 1549;
      state.reservationToken = reservationToken;
      this.setState(state);
    }

    var quoteToken = gup('quoteToken', location.href);
    if (quoteToken) {
      var state = this.state;
      state.quoteToken = quoteToken;
      this.setState(state);
    }

    if (this.state.quoteToken == "4i1bvujfym1xe3tyb9td83s1n1dp4n7y") {
      var state = this.state;
      state.order.config[4] = {name: "shipping", value: 4}
      for (var i = 0; i < state.product.config.length; i++) {
        var config = state.product.config[i];
        if (config.name == "shipping") {
          state.product.config[i].items = [config.items[2]]
        }
      }
      this.setState(state);
    } else {
      var state = this.state;
      for (var i = 0; i < state.product.config.length; i++) {
        var config = state.product.config[i];
        var items = [];
        for (var j = 0; j < config.items.length; j++) {
          var item = config.items[j];
          if (item.enabled == true) {
            items.push(item);
          }
        }
        state.product.config[i].items = items;
      }
      this.setState(state);
    }
  },

  componentDidMount: function () {
    document.title = "Buy TR1 - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div>
          <div className="row hidden-xs" style={Style.menu}>
            <div className="col-lg-10 col-xs-12 col-centered">
              <div style={{float:"left"}}>
                <span style={{lineHeight:"34px"}}>Slate TR1</span>
              </div>
              <div style={{float:"right",fontSize:"14px"}}>
                <Link to="/tr1" style={{lineHeight:"34px",color:"#222"}}>Overview</Link>
                <span style={{marginLeft:"25px"}} />
                <Link to="/tr1/specs" style={{lineHeight:"34px",color:"#222"}}>Specs</Link>
              </div>
            </div>
          </div>
          <div className="row hidden-lg hidden-md hidden-sm" style={Style.menuMobile}>
            <div className="col-xs-12">
              <div style={{float:"left"}}>
                <span style={{lineHeight:"34px"}}>TR1</span>
              </div>
              <div style={{float:"right",fontSize:"14px"}}>
                <Link to="/tr1" style={{lineHeight:"34px",color:"#222"}}>Overview</Link>
                <span style={{marginLeft:"25px"}} />
                <Link to="/tr1/specs" style={{lineHeight:"34px",color:"#222"}}>Specs</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop:"34px"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row" style={{paddingTop:"15px"}}>
              {this.getImg()}
              <div className="col-md-6 col-xs-12" style={{textAlign:"left"}}>
                <div style={{paddingBottom:"25px",borderBottom:"1px solid #ccc"}}>
                  <h1 style={{marginTop:"0px"}}>TR1.config</h1>
                  <div style={{lineHeight:"150%"}}>
                    <div style={{color:"#aaa"}}>Base Price ({this.getBasePrice()})</div>
                    {this.getProductConfig()}
                    {this.getDiscountConfig()}
                  </div>
                  <div style={{paddingTop:"15px"}}>
                    <h4>{this.getTotalString()}</h4>
                    {this.getCheckoutButton()}
                  </div>
                  <div style={{
                      paddingTop:"15px",
                      fontStyle:"italic",
                      fontSize:"14px"
                    }}>
                      <div>
                        Orders take 8 to 12 weeks to ship
                      </div>
                  </div>
                </div>
                {this.getConfigItems()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleClick_Checkout: function () {
    CartStore.getOne(0, function (doc) {
      doc.config = this.state.order.config;
      doc.total = this.getTotal();
      doc.reservationToken = this.state.reservationToken;
      doc.discount = this.state.discount;
      CartStore.update(doc);
    }.bind(this));
    BrowserHistory.push("/checkout");
  },

  getConfigItems: function () {
    return this.state.product.config.map(function (config, i) {
      var handleClick_ConfigItem = function (item) {
        var state = this.state;
        for (var j = 0; j < state.order.config.length; j++) {
          if (state.order.config[j].name == item.category) {
            state.order.config[j].value = item.index;
          }
        }
        this.setState(state);
      }.bind(this);

      var getConfigItems = function () {
        return config.items.map(function (item, j) {
          var isSelected = false;
          for (var k = 0; k < this.state.order.config.length; k++) {
            if (this.state.order.config[k].value == item.id) {
              if (this.state.order.config[k].name == config.name) {
                isSelected = true;
              }
            }
          }

          if (config.name == "arm" && this.state.reservationToken && item.id == 0) {
            return (
              <ConfigItem
                key={config.name + "-selection-" + j}
                label={item.label}
                value={item.price}
                isSelected={false}
                category={config.name}
                index={item.id}
                disabled={true}
                onClick={function(){}} />
            )
          }

          if (config.name == "arm" && this.state.reservationToken && item.id == 1) {
            return (
              <ConfigItem
                key={config.name + "-selection-" + j}
                label={"Two-armed TR1 (required by reservation)"}
                value={item.price}
                isSelected={true}
                category={config.name}
                index={item.id}
                onClick={handleClick_ConfigItem} />
            )
          }

          return (
            <ConfigItem
              key={config.name + "-selection-" + j}
              label={item.label}
              value={item.price}
              isSelected={isSelected}
              category={config.name}
              index={item.id}
              onClick={handleClick_ConfigItem} />
          )
        }.bind(this));
      }.bind(this);

      return (
        <div key={config.name} style={{paddingBottom:"25px",borderBottom:"1px solid #ccc"}}>
          <h3>{config.label}</h3>
          <div dangerouslySetInnerHTML={{__html: config.description}} />
          {getConfigItems()}
        </div>
      )
    }.bind(this));
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

  getImg: function () {
    var config;
    for (var i = 0; i < this.state.order.config.length; i++) {
      if (this.state.order.config[i].name == "arm") {
        config = this.state.order.config[i];
      }
    }
    var img = "/img/slate-tr1-9";
    if (config.value == 0) {
      img = "/img/slate-tr1-11";
    } else if (config.value == 1) {
      img = "/img/slate-tr1-9";
    }
    return (
      <div>
        <div className="col-md-6 col-sm-12 hidden-xs">
          <img src={img} style={{maxWidth:"100%"}} />
          <div className="hidden-lg hidden-md" style={{paddingBottom:"15px"}} />
        </div>
        <div className="hidden-lg hidden-md hidden-sm col-xs-12">
          <img src={img} style={{minHeight:"300px",maxHeight:"400px",maxWidth:"100%"}} />
          <div style={{paddingBottom:"15px"}} />
        </div>
      </div>
    )
  },

  getDiscountConfig: function () {
    if (this.state.discount && this.state.reservationToken) {
      return (
        <div style={{marginTop:"25px",color:"green"}}><b>{"Reservation discount (-$" + this.state.discount.toLocaleString() + ")"}</b></div>
      )
    } else if (this.state.discount) {
      return (
        <div style={{marginTop:"25px",color:"green"}}><b>{"Discount (-$" + this.state.discount.toLocaleString() + ")"}</b></div>
      )
    }
  },

  getTotal: function () {
    var total = this.state.product.basePrice;
    for (var i = 0; i < this.state.product.config.length; i++) {
      var productConfig = this.state.product.config[i];
      var orderConfig;
      for (var j = 0; j < this.state.order.config.length; j++) {
        if (this.state.order.config[j].name == productConfig.name) {
          orderConfig = this.state.order.config[j];
        }
      }
      var configItem;
      for (var j = 0; j < productConfig.items.length; j++) {
        if (productConfig.items[j].id == orderConfig.value) {
          configItem = productConfig.items[j];
        }
      }

      if (configItem) { total += configItem.price; }
    }

    if (this.state.discount > 0) {
      total = total - this.state.discount;
    }

    return total;
  },

  getTotalString: function () {
    var total = this.getTotal();
    return "$" + total.toLocaleString('en-US', { minimumFractionDigits: 2 });
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
            return (<div key={config.name + "-summary-" + j}>{selectedConfig.label}</div>)
          } else {
            return (<div key={config.name + "-summary-" + j}><b>{selectedConfig.label + " (+$" + selectedConfig.price.toLocaleString() + ")"}</b></div>)
          }
        }
      }
    }.bind(this));
  },

  getCheckoutButton: function () {
    if (this.state.order.config[4].value == 2) {
      return (
        <div>
          <div style={{color:"red"}}>
            Please contact us at +1-417-849-3612 or via the chat in the bottom-right corner for other international shipping. We must obtain a quote from our service provider. We apologize for any inconvenience!
          </div>
        </div>
      )
    } else {
      return (
        <ButtonPrimary
          label={"Checkout"}
          onClick={this.handleClick_Checkout} />
      )
    }
  },
});

module.exports = Component;
