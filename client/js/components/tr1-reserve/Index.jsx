var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Form = require('../Form/Index.jsx');
var $ = require('jquery');

var cardStyle = {
  base: {
    fontSize: '16px',
    lineHeight: '24px'
  }
};

var Component = React.createClass({
  getInitialState: function () {
    return {
      card: {},
      firstName: '',
      lastName: '',
      email: '',
      emailConfirm: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      isLoading: false,
      errors: [],
    }
  },

  componentWillMount: function () {
    var state = this.state;
    state.card = elements.create('card', {style: cardStyle});
    this.setState(state);
  },

  componentDidMount: function () {
    document.title = "TR1 - Reservation - Slate Robotics";
    window.scrollTo(0,0);

    this.state.card.mount('#card-element');
    this.state.card.addEventListener('change', this.handleChange_CardElement);
  },

  componentWillUnmount: function () {
    this.state.card.removeEventListener('change', this.handleChange_CardElement);
  },

  componentWillUnmount: function () {
    this.state.card.unmount("#card-element");
    this.state.card.clear();
    this.state.card.destroy();
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{marginTop:"34px"}}>
          <div className="col-md-10 col-xs-12 col-centered"
            style={{ textAlign:"left",paddingBottom:"25px",borderBottom:"1px solid #ccc"}}>
            <h1>
              Reserve your TR1
            </h1>
            <p>
              By placing your reservation, you save your place in line
              for delivery priority and are placing a down payment
              on your future TR1 order. Your reservation may be cancelled at
              any time, in which case you will receive a full refund of
              your payment.
            </p>
            <p>
              This helps us tremendously in ramping up production and putting
              all of the proper building blocks in place for a smooth fulfillment
              process. It{"\'"}s a way for us to judge how many people are
              really serious about ordering a TR1 without asking for the full
              payment amount way in advance.
            </p>
            <p>
              The Slate Robotics TR1 will begin delivery in September 2018.
            </p>
          </div>
        </div>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-10 col-xs-12 col-centered" style={{paddingBottom:"25px",borderBottom:"1px solid #ccc"}}>
            <div className="row">
              <div className="col-md-8 col-xs-12">
                <div className="row">
                  <div className="col-md-6 col-xs-12">
                    <Form.Label label="First Name" isRequired />
                    <Form.Input
                      attribute="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange_Field} />
                    {this.getError("firstName")}
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <Form.Label label="Last Name" isRequired />
                    <Form.Input
                      attribute="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange_Field} />
                    {this.getError("lastName")}
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <Form.Label label="Email" isRequired />
                    <Form.Input
                      attribute="email"
                      value={this.state.email}
                      onChange={this.handleChange_Field} />
                    {this.getError("email")}
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <Form.Label label="Confirm Email" isRequired />
                    <Form.Input
                      attribute="emailConfirm"
                      value={this.state.emailConfirm}
                      onChange={this.handleChange_Field} />
                    {this.getError("emailConfirm")}
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <Form.Label label="Phone" isRequired />
                    <Form.Input
                      attribute="phone"
                      value={this.state.phone}
                      onChange={this.handleChange_Field} />
                    {this.getError("phone")}
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xs-12">
                <h3>Questions?</h3>
                <p>We're here to help. Call us anytime.</p>
                <p>(417) 849-3612</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop:"25px"}}>
          <div className="col-md-10 col-xs-12 col-centered" style={{paddingBottom:"25px",borderBottom:"1px solid #ccc"}}>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div style={{maxWidth:"600px"}}>
                  <img
                    src="/img/powered-by-stripe"
                    className="hidden-xs"
                    style={{float:"right"}} />
                  <h4 style={{ textAlign:"left"}}>
                    TR1 requires a $99 reservation payment.
                  </h4>
                  <img
                    src="/img/powered-by-stripe"
                    className="hidden-lg hidden-md hidden-sm"
                    style={{paddingBottom:"15px"}} />
                  <div className="row" style={{marginTop:"15px"}}>
                    <div className="col-xs-12">
                      <div style={{backgroundColor:"#f9f9f9",border:"1px solid #ccc"}}>
                        <div id="card-element" style={{margin:"10px 15px",backgroundColor:"#fff",padding:"5px",border:"1px solid #eee"}}></div>
                      </div>
                      {this.getError("stripe")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xs-12" style={{textAlign:"left"}}>
                <div className="col-xs-12">
                  <Form.Label label="Billing Address" isRequired />
                  <Form.Input
                    attribute="address1"
                    value={this.state.address1}
                    onChange={this.handleChange_Field} />
                  {this.getError("address1")}
                  <div style={{marginTop:"15px"}} />
                  <Form.Input
                    attribute="address2"
                    value={this.state.address2}
                    onChange={this.handleChange_Field} />
                  {this.getError("address2")}
                </div>
                <div className="col-md-6 col-xs-12">
                  <Form.Label label="City" isRequired />
                  <Form.Input
                    attribute="city"
                    value={this.state.city}
                    onChange={this.handleChange_Field} />
                  {this.getError("city")}
                </div>
                <div className="col-md-3 col-xs-12">
                  <Form.Label label="State" isRequired />
                  <Form.Input
                    attribute="state"
                    value={this.state.state}
                    onChange={this.handleChange_Field} />
                  {this.getError("state")}
                </div>
                <div className="col-md-3 col-xs-12">
                  <Form.Label label="Zip" isRequired />
                  <Form.Input
                    attribute="zip"
                    value={this.state.zip}
                    onChange={this.handleChange_Field}
                    onKeyPress={this.handleKeyPress_Zip} />
                  {this.getError("zip")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-10 col-xs-12 col-centered" style={{paddingTop:"25px",paddingBottom:"25px"}}>
            <div style={{display:"inline-block",width:"100%"}}>
              <span style={{float:"right"}}>
                {this.getReservationButton()}
              </span>
              <h4 style={{float:"right",marginRight:"15px"}}>
                {"By placing this order you agree to the "}
                <a href="/pdf/tr1-reservation-agreement" target="_blank">
                  TR1 Reservation Agreement
                </a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  },

  getReservationButton: function () {
    if (this.state.isLoading) {
      var fakeButtonStyle = {
        container: {
          backgroundColor: "#5E5E5E",
          display: "inline-block",
          color: "white",
          touchAction: "manipulation",
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none"
        },
        contents: {
          padding: "8px 10px",
          minWidth: "65px",
          textAlign: "center"
        }
      };
      return (
          <span style={fakeButtonStyle.container}>
              <div style={fakeButtonStyle.contents}>
                  processing...
              </div>
          </span>
      )
    } else {
      return (
        <ButtonPrimary
          label={"Place Reservation"}
          onClick={this.handleClick_PlaceReservation} />
      )
    }
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
  },

  handleChange_CardElement: function (event) {
    var state = this.state;

    if (event.error) {
      state.error = event.error.message;
    } else {
      state.error = "";
    }

    this.setState(state);
  },

  handleClick_PlaceReservation: function () {
    var state = this.state;
    state.isLoading = true;
    state.error = '';
    this.setState(state);

    this.validateData(function (errors) {
      state.errors = errors;
      this.setState(state);

      if (errors.length > 0) {
        state.isLoading = false;
        this.setState(state);
        return;
      }

      stripe.createToken(this.state.card).then(function(result) {
        if (!result || !result.token) {
          state.isLoading = false;
          state.errors = [{name:"stripe",message:"Error validating card information. Is this data correct?"}];
          this.setState(state);
          return;
        }

        var reservation = {};
        reservation.user = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phone: this.state.phone,
        };
        reservation.billing = {
          address1: this.state.address1,
          address2: this.state.address2,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
        };
        reservation.card = {
          token: result.token.id,
          last4: result.token.card.last4,
        };

        $.ajax({
          type: "POST",
          url: "/placeReservation",
          data: reservation,
          success: function (result) {
            if (result.success == true) {
              BrowserHistory.push("/tr1/reserve/success");
            } else {
              var state = this.state;
              state.isLoading = false;
              state.errors.push({name:"stripe",message:result.message});
              this.setState(state);
            }
          }.bind(this),
          dataType: "json"
        });
      }.bind(this));
    }.bind(this));
  },

  validateData: function (callback) {
    var errors = [];
    if (!this.state.firstName) {
      errors.push({name:"firstName", message: "First Name is a required field"});
    }
    if (!this.state.lastName) {
      errors.push({name:"lastName", message: "Last Name is a required field"});
    }
    if (!this.state.email) {
      errors.push({name:"email", message: "Email is a required field"});
    }
    if (!this.state.phone) {
      errors.push({name:"phone", message: "Phone Number is a required field"});
    }
    if (!this.state.address1) {
      errors.push({name:"address1", message: "Address Line 1 is a required field"});
    }
    if (!this.state.city) {
      errors.push({name:"city", message: "City is a required field"});
    }
    if (!this.state.state) {
      errors.push({name:"state", message: "State is a required field"});
    }
    if (!this.state.zip) {
      errors.push({name:"zip", message: "Zip Code is a required field"});
    }
    if (this.state.email != this.state.emailConfirm) {
      errors.push({name:"emailConfirm", message: "Emails do not match"});
    }
    callback(errors);
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
        <span style={{fontSize:"11px",fontStyle:"italic",color:"red"}}>{messages}</span>
      )
    }
  },
});

module.exports = Component;
