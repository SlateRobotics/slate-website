var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Link = require('react-router').Link;
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var GetProductConfigItemName = require('../Products/GetProductConfigItemName.js');
var UserStore = require('../../stores').user;
var OrderStore = require('../../stores').order;

var Component = React.createClass({
  getInitialState: function () {
    return {
      user: '',
      orders: [],
      search: '',
      sort: 'Descending By Date',
    }
  },

  componentWillMount: function () {
    UserStore.getMe(function (me) {
      var state = this.state;
      state.user = me;
      this.setState(state);
    }.bind(this));

		OrderStore.get({
      refresh: true,
      success: function (data) {
  			var state = this.state;
  			state.orders = data;
  			this.setState(state);
      }.bind(this),
    });
  },

  componentDidMount: function () {
    document.title = "Admin - Orders - Slate Robotics";
    window.scrollTo(0,0);
    this.handleChange_OrderStore();
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Orders</h1>
            <div>{this.state.orders.length + " total orders"}</div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-8 col-xs-12">
                <Form.Input
                  attribute="search"
                  placeholder="Search for an order..."
                  value={this.state.search}
                  onChange={this.handleChange_Field} />
              </div>
              <div className="hidden-lg hidden-md col-xs-12" style={{marginTop:"10px"}} />
              <div className="col-md-4 col-xs-12">
                <Form.Select
                  attribute="sort"
                  options={["Ascending By Date","Descending By Date"]}
                  value={this.state.sort}
                  onChange={this.handleChange_Field} />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            {this.getOrders()}
          </div>
        </div>
      </div>
    );
  },

  getOrders: function () {
    var sort = {};
    sort["Ascending By Date"] = function(a,b){return new Date(a.createdOn) - new Date(b.createdOn)};
    sort["Descending By Date"] = function(a,b){return new Date(b.createdOn) - new Date(a.createdOn)};

    var orders = this.state.orders;
    if (this.state.search) {
      var search = this.state.search.toLowerCase();
      orders = orders.filter(function (order) {
        if (!order.user) order.user = {};
        if (!order.shipping) order.shipping = {};
        if (!order.shipping.firstName) order.shipping.firstName = "";
        if (!order.shipping.lastName) order.shipping.lastName = "";
        var firstName = order.shipping.firstName.toLowerCase().includes(search);
        var lastName = order.shipping.lastName.toLowerCase().includes(search);
        return firstName || lastName;
      }.bind(this));
    }

    return orders.sort(sort[this.state.sort]).map(function (order, i) {
        if (!order.user) order.user = {};
        if (!order.billing) order.billing = {};
        if (!order.card) order.card = {};

        var number = 1;
        orders.map(function (r, j) {
            if (new Date(r.createdOn) < new Date(order.createdOn)) {
              number += 1;
            }
        });

        function getBeganBuildOnString () {
          if (order.beganBuildOn) {
            return new Date(order.beganBuildOn).toLocaleString();
          } else {
            return "-";
          }
        }

        function getShippedOnString () {
          if (order.shippedOn) {
            return new Date(order.shippedOn).toLocaleString();
          } else {
            return "-";
          }
        }

        function getExpectedShipmentString () {
          if (order.expectedShipmentDate) {
            return new Date(order.expectedShipmentDate).toLocaleString();
          } else {
            return "-";
          }
        }

        function getProductConfigDetails () {
          if (!order.products) return;
          var text = "";
          order.products.map(function (product, i) {
            if (!product.config) return;
            product.config.map(function (config, j) {
              if (j == 0) text = GetProductConfigItemName(product.productId, config.name, config.value);
              else text = text + ", " + GetProductConfigItemName(product.productId, config.name, config.value);
            }.bind(this));
          }.bind(this));

          return text;
        }

        return (
          <div className="row" key={"order-" + i} style={{fontSize:"12px", textAlign:"left", paddingBottom:"15px", marginBottom:"15px", borderBottom:"1px solid #ccc"}}>
            <div className="col-xs-12" style={{marginBottom:"15px"}}>
              <h4 style={{display:"inline"}}>
                {"#" + number + " "}
                {order.shipping.firstName + " " + order.shipping.lastName}
              </h4>
              <span> | </span>
              <Link to={"/order/" + order._id + "?token=" + order.token} style={Style.link}>view</Link>
              <span> | </span>
              <Link to={"/admin/orders/" + order._id + "?token=" + order.token} style={Style.link}>edit</Link>
            </div>
            <div className="col-xs-12" style={{marginBottom:"5px"}}>
              {"TR1: " + getProductConfigDetails()}
            </div>
            <div className="col-md-4 col-xs-12">
              <div>{"Order Date: " + new Date(order.createdOn).toLocaleString()}</div>
            </div>
            <div className="col-md-4 col-xs-12">
              <div>{"Began Build On: " + getBeganBuildOnString()}</div>
            </div>
            <div className="col-md-4 col-xs-12">
              <div>{"Shipped On: " + getShippedOnString()}</div>
            </div>
            <div className="col-xs-12" style={{marginTop:"5px"}}></div>
            <div className="col-md-4 col-xs-12">
              <div>{"Order Status: " + order.status}</div>
              <div>{"Expected Shipment Date: " + getExpectedShipmentString()}</div>
            </div>
            <div className="col-md-4 col-xs-12">
              <div>{"Order Amount: $" + order.total}</div>
              <div>{"Card Number: **** **** **** " + order.card.last4}</div>
            </div>
            <div className="col-md-4 col-xs-12">
              <div>{"Email: " + order.user.email}</div>
              <div>{"Phone: " + order.user.phone}</div>
            </div>
            <div className="col-xs-12" style={{marginTop:"5px"}}></div>
            <div className="col-md-4 col-xs-12">
              <div>{"Tracking Number: " + order.shipping.trackingNumber}</div>
              <div>{"Tracking Url: " + order.shipping.trackingUrl}</div>
            </div>
            <div className="col-md-4 col-xs-12">
              <div>{order.shipping.address1 + " " + order.shipping.address2}</div>
              <div>{order.shipping.city + ", " + order.shipping.state + " " + order.shipping.zip}</div>
            </div>
          </div>
        )
      });
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
  },

	handleChange_UserStore: function () {
		var users = UserStore.find();
		if (users.length > 0) {
			var state = this.state;
			state.user = users[0];
			this.setState(state);
		}
	},

	handleChange_OrderStore: function () {
		OrderStore.get({
      success: function (data) {
  			var state = this.state;
  			state.orders = data;
  			this.setState(state);
      }.bind(this),
    });
	},
});

module.exports = Component;
