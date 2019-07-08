var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');

var CameraHeading = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Orbbec Astra</h1>
        <h3>Integrated Vision System</h3>
      </div>
    )
  }
});

var CameraIcons = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-rgb" height="50" width="50" />
        </div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-point-cloud" height="50" width="50" />
        </div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-microphone" height="50" width="50" />
        </div>
      </div>
    )
  }
});

var CameraIconDescriptions = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-sm-2 col-xs-4">
          <p>Up to 1280x960 RGB Video Resolution</p>
        </div>
        <div className="col-sm-2 col-xs-4">
          <p>Up to 640x320 Depth Video Resolution</p>
        </div>
        <div className="col-sm-2 col-xs-4">
          <p>2 integrated microphones</p>
        </div>
      </div>
    )
  }
});

var CameraImageSection = React.createClass({
  render: function () {
    return (
      <div style={Style.imageContainer}
        onMouseEnter={this.handleMouseEnter_Image1}
        onMouseLeave={this.handleMouseLeave_Image1}>
        <img
          style={Style.imageCenter}
          src="/img/slate-tr2-12"
          height={this.props.imgHeight} />
      </div>
    )
  },

  handleMouseEnter_Image1: function () {
    if (!this.props.isMobile) {
      $("#detail-3-learn-more-button-1").fadeIn(250);
    }
  },

  handleMouseLeave_Image1: function () {
    if (!this.props.isMobile) {
      $("#detail-3-learn-more-button-1").fadeOut(250);
    }
  },

  handleClick_LearnMore1: function () {
    if ($("#detail-3-learn-more-button-1").text() == "+") {
      $("#detail-3-learn-more-button-1").text("x");
      $("#detail-3-learn-more-1").fadeIn(500);
    } else {
      $("#detail-3-learn-more-button-1").text("+");
      $("#detail-3-learn-more-1").fadeOut(500);
    }
  },
});

var ChargerHeading = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Integrated Charging System</h1>
      </div>
    )
  }
});

var ChargerIcons = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-battery" height="50" width="50" />
        </div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-voltage" height="50" width="50" />
        </div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-power" height="50" width="50" />
        </div>
      </div>
    )
  }
});

var ChargerImageSection = React.createClass({
  render: function () {
    return (
      <div style={Style.imageContainer}
        onMouseEnter={this.handleMouseEnter_Image2}
        onMouseLeave={this.handleMouseLeave_Image2}>
        <img
          style={Style.imageCenter}
          src="/img/slate-tr2-6"
          height={this.props.imgHeight} />
      </div>
    )
  },

  handleMouseEnter_Image2: function () {
    if (!this.props.isMobile) {
      $("#detail-3-learn-more-button-2").fadeIn(250);
    }
  },

  handleMouseLeave_Image2: function () {
    if (!this.props.isMobile) {
      $("#detail-3-learn-more-button-2").fadeOut(250);
    }
  },

  handleClick_LearnMore2: function () {
    if ($("#detail-3-learn-more-button-2").text() == "+") {
      $("#detail-3-learn-more-button-2").text("x");
      $("#detail-3-learn-more-2").fadeIn(500);
    } else {
      $("#detail-3-learn-more-button-2").text("+");
      $("#detail-3-learn-more-2").fadeOut(500);
    }
  },
});

var ChargerIconDescriptions = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-sm-2 col-xs-4">
          <p>Up to 6 Hour Battery Life</p>
        </div>
        <div className="col-sm-2 col-xs-4">
          <p>12V Power Source</p>
        </div>
        <div className="col-sm-2 col-xs-4">
          <p>Power Cut-off Switch</p>
        </div>
      </div>
    )
  }
})

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">


        {/* ---DESKTOP--- */}
        <div className="container-fluid hidden-xs" style={Style.detail3Container}>
          {/* headings */}
          <div className="row">
            <div className="col-sm-6">
              <CameraHeading />
            </div>
            <div className="col-sm-6">
              <ChargerHeading />
            </div>
          </div>
          {/* icons */}
          <div className="row">
            <CameraIcons />
            <ChargerIcons />
          </div>
          {/* icon descriptions */}
          <div className="row" style={Style.iconDescriptionContainer}>
            <CameraIconDescriptions />
            <ChargerIconDescriptions />
          </div>
          {/* images */}
          <div className="row">
            <div className="col-sm-6" style={{height:"550px",padding:"0"}}>
              <CameraImageSection imgHeight="550" />
            </div>
            <div className="col-sm-6" style={{height:"550px",padding:"0"}}>
              <ChargerImageSection imgHeight="550" />
            </div>
          </div>
        </div>


        {/* ---MOBILE--- */}
        <div
          className="container-fluid hidden-lg hidden-md hidden-sm"
          style={Style.detail3Container}>
          {/* arm section */}
          <div className="row">
            <div className="col-xs-12">
              <CameraHeading />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <CameraIcons />
            </div>
          </div>
          <div className="row" style={Style.iconDescriptionContainer}>
            <div className="col-xs-12" style={{fontSize:"12px"}}>
              <CameraIconDescriptions />
            </div>
          </div>
          <div className="row" style={{marginBottom:"35px"}}>
            <div className="col-xs-12" style={{height:"500px",padding:"0"}}>
              <CameraImageSection imgHeight="500" isMobile={true} />
            </div>
          </div>
          {/* base section */}
          <div className="row">
            <div className="col-xs-12">
              <ChargerHeading />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <ChargerIcons />
            </div>
          </div>
          <div className="row" style={Style.iconDescriptionContainer}>
            <div className="col-xs-12" style={{fontSize:"12px"}}>
              <ChargerIconDescriptions />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12" style={{height:"500px",padding:"0"}}>
              <ChargerImageSection imgHeight="500" isMobile={true} />
            </div>
          </div>
        </div>


      </div>
    );
  },
});

module.exports = Component;
