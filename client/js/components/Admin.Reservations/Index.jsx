var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Link = require('react-router').Link;
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var UserStore = require('../../stores').user;
var ReservationStore = require('../../stores').reservation;

var Component = React.createClass({
  getInitialState: function () {
    return {
      user: '',
      reservations: [],
    }
  },

  componentWillMount: function () {
    UserStore.addChangeListener(this.handleChange_UserStore);
    ReservationStore.addChangeListener(this.handleChange_ReservationStore);
  },

  componentDidMount: function () {
    document.title = "Admin - Reservations - Slate Robotics";
    window.scrollTo(0,0);
    this.handleChange_ReservationStore();
  },

  componentWillUnmount: function () {
		UserStore.removeChangeListener(this.handleChange_UserStore);
  	ReservationStore.removeChangeListener(this.handleChange_ReservationStore);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Reservations</h1>
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
    return this.state.reservations.sort(function(a, b) {
        return new Date(b.createdOn) - new Date(a.createdOn);
      }).map(function (reservation, i) {
        if (!reservation.user) reservation.user = {};
        if (!reservation.billing) reservation.billing = {};
        if (!reservation.card) reservation.card = {};

        return (
          <div className="row" key={"reservation-" + i} style={{fontSize:"12px", textAlign:"left", paddingBottom:"15px", marginBottom:"15px", borderBottom:"1px solid #ccc"}}>
            <div className="col-xs-12" style={{marginBottom:"15px"}}>
              <h4 style={{display:"inline"}}>{reservation.user.firstName + " " + reservation.user.lastName}</h4>
              <span> | </span>
              <Link to={"/admin/reservations/" + reservation.token} style={Style.link}>edit</Link>
            </div>
            <div className="col-xs-12" style={{marginBottom:"15px"}}>
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
            <div className="col-md-6 col-xs-12">
              <div><b>Billing Address: </b></div>
              <div>{reservation.billing.address1 + " " + reservation.billing.address2}</div>
              <div>{reservation.billing.city + ", " + reservation.billing.state + " " + reservation.billing.zip}</div>
              <div>{reservation.billing.country}</div>
            </div>
          </div>
        )
      });
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
