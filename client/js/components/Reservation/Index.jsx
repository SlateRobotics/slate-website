var React = require('react');
var $ = require('jquery');
var moment = require('moment');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ReservationStore = require('../../stores/reservation');

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
      isLoading: true,
      error: '',
      reservation: {
        user: {},
        billing: {},
        card: {},
      }
    }
  },

  componentWillMount: function () {
    this.isLoading();
    ReservationStore.getOne({
      id: this.props.params.id,
      params: "token=" + gup('token', location.href),
      refresh: true,
      success: function (data) {
        var state = this.state;
        state.reservation = data;
        if (!state.reservation.user) state.reservation.user = {};
        if (!state.reservation.billing) state.reservation.billing = {};
        if (!state.reservation.card) state.reservation.card = {};
        state.isLoading = false;
        state.error = "";
        this.setState(state);
      }.bind(this),
      error: function (error) {
        var state = this.state;
        state.isLoading = false;
        state.error = "An error occurred loading your order.";
        this.setState(state);
      }.bind(this),
    });
  },

  componentDidMount: function () {
    document.title = "Reservation Details - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function () {
    if (this.state.isLoading) {
      return (
        <div className="container-fluid" style={Style.container}>
          <div className="row">
            <div className="col-md-10 col-xs-12 col-centered">
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.error) {
      return (
        <div className="container-fluid" style={Style.container}>
          <div className="row">
            <div className="col-md-10 col-xs-12 col-centered">
              <h1 style={{color:"#da383c"}}>{this.state.error}</h1>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{borderBottom:"1px solid #ccc"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div style={{textAlign:"left"}}>
              <h2>Track Reseration</h2>
              {this.getStatusDetails()}
            </div>
            <div className="row" style={{padding:"15px",backgroundColor:"#eee",margin:"15px 0px",border:"1px solid #ccc"}}>
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-4">
                    <h1><span style={{color:"green"}}>✔</span></h1>
                  </div>
                  <div className="col-xs-4">
                    <h1>{this.getBeganBuildIcon()}</h1>
                  </div>
                  <div className="col-xs-4">
                    <h1>{this.getShippedIcon()}</h1>
                  </div>
                </div>
                <div className="row hidden-lg hidden-md hidden-sm">
                  <div className="col-xs-4">
                    <h4>Placed</h4>
                  </div>
                  <div className="col-xs-4">
                    <h4>Began Build</h4>
                  </div>
                  <div className="col-xs-4">
                    <h4>Shipped</h4>
                  </div>
                </div>
                <div className="row hidden-xs">
                  <div className="col-xs-4">
                    <h3 style={{marginTop:"0px"}}>Placed</h3>
                  </div>
                  <div className="col-xs-4">
                    <h3 style={{marginTop:"0px"}}>Began Build</h3>
                  </div>
                  <div className="col-xs-4">
                    <h3 style={{marginTop:"0px"}}>Shipped</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-4">
                    <div>{this.getCreatedOnString("MMM D")}</div>
                  </div>
                  <div className="col-xs-4">
                    <div>{this.getBeganBuildOnString("MMM D")}</div>
                  </div>
                  <div className="col-xs-4">
                    <div>{this.getShippedOnString("MMM D")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
        <div className="row">
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-6 col-xs-12" style={{textAlign:"left",paddingBottom:"15px"}}>
                <h2 style={{marginTop:"0px"}}>Billing Details</h2>
                <div>{this.state.reservation.billing.address1 + " " + this.state.reservation.billing.address2}</div>
                <div>{this.state.reservation.billing.city + ", " + this.state.reservation.billing.state + " " + this.state.reservation.billing.zip}</div>
                <div>{this.state.reservation.billing.country}</div>
              </div>
              <div className="col-md-6 col-xs-12" style={{textAlign:"left",paddingBottom:"15px"}}>
                <h2 style={{marginTop:"0px"}}>Payment Details</h2>
                <div style={{lineHeight:"150%"}}>
                  <div>Amount: ${this.state.reservation.total}</div>
                  <div>Credit/Debit Card: **** {this.state.reservation.card.last4}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
      </div>
    );
  },

  getBeganBuildIcon: function () {
    if (this.state.reservation.beganBuildOn) {
      return (<span style={{color:"green"}}>✔</span>);
    } else {
      return (<span>⏳</span>)
    }
  },

  getShippedIcon: function () {
    if (this.state.reservation.shippedOn) {
      return (<span style={{color:"green"}}>✔</span>);
    } else {
      return (<span>⏳</span>)
    }
  },

  getStatusDetails: function () {
    var status = ""; // placed, began assembly, shipped
    if (this.state.reservation.status) {
      status = this.state.reservation.status.toUpperCase();
    } else {
      status = "PLACED";
    }

    if (status != "SHIPPED") {
      var expected = "";
      if (this.state.reservation.expectedShipmentDate) {
        expected = moment(this.state.reservation.expectedShipmentDate).format("MMM D");
      }
      return (
        <div>
          <div>Status: {status}</div>
          <div>Expected Shipment Date: {expected}</div>
        </div>
      )
    } else if (status == "SHIPPED") {
      var tracking = this.state.reservation.trackingNumber;
      var trackingUrl = this.state.reservation.trackingUrl;
      return (
        <div>
          <div>Status: {status}</div>
          <div>Carrier: UPS</div>
          <div>Tracking #: <a href={trackingUrl} target="_blank">{tracking}</a></div>
        </div>
      )
    }
  },

  getCreatedOnString: function (format) {
    if (this.state.reservation && this.state.reservation.createdOn) {
      return moment(this.state.reservation.createdOn).format(format);
    }
  },

  getBeganBuildOnString: function (format) {
    if (this.state.reservation && this.state.reservation.beganBuildOn) {
      return moment(this.state.reservation.beganBuildOn).format(format);
    } else {
      return "---";
    }
  },

  getShippedOnString: function (format) {
    if (this.state.reservation && this.state.reservation.shippedOn) {
      return moment(this.state.reservation.shippedOn).format(format);
    } else {
      return "---";
    }
  },

  isLoading: function () {
    var state = this.state;
    state.isLoading = true;
    this.setState(state);
  },

  isNotLoading: function () {
    var state = this.state;
    state.isLoading = false;
    this.setState(state);
  },
});

module.exports = Component;
