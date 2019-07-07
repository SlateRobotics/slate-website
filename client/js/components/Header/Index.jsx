var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');
var Menu = require('./Menu.jsx');
var MenuNavButton = require('./MenuNavButton.jsx');
var SubMenu = require('./SubMenu.jsx');
var CartStore = require('../../stores').cart;

var Header = React.createClass({
  getInitialState: function () {
    return {
      state: {
        cartItems: [],
      },
    }
  },

  componentWillMount: function () {
    CartStore.get(function (docs) {
      var state = this.state;
      state.cartItems = docs;
      this.setState(state);
    }.bind(this));

		CartStore.addChangeListener(this.handleChange_CartStore);
  },

  componentWillUnmount: function () {
    CartStore.removeChangeListener(this.handleChange_CartStore);
  },

  handleChange_CartStore: function () {
    CartStore.get(function (docs) {
      this.setState({
        cartItems: docs
      });
    }.bind(this));
  },

	render: function () {
		return (
			<div className="container-fluid" style={Style.headerContainer}>
				<div className="row hidden-xs" style={Style.navigation}>
					<div className="col-lg-10 col-xs-12 col-centered">
						<Link to="/" style={{
								height:"44px",
								display:"inline-block",
								float:"left",
							}}>
							<img
								style={Style.logo}
								src="/img/logo-icon"
								onClick={this.handleClick_Logo} />
						</Link>
						<div style={{
								float:"left",
								paddingLeft:"10px",
								display:"inline-block",
								lineHeight:"44px",
							}}>
							<Link to="/" style={Style.title}>
								Slate Robotics
							</Link>
						</div>
						<div style={Style.menuContainer}>
							<Menu />
						</div>
					</div>
				</div>
				<div className="row hidden-lg hidden-md hidden-sm" style={Style.navigationMobile}>
					<div className="col-xs-12 col-centered">
						<Link to="/" style={{
								height:"44px",
								display:"inline-block",
								float:"left",
							}}>
							<img
								style={Style.logo}
								src="/img/logo-icon"
								onClick={this.handleClick_Logo} />
						</Link>
						<div style={{
								float:"left",
								paddingLeft:"10px",
								display:"inline-block",
								lineHeight:"44px",
							}}>
							<Link to="/" style={Style.titleMobile}>
								<span>
									Slate Robotics
								</span>
							</Link>
						</div>
						<div style={{
						    height:"44px",
								position:"absolute",
								top:"0",
								right:"0",
							}}>
							<MenuNavButton />
						</div>
					</div>
				</div>
				<SubMenu />
				{this.getCartHeader()}
			</div>
		);
	},

	displayCartHeader: function () {
		var hide = false;
		var routes = ["/shop/cart","/shop/checkout"];
		for (var i = 0; i < routes.length; i++) {
			if (window.location.pathname.includes(routes[i])) {
				hide = true;
			}
		}
    return (hide == false && this.state.cartItems.length > 0);
	},

  getCartHeader: function () {
    if (this.displayCartHeader()) {
			var count = 0;
			for (var i = 0; i < this.state.cartItems.length; i++) {
				count += Number(this.state.cartItems[i].quantity);
			}
			var itemsPlural = "item";
			if (count > 1) itemsPlural = "items";
      return (
				<div className="row" style={{zIndex:"9",position:"fixed",width:"100%"}}>
	        <div className="col-xs-12 col-centered" style={{textAlign:"center",paddingTop:"5px",paddingBottom:"5px",backgroundColor:"white",borderBottom:"1px solid #ccc"}}>
	          <span>🛒 You have {count} {itemsPlural} in your cart. </span>
	          <Link to="/shop/cart">View it now.</Link>
						<span> 🛒</span>
	        </div>
				</div>
      )
    }
  },
});

module.exports = Header;
