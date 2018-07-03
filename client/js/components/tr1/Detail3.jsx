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
          src="/img/slate-tr1-5"
          height={this.props.imgHeight} />
        {/* learn more */}
        <div id="detail-3-learn-more-1" style={Style.learnMoreContainer}>
          <div style={Style.learnMoreText}>
            <h3>Orbbec Astra</h3>
            <p>
              The Astra Series was designed to further improve on the attributes
              that set Orbbec 3D cameras apart from existing 3D cameras on the
              market. Astra 3D cameras provide computer vision that enables
              dozens of functions such as face recognition, gesture recognition,
              human body tracking, three-dimensional measurement, environment
              perception, and three-dimensional map reconstruction.
            </p>
            <p>
              Orbbec Astra shares the same appearance, size, and weight as
              Orbbec Astra S. The difference is that Astra is optimized for
              long-range use cases, which makes it great for interactive systems,
              entertainment, retail, and robotics. Astra was developed to be
              highly compatible with existing OpenNI applications making both
              the Astra and Astra S ideal cameras for pre-existing apps that
              were built with OpenNI.
            </p>
          </div>
        </div>
        {/* learn more button */}
        <div style={Style.learnMoreButtonContainer}>
          <div id="detail-3-learn-more-button-1"
            style={Style.learnMoreButton}
            onClick={this.handleClick_LearnMore1}>
            {"+"}
          </div>
        </div>
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
          src="/img/slate-tr1-7"
          height={this.props.imgHeight} />
        {/* learn more */}
        <div id="detail-3-learn-more-2" style={Style.learnMoreContainer}>
          <div style={Style.learnMoreText}>
            <h3>Integrated Charging</h3>
            <p>
              The Slate TR1 comes equiped with a built-in charger and
              maintainer for its 12V deep cycle battery, which is capable
              of delivering power in an instant when required of any of
              the robot's actuators. To charge, simply plug in the included 25ft power cord
              into the back of the robot when power is low.
            </p>
            <i>
              * For non-standard, upgradable 100 AH battery option.
              Battery life can vary greatly and is entirely dependent upon
              use. Proper maintenance and care must be taken to ensure the
              optimal life of the battery.
            </i>
          </div>
        </div>
        {/* learn more button */}
        <div style={Style.learnMoreButtonContainer}>
          <div id="detail-3-learn-more-button-2"
            style={Style.learnMoreButton}
            onClick={this.handleClick_LearnMore2}>
            {"+"}
          </div>
        </div>
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
          <p>Up to 8 Hour Battery Life*</p>
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
