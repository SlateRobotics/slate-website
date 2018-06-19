var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Link = require('react-router').Link;
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var UserStore = require('../../stores').user;
var ReservationStore = require('../../stores').reservation;

var Component = React.createClass({
  getInitialState: function () {
    return {
      user: '',
      reservations: [],
      search: '',
      sort: 'Descending By Date',
    }
  },

  componentWillMount: function () {
    UserStore.addChangeListener(this.handleChange_UserStore);
		ReservationStore.get({
      refresh: true,
      success: function (data) {
  			var state = this.state;
  			state.reservations = data;
  			this.setState(state);
      }.bind(this),
    });
  },

  componentDidMount: function () {
    document.title = "Admin - Reservations - Slate Robotics";
    window.scrollTo(0,0);
    this.handleChange_ReservationStore();
  },

  componentWillUnmount: function () {
		UserStore.removeChangeListener(this.handleChange_UserStore);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Reservations</h1>
            <div>{this.state.reservations.length + " total reservations"}</div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-8 col-xs-12">
                <Form.Input
                  attribute="search"
                  placeholder="Search for a reservation..."
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
            {this.getReservations()}
          </div>
        </div>
      </div>
    );
  },

  getReservations: function () {
    var sort = {};
    sort["Ascending By Date"] = function(a,b){return new Date(a.createdOn) - new Date(b.createdOn)};
    sort["Descending By Date"] = function(a,b){return new Date(b.createdOn) - new Date(a.createdOn)};

    var reservations = this.state.reservations;
    if (this.state.search) {
      var search = this.state.search.toLowerCase();
      reservations = reservations.filter(function (reservation) {
        if (!reservation.user) reservation.user = {};
        var firstName = reservation.user.firstName.toLowerCase().includes(search);
        var lastName = reservation.user.lastName.toLowerCase().includes(search);
        return firstName || lastName;
      }.bind(this));
    }

    return reservations.sort(sort[this.state.sort]).map(function (reservation, i) {
        if (!reservation.user) reservation.user = {};
        if (!reservation.billing) reservation.billing = {};
        if (!reservation.card) reservation.card = {};

        var number = 1;
        reservations.map(function (r, j) {
            if (new Date(r.createdOn) < new Date(reservation.createdOn)) {
              number += 1;
            }
        });

        function getBeganBuildOnString () {
          if (reservation.beganBuildOn) {
            return new Date(reservation.beganBuildOn).toLocaleString();
          } else {
            return "-";
          }
        }

        function getShippedOnString () {
          if (reservation.shippedOn) {
            return new Date(reservation.shippedOn).toLocaleString();
          } else {
            return "-";
          }
        }

        function getExpectedShipmentString () {
          if (reservation.expectedShipmentDate) {
            return new Date(reservation.expectedShipmentDate).toLocaleString();
          } else {
            return "-";
          }
        }

        return (
          <div className="row" key={"reservation-" + i} style={{fontSize:"12px", textAlign:"left", paddingBottom:"15px", marginBottom:"15px", borderBottom:"1px solid #ccc"}}>
            <div className="col-xs-12" style={{marginBottom:"15px"}}>
              <h4 style={{display:"inline"}}>
                {"#" + number + " "}
                {reservation.user.firstName + " " + reservation.user.lastName}
              </h4>
              <span> | </span>
              <Link to={"/reservation/" + reservation._id + "?token=" + reservation.token} style={Style.link}>view</Link>
              <span> | </span>
              <Link to={"/admin/reservations/" + reservation._id + "?token=" + reservation.token} style={Style.link}>edit</Link>
            </div>
            <div className="col-xs-12" style={{marginBottom:"15px"}}>
              <div>{"Reservation Status: " + reservation.status}</div>
              <div>{"Reservation Token: " + reservation.token}</div>
              <div>{"Reservation Amount: $" + reservation.total}</div>
              <div>{"Reservation Date: " + new Date(reservation.createdOn).toLocaleString()}</div>
            </div>
            <div className="col-md-6 col-xs-12">
              <div>{"Email: " + reservation.user.email}</div>
              <div>{"Phone: " + reservation.user.phone}</div>
              <div>{"Card Token: " + reservation.card.token}</div>
              <div>{"Card Number: **** **** **** " + reservation.card.last4}</div>
            </div>
            <div className="hidden-lg hidden-md col-xs-12" style={{marginBottom:"15px"}}></div>
            <div className="col-md-6 col-xs-12">
              <div><b>Billing Address: </b></div>
              <div>{reservation.billing.address1 + " " + reservation.billing.address2}</div>
              <div>{reservation.billing.city + ", " + reservation.billing.state + " " + reservation.billing.zip}</div>
              <div>{reservation.billing.country}</div>
            </div>
            <div className="col-xs-12" style={{marginBottom:"15px"}}></div>
            <div className="col-xs-12">
              <div>{"Began Build On: " + getBeganBuildOnString()}</div>
              <div>{"Expected Shipment Date: " + getExpectedShipmentString()}</div>
              <div>{"Shipped On: " + getShippedOnString()}</div>
              <div>{"Tracking Number: " + reservation.trackingNumber}</div>
              <div>{"Tracking Url: " + reservation.trackingUrl}</div>
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

	handleChange_ReservationStore: function () {
		ReservationStore.get({
      success: function (data) {
  			var state = this.state;
  			state.reservations = data;
  			this.setState(state);
      }.bind(this),
    });
	},
});

module.exports = Component;
