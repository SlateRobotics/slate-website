var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var Form = require('../Form/Index.jsx');
var ConfigItem = require('./ConfigItem.jsx');
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
      product: {
        config: [],
        links: [],
        imgs: [],
      },
      quantity: 1,
      discount: 0,
      order: {
        config: []
      }
    }
  },

  componentWillMount: function () {
    var state = this.state;
    state.product = null;
    for (var i = 0; i < Products.length; i++) {
      var product = Products[i];
      if (product.id == this.props.params.id) {
        state.product = product;
      }
    }
    this.setState(state);

    var state = this.state;
    if (this.state.product) {
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
        if (!config.default) config.default = 0;
        state.order.config.push({
          name: config.name,
          value: config.default,
        })
      }

      this.setState(state);
    }
  },

  componentDidMount: function () {
    document.title = "Shop " + this.state.product.name + " - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    if (!this.state.product) {
      return (
        <div className="container-fluid" style={Style.container}>
          <div className="col-lg-10 col-xs-12 col-centered">
            <div>
              <img src="/img/404.png" />
              <h1>We can't find that product!</h1>
              <div style={{lineHeight:"34px"}}>
                The product you're looking for is either not currently available or does not exist.
              </div>
              <div style={{lineHeight:"34px"}}>
                Please return to our{" "}<Link to="/shop">shop</Link>{" "}page.
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{marginTop:"34px"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row" style={{paddingTop:"15px"}}>
              {this.getImg()}
              <div className="col-md-6 col-xs-12" style={{textAlign:"left"}}>
                <div style={{paddingBottom:"25px",borderBottom:"1px solid #ccc"}}>
                  <h1 style={{marginTop:"0px"}}>{this.state.product.id + ".config"}</h1>
                  <div style={{marginBottom:"15px"}}>
                    {this.getLinks()}
                  </div>
                  <div style={{lineHeight:"150%"}}>
                    <div style={{color:"#aaa"}}>Base Price ({this.getBasePrice()})</div>
                    {this.getProductConfig()}
                    {this.getDiscountConfig()}
                  </div>
                  <div style={{paddingTop:"15px"}}>
                    <h4>{this.getTotalString()}</h4>
                    <div style={{width:"75px",marginBottom:"15px"}}>
                      <Form.Input
                        attribute="attribute"
                        type="number"
                        value={this.state.quantity}
                        onChange={this.handleChange_Quantity} />
                    </div>
                    {this.getAddToCartButton()}
                  </div>
                  {this.getWarning()}
                </div>
                {this.getConfigItems()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleChange_Quantity: function (attribute, value) {
    if (value < 1) value = 1;
    var state = this.state;
    state.quantity = value;
    this.setState(state);
  },

  handleClick_AddToCart: function () {
    CartStore.insert({
      config: this.state.order.config,
      product: this.state.product,
      quantity: this.state.quantity,
    });
    BrowserHistory.push("/shop/cart");
  },

  getWarning: function () {
    if (!this.state.product.warning) { return; }
    return (
      <div style={{
          paddingTop:"15px",
          fontStyle:"italic",
          fontSize:"14px",
          color:"orange"
        }}>
          <div>
            {this.state.product.warning}
          </div>
      </div>
    )
  },

  getLinks: function () {
    var links = [];
    if (this.state.product.links) links = this.state.product.links;
    return links.map(function (link, i) {
      return (
        <Link key={i} to={link.url} style={{lineHeight:"34px",color:"#222",marginRight:"25px",border:"1px solid #ccc",borderRadius:"5px",padding:"5px",backgroundColor:"#f1f1f1"}}>
          {link.label}
        </Link>
      )
    });
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
    var img = this.state.product.imgs[0];
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
    return ProductUtilities.CalculateTotal(this.state.product, this.state.order.config);
  },

  getTotalString: function () {
    var total = this.getTotal();
    return "$" + total.toLocaleString('en-US', { minimumFractionDigits: 2 });
  },

  getBasePrice: function () {
    if (!this.state.product) { return; }
    var basePrice = this.state.product.basePrice;
    return "$" + basePrice.toLocaleString();
  },

  getProductConfigDetails: function (orderConfig) {
    if (!this.state.product) { return; }
    for (var i = 0; i < this.state.product.config.length; i++) {
      var productConfig = this.state.product.config[i];
      if (orderConfig.name == productConfig.name) {
        return productConfig;
      }
    }
  },

  getProductConfig: function () {
    if (!this.state.product) { return; }
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

  getAddToCartButton: function () {
    if (this.state.product.discontinued) {
      return (
        <div style={{color:"red"}}>
          <p>
            This item has been discontinued. If you are still interested in ordering one, you might be able to special order. Please check contact us for availablity and pricing.
          </p>
          <p>
            {"You can return to the store to view our other products "}
            <Link to="/shop">here</Link>.
          </p>
        </div>
      )
    }

    return (
      <ButtonPrimary
        label={"Add to cart"}
        onClick={this.handleClick_AddToCart} />
    )
  },
});

module.exports = Component;
