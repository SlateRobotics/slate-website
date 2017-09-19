var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');

var ArmHeading = React.createClass({
  render: function () {
    return (
      <h1>Full-featured Arms</h1>
    )
  }
});

var ArmIcons = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-gyroscope" height="50" width="50" />
        </div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-weights" height="50" width="50" />
        </div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-range" height="50" width="50" />
        </div>
      </div>
    )
  }
});

var ArmIconDescriptions = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-sm-2 col-xs-4">
          <p>7 Degrees of Freedom</p>
        </div>
        <div className="col-sm-2 col-xs-4">
          <p>4.5kg Payload</p>
        </div>
        <div className="col-sm-2 col-xs-4">
          <p>1m Range</p>
        </div>
      </div>
    )
  }
});

var ArmImageSection = React.createClass({
  render: function () {
    return (
      <div style={Style.imageContainer}
        onMouseEnter={this.handleMouseEnter_Image1}
        onMouseLeave={this.handleMouseLeave_Image1}>
        <img
          style={Style.imageCenter}
          src="/img/slate-tr1-2"
          height={this.props.imgHeight} />
        {/* learn more */}
        <div id="detail-1-learn-more-1" style={Style.learnMoreContainer}>
          <div style={Style.learnMoreText}>
            <h3>Robotic Arms</h3>
            <p>
              The arms on the Slate TR1 are powered by stepper motors
              and servos. The wrist and gripper are servo-actuated, and
              the remaining joints are actuated by stepper motors.
            </p>
            <p>
              The joint at the bottom of the shoulder as well as the connection
              between the bicep and forearm can rotate 360 degrees.
            </p>
          </div>
        </div>
        {/* learn more button */}
        <div style={Style.learnMoreButtonContainer}>
          <div id="detail-1-learn-more-button-1"
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
      $("#detail-1-learn-more-button-1").fadeIn(250);
    }
  },

  handleMouseLeave_Image1: function () {
    if (!this.props.isMobile) {
      $("#detail-1-learn-more-button-1").fadeOut(250);
    }
  },

  handleClick_LearnMore1: function () {
    if ($("#detail-1-learn-more-button-1").text() == "+") {
      $("#detail-1-learn-more-button-1").text("x");
      $("#detail-1-learn-more-1").fadeIn(500);
    } else {
      $("#detail-1-learn-more-button-1").text("+");
      $("#detail-1-learn-more-1").fadeOut(500);
    }
  },
});

var BaseHeading = React.createClass({
  render: function () {
    return (
      <h1>Omni-drive Base</h1>
    )
  }
});

var BaseIcons = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-gyroscope" height="50" width="50" />
        </div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-torque" height="50" width="50" />
        </div>
        <div className="col-sm-2 col-xs-4">
          <img src="/img/icon-engine" height="50" width="50" />
        </div>
      </div>
    )
  }
});

var BaseImageSection = React.createClass({
  render: function () {
    return (
      <div style={Style.imageContainer}
        onMouseEnter={this.handleMouseEnter_Image2}
        onMouseLeave={this.handleMouseLeave_Image2}>
        <img
          style={Style.imageCenter}
          src="/img/slate-tr1-3"
          height={this.props.imgHeight} />
        {/* learn more */}
        <div id="detail-1-learn-more-2" style={Style.learnMoreContainer}>
          <div style={Style.learnMoreText}>
            <h3>Mobile Base</h3>
            <p>
              The omni-drive base is capable of translating across both
              the x and y axis, and as a result, it can drive side-to-side
              and diagonally.
            </p>
            <p>
              The major benefit of working with the omni-drive base is
              that the robot can very easily work along multiple areas
              of a counter-top or table. A two-wheel differential-drive
              robot would require several extra maneuvers to accomplish the
              same task.
            </p>
          </div>
        </div>
        {/* learn more button */}
        <div style={Style.learnMoreButtonContainer}>
          <div id="detail-1-learn-more-button-2"
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
      $("#detail-1-learn-more-button-2").fadeIn(250);
    }
  },

  handleMouseLeave_Image2: function () {
    if (!this.props.isMobile) {
      $("#detail-1-learn-more-button-2").fadeOut(250);
    }
  },

  handleClick_LearnMore2: function () {
    if ($("#detail-1-learn-more-button-2").text() == "+") {
      $("#detail-1-learn-more-button-2").text("x");
      $("#detail-1-learn-more-2").fadeIn(500);
    } else {
      $("#detail-1-learn-more-button-2").text("+");
      $("#detail-1-learn-more-2").fadeOut(500);
    }
  },
});

var BaseIconDescriptions = React.createClass({
  render: function () {
    return (
      <div>
        <div className="col-sm-2 col-xs-4">
          <p>3 Degrees of Freedom</p>
        </div>
        <div className="col-sm-2 col-xs-4">
          <p>6Nm Torque</p>
        </div>
        <div className="col-sm-2 col-xs-4">
          <p>75W Power</p>
        </div>
      </div>
    )
  }
})

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">

      {/* WHAT IS TR1 */}
      <div className="container-fluid" style={Style.detail1Container}>
        <div className="row" style={{padding:"75px 0px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1 style={{paddingBottom:"25px"}}>
              What is the TR1?
            </h1>
            <div style={{textAlign:"left"}}>
              <p>
                The Slate TR1 is a human-sized, programmable robot
                from Slate Robotics. The TR1 is designed to give
                hackers, programmers, and engineers a research-grade,
                top-of-the-line robot development platform for about
                the price of a MacBook Pro.
              </p>
              <p>
                The Slate TR1 is powered by a popular Linux distribution,
                Ubuntu, which gives you the power to do whatever you want
                with the robot. Once the robot is on your home network,
                you can connect to the on-board computer via SSH or VNC--or
                through the exposed HDMI port, if needed. Any programming
                language that can interface with the I2C bus on the operating
                system can be used to program the robot! You could program in
                Javascript w/ Node.js should you so desire!
              </p>
              <p>
                One of our major goals is to nurture an open-source community
                of hackers who are building stuff with the TR1. The major
                advantage of building a robot for the hacker--in contrast to,
                say, research institutions--is that millions of people get
                to build stuff--compared to a few thousand. Towards this end,
                we have open-sourced all proprietary code that comes
                pre-installed on the TR1, which can be seen on our
                {" "}
                <a href="https://github.com/SlateRobotics" style={{color:"#fff"}}>
                  GitHub
                </a>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </div>


        {/* ---DESKTOP--- */}
        <div className="container-fluid hidden-xs" style={Style.detail1Container}>
          {/* headings */}
          <div className="row">
            <div className="col-sm-6">
              <ArmHeading />
            </div>
            <div className="col-sm-6">
              <BaseHeading />
            </div>
          </div>
          {/* icons */}
          <div className="row">
            <ArmIcons />
            <BaseIcons />
          </div>
          {/* icon descriptions */}
          <div className="row" style={Style.iconDescriptionContainer}>
            <ArmIconDescriptions />
            <BaseIconDescriptions />
          </div>
          {/* images */}
          <div className="row">
            <div className="col-sm-6" style={{height:"550px",padding:"0"}}>
              <ArmImageSection imgHeight="550" />
            </div>
            <div className="col-sm-6" style={{height:"550px",padding:"0"}}>
              <BaseImageSection imgHeight="550" />
            </div>
          </div>
        </div>


        {/* ---MOBILE--- */}
        <div
          className="container-fluid hidden-lg hidden-md hidden-sm"
          style={Style.detail1Container}>
          {/* arm section */}
          <div className="row">
            <div className="col-xs-12">
              <ArmHeading />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <ArmIcons />
            </div>
          </div>
          <div className="row" style={Style.iconDescriptionContainer}>
            <div className="col-xs-12" style={{fontSize:"12px"}}>
              <ArmIconDescriptions />
            </div>
          </div>
          <div className="row" style={{marginBottom:"35px"}}>
            <div className="col-xs-12" style={{height:"500px",padding:"0"}}>
              <ArmImageSection imgHeight="500" isMobile={true} />
            </div>
          </div>
          {/* base section */}
          <div className="row">
            <div className="col-xs-12">
              <BaseHeading />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <BaseIcons />
            </div>
          </div>
          <div className="row" style={Style.iconDescriptionContainer}>
            <div className="col-xs-12" style={{fontSize:"12px"}}>
              <BaseIconDescriptions />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12" style={{height:"500px",padding:"0"}}>
              <BaseImageSection imgHeight="500" isMobile={true} />
            </div>
          </div>
        </div>


      </div>
    );
  },
});

module.exports = Component;
