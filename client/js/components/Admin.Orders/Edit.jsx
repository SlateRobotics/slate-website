var React = require('react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var Products = require('../Products/Products.js');
var GetProductConfigItemName = require('../Products/GetProductConfigItemName.js');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var UserStore = require('../../stores').user;
var OrderStore = require('../../stores').order;

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
      errors: [],
      isLoading: true,
      product: Products[0],
      order: {
        shipping: {},
        billing: {},
        user: {},
        card: {},
      },
    }
  },

  componentWillMount: function () {
    UserStore.addChangeListener(this.handleChange_UserStore);
    if (this.props.params.id) {
  		OrderStore.get({
        refresh: true,
        id: this.props.params.id,
        params: "token=" + gup('token', location.href),
        error: function (error) {
          var state = this.state;
          state.errors.push({name:"load",message:error});
          state.isLoading = false;
          this.setState(state);
        }.bind(this),
        success: function (data) {
    			var state = this.state;
    			state.order = data;
          state.isLoading = false;
    			this.setState(state);
        }.bind(this),
      });
    } else {
      var state = this.state;
      state.isLoading = false;
      this.setState(state);
    }
  },

  componentDidMount: function () {
    document.title = "Edit Order - Slate Robotics";
    window.scrollTo(0,0);
  },

  componentWillUnmount: function () {
		UserStore.removeChangeListener(this.handleChange_UserStore);
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-8 col-xs-12 col-centered" style={{
              backgroundColor: "#fbfbfb",
              paddingTop: "15px",
              paddingBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "25px",
              marginBottom: "25px",
            }}>
            <h3>Edit Order</h3>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Status" isRequired />
                <Form.Select
                  attribute="status"
                  options={["Placed","Began Build","Shipped"]}
                  value={this.state.order.status}
                  onChange={this.handleChange_Field} />
                {this.getError("status")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Expected Shipment Date" isRequired />
                <Form.Input
                  attribute="expectedShipmentDate"
                  value={this.state.order.expectedShipmentDate}
                  onChange={this.handleChange_Field} />
                {this.getError("expectedShipmentDate")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Token" isRequired />
                <Form.Input
                  disabled={true}
                  attribute="token"
                  value={this.state.order.token}
                  onChange={this.handleChange_Field} />
                {this.getError("token")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Reservation Token" isRequired />
                <Form.Input
                  disabled={true}
                  attribute="reservationToken"
                  value={this.state.order.reservationToken}
                  onChange={this.handleChange_Field} />
                {this.getError("reservationToken")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Tracking URL" isRequired />
                <Form.Input
                  attribute="trackingUrl"
                  value={this.state.order.shipping.trackingUrl}
                  onChange={this.handleChange_Field} />
                {this.getError("trackingUrl")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Tracking Number" isRequired />
                <Form.Input
                  attribute="trackingNumber"
                  value={this.state.order.shipping.trackingNumber}
                  onChange={this.handleChange_Field} />
                {this.getError("trackingNumber")}
              </div>
            </div>
            <h3 style={{marginTop:"50px"}}>The Product</h3>
            <div className="row">
              {this.getProduct()}
            </div>
            <h3 style={{marginTop:"50px"}}>The Dates</h3>
            <div className="row">
              <div className="col-md-4 col-xs-12">
                <Form.Label label="Created On" isRequired />
                <Form.Input
                  disabled={true}
                  attribute="createdOn"
                  value={this.state.order.createdOn}
                  onChange={this.handleChange_Field} />
                {this.getError("createdOn")}
              </div>
              <div className="col-md-4 col-xs-12">
                <Form.Label label="Began Build On" isRequired />
                <Form.Input
                  attribute="beganBuildOn"
                  value={this.state.order.beganBuildOn}
                  onChange={this.handleChange_Field} />
                {this.getError("beganBuildOn")}
              </div>
              <div className="col-md-4 col-xs-12">
                <Form.Label label="Shipped On" isRequired />
                <Form.Input
                  attribute="shippedOn"
                  value={this.state.order.shippedOn}
                  onChange={this.handleChange_Field} />
                {this.getError("shippedOn")}
              </div>
            </div>
            <h3 style={{marginTop:"50px"}}>The Numbers</h3>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Discount" isRequired />
                <Form.Input
                  disabled={true}
                  attribute="discount"
                  value={this.state.order.discount}
                  onChange={this.handleChange_Field} />
                {this.getError("discount")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Subtotal" isRequired />
                <Form.Input
                  disabled={true}
                  attribute="subtotal"
                  value={this.state.order.subtotal}
                  onChange={this.handleChange_Field} />
                {this.getError("subtotal")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Tax" isRequired />
                <Form.Input
                  disabled={true}
                  attribute="tax"
                  value={this.state.order.tax}
                  onChange={this.handleChange_Field} />
                {this.getError("tax")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Total" isRequired />
                <Form.Input
                  disabled={true}
                  attribute="total"
                  value={this.state.order.total}
                  onChange={this.handleChange_Field} />
                {this.getError("total")}
              </div>
            </div>
            <h3 style={{marginTop:"50px"}}>User</h3>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Email" isRequired />
                <Form.Input
                  attribute="user.email"
                  value={this.state.order.user.email}
                  onChange={this.handleChange_Field} />
                {this.getError("user.email")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Phone" isRequired />
                <Form.Input
                  attribute="user.phone"
                  value={this.state.order.user.phone}
                  onChange={this.handleChange_Field} />
                {this.getError("user.phone")}
              </div>
            </div>
            <h3 style={{marginTop:"50px"}}>Shipping</h3>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <Form.Label label="First Name" isRequired />
                <Form.Input
                  attribute="shipping.firstName"
                  value={this.state.order.shipping.firstName}
                  onChange={this.handleChange_Field} />
                {this.getError("shipping.firstName")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Last Name" isRequired />
                <Form.Input
                  attribute="shipping.lastName"
                  value={this.state.order.shipping.lastName}
                  onChange={this.handleChange_Field} />
                {this.getError("shipping.lastName")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Address" isRequired />
                <Form.Input
                  attribute="shipping.address1"
                  value={this.state.order.shipping.address1}
                  onChange={this.handleChange_Field} />
                <div style={{marginTop:"15px"}} />
                <Form.Input
                  attribute="shipping.address2"
                  value={this.state.order.shipping.address2}
                  onChange={this.handleChange_Field} />
                {this.getError("shipping.address2")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="City" isRequired />
                <Form.Input
                  attribute="shipping.city"
                  value={this.state.order.shipping.city}
                  onChange={this.handleChange_Field} />
                {this.getError("shipping.city")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="State" isRequired />
                <Form.Input
                  attribute="shipping.state"
                  value={this.state.order.shipping.state}
                  onChange={this.handleChange_Field} />
                {this.getError("shipping.state")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Zip" isRequired />
                <Form.Input
                  attribute="shipping.zip"
                  value={this.state.order.shipping.zip}
                  onChange={this.handleChange_Field} />
                {this.getError("shipping.zip")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Country" isRequired />
                <Form.Input
                  attribute="shipping.country"
                  value={this.state.order.shipping.country}
                  onChange={this.handleChange_Field} />
                {this.getError("shipping.country")}
              </div>
            </div>
            <h3 style={{marginTop:"50px"}}>Billing</h3>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <Form.Label label="First Name" isRequired />
                <Form.Input
                  attribute="billing.firstName"
                  value={this.state.order.billing.firstName}
                  onChange={this.handleChange_Field} />
                {this.getError("billing.firstName")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Last Name" isRequired />
                <Form.Input
                  attribute="billing.lastName"
                  value={this.state.order.billing.lastName}
                  onChange={this.handleChange_Field} />
                {this.getError("billing.lastName")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Address" isRequired />
                <Form.Input
                  attribute="billing.address1"
                  value={this.state.order.billing.address1}
                  onChange={this.handleChange_Field} />
                <div style={{marginTop:"15px"}} />
                <Form.Input
                  attribute="billing.address2"
                  value={this.state.order.billing.address2}
                  onChange={this.handleChange_Field} />
                {this.getError("billing.address2")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="City" isRequired />
                <Form.Input
                  attribute="billing.city"
                  value={this.state.order.billing.city}
                  onChange={this.handleChange_Field} />
                {this.getError("billing.city")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="State" isRequired />
                <Form.Input
                  attribute="billing.state"
                  value={this.state.order.billing.state}
                  onChange={this.handleChange_Field} />
                {this.getError("billing.state")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Zip" isRequired />
                <Form.Input
                  attribute="billing.zip"
                  value={this.state.order.billing.zip}
                  onChange={this.handleChange_Field} />
                {this.getError("billing.zip")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Country" isRequired />
                <Form.Input
                  attribute="billing.country"
                  value={this.state.order.billing.country}
                  onChange={this.handleChange_Field} />
                {this.getError("billing.country")}
              </div>
            </div>
            <h3 style={{marginTop:"50px"}}>Card</h3>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Stripe Token" isRequired />
                <Form.Input
                  disabled={true}
                  attribute="card.token"
                  value={this.state.order.card.token}
                  onChange={this.handleChange_Field} />
                {this.getError("card.token")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Last 4" isRequired />
                <Form.Input
                  disabled={true}
                  attribute="card.last4"
                  value={this.state.order.card.last4}
                  onChange={this.handleChange_Field} />
                {this.getError("card.last4")}
              </div>
            </div>
            <div style={{marginTop:"25px"}} />
            <div className="row">
              <div className="col-xs-12">
                {this.getButton()}
                <span style={{marginRight:"15px"}} />
                <ButtonSecondary
                  label="Cancel/Back"
                  onClick={this.handleClick_Cancel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  getProduct: function () {
    if (!this.state.order.products) return;
    return this.state.order.products.map(function (product, i) {
      if (!product.config) return;
      return product.config.map(function (config, j) {
        return (
          <div key={product.productId + "-" + j} className="col-xs-12">
            <div>{config.name + " - " + GetProductConfigItemName(product.productId, config.name, config.value)}</div>
          </div>
        )
      }.bind(this));
    }.bind(this));
  },

  getButton: function () {
    if (this.state.isLoading) {
      return (
        <ButtonSecondary label="Processing..." disabled />
      )
    } else {
      return (
        <ButtonPrimary label="Submit" onClick={this.handleClick_Submit} />
      )
    }
  },

  handleClick_Cancel: function () {
    browserHistory.push("/admin/orders");
  },

  validateData: function (callback) {
    var errors = [];
    if (!this.state.order.status) {
      errors.push({name:"status", message: "Status is a required field"});
    }
    if (!this.state.order.token) {
      errors.push({name:"token", message: "Token is a required field"});
    }
    if (!this.state.order.total) {
      errors.push({name:"total", message: "Total is a required field"});
    }
    callback(errors);
  },

	handleChange_UserStore: function () {
		var users = UserStore.find();
		if (users.length > 0) {
			var state = this.state;
			state.user = users[0];
			this.setState(state);
		}
	},

  handleChange_Field: function (attribute, value) {
    var state = this.state;

    if (attribute == "trackingUrl") {
      state.order.shipping[attribute] = value;
    } else if (attribute == "trackingNumber") {
      state.order.shipping[attribute] = value;
    } else {
      state.order[attribute] = value;
    }
    this.setState(state);
  },

  handleClick_Submit: function () {
    var state = this.state;
    state.isLoading = true;
    state.errors = [];
    this.setState(state);

    this.validateData(function (errors) {
      state.errors = errors;
      this.setState(state);

      if (errors.length > 0) {
        state.isLoading = false;
        this.setState(state);
        return;
      }

      var order = this.state.order;
      if (order._id) {
        OrderStore.update(order, function (data) {
          BrowserHistory.push("/admin/orders");
        });
      }
    }.bind(this));
  },

  getError: function (name) {
    var messages = "";
    for (var i = 0; i < this.state.errors.length; i++) {
      var error = this.state.errors[i];
      if (error.name == name) {
        messages += error.message + " ";
      }
    }

    if (messages != "") {
      return (
        <span style={{fontSize:"11px",fontStyle:"italic",color:"red"}}>
          {messages}
        </span>
      )
    }
  },
});

module.exports = Component;
