var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
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
      state: {
        products: [],
        cartItems: [],
      },
    }
  },

  componentWillMount: function () {
    var state = this.state;
    this.state.products = Products;
    this.setState(state);

    CartStore.get(function (docs) {
      var state = this.state;
      state.cartItems = docs;
      this.setState(state);
    }.bind(this));
  },

  componentDidMount: function () {
    document.title = "Shop - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{marginTop:"5px"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row">
              <h3 style={{paddingTop:"15px"}}>Shop</h3>
              {this.getProducts()}
            </div>
          </div>
        </div>
      </div>
    );
  },

  getProducts: function () {
    return this.state.products.map(function (product, i) {
      if (product.discontinued) return;

      function handleClick () {
        BrowserHistory.push("/shop/" + product.id);
      }

      return (
        <div key={product.id} className="col-lg-4 col-sm-6 col-xs-12">
          <div style={{height:"300px",cursor:"pointer"}} onClick={handleClick}>
            <img src={product.imgs[0]} style={{maxHeight:"300px",maxWidth:"100%"}} />
          </div>
          <h4>
            <Link to={"/shop/"+product.id}>{product.name}</Link>
          </h4>
          <p>{"Starting at $" + product.basePrice.toLocaleString()}</p>
        </div>
      )
    });
  }
});

module.exports = Component;
