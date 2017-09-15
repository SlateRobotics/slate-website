var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');

var KinectHeading = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Kinect 2.0</h1>
        <h3>Integrated Vision System</h3>
      </div>
    )
  }
});

var KinectIcons = React.createClass({
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
          <img src="/img/icon-frame-rate" height="50" width="50" />
        </div>
      </div>
    )
  }
});

var KinectIconDescriptions = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-sm-2 col-xs-4">
          <p>1080p RGB Video</p>
        </div>
        <div className="col-sm-2 col-xs-4">
          <p>510x424 Point Cloud</p>
        </div>
        <div className="col-sm-2 col-xs-4">
          <p>30 Frames Per Second</p>
        </div>
      </div>
    )
  }
});

var KinectImageSection = React.createClass({
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
            <h3>Kinect 2.0</h3>
            <p>
              Kinect is a motion sensing input device by Microsoft
              for Xbox One video game consoles and Microsoft Windows PCs.
            </p>
            <p>
              What makes the Kinect such an incredible device is its
              1080p RGB camera and integrated IR point-cloud sensor.
              The result is that--for each frame--you get both the color-pixel
              values as well as a vast array of depth information.
            </p>
            <p>
              The Kinect is used heavily in research institions as it is
              very easy to work with, affordable, and incredibly powerful.
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
              maintainer for its 12V lead-acid battery. The result
              is that you simply plug in the included 25ft power cord
              into the back of the robot when power is low.
            </p>
            <p>
              While charging, the robot will feed power directly from
              the power cable for purposes of computing and actuation.
              This allows you to quickly get full voltage even if the
              battery is low.
            </p>
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
          <p>8+ Hour Battery Life</p>
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
              <KinectHeading />
            </div>
            <div className="col-sm-6">
              <ChargerHeading />
            </div>
          </div>
          {/* icons */}
          <div className="row">
            <KinectIcons />
            <ChargerIcons />
          </div>
          {/* icon descriptions */}
          <div className="row" style={Style.iconDescriptionContainer}>
            <KinectIconDescriptions />
            <ChargerIconDescriptions />
          </div>
          {/* images */}
          <div className="row">
            <div className="col-sm-6" style={{height:"550px",padding:"0"}}>
              <KinectImageSection imgHeight="550" />
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
              <KinectHeading />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <KinectIcons />
            </div>
          </div>
          <div className="row" style={Style.iconDescriptionContainer}>
            <div className="col-xs-12" style={{fontSize:"12px"}}>
              <KinectIconDescriptions />
            </div>
          </div>
          <div className="row" style={{marginBottom:"35px"}}>
            <div className="col-xs-12" style={{height:"500px",padding:"0"}}>
              <KinectImageSection imgHeight="500" isMobile={true} />
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