var React = require('react');
var $ = require('jquery');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var OrderStore = require('../../stores/order');

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "Slate Robotics";
    window.scrollTo(0,0);
    $("#tr1-heading").delay(500).fadeIn(1000);
    $("#tr1-footer").delay(1000).fadeIn(1000);
    $("#tr1-footer-details").delay(2000).fadeIn(1000);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{
            color:"white",
            backgroundImage:"url('/img/slate-tr1-1')",
            backgroundPosition:"center top",
            backgroundColor:"#262626",
            backgroundRepeat:"no-repeat",
            backgroundSize:"1122px 700px",
          }}>
          <div
            className="col-lg-10 col-xs-12 col-centered"
            style={{
              overflowX:"hidden",
              height:"700px",
              position:"relative",
            }}>
            <div id="tr1-heading" style={{
                display:"none",
                position:"absolute",
                top:"0",
                left:"10px",
                textAlign:"left"
              }}>
              <h1 style={{fontSize:"72px"}} className="hidden-sm hidden-xs">
                Slate TR1
              </h1>
              <h1 style={{fontSize:"48px"}} className="hidden-lg hidden-md hidden-xs">
                Slate TR1
              </h1>
              <h1 className="hidden-lg hidden-md hidden-sm">
                Slate
                <br />
                TR1
              </h1>
              <h3 className="hidden-sm hidden-xs">
                Human-sized robot for hackers
              </h3>
              <h4 className="hidden-lg hidden-md hidden-xs">
                Human-sized robot for hackers
              </h4>
              <Link to="/tr1" style={{color:"#fff",marginRight:"25px"}} className="hidden-xs">Learn More {">"}</Link>
              <Link to="/tr1" style={{color:"#fff",marginRight:"25px"}} className="hidden-lg hidden-md hidden-sm">Details {">"}</Link>
              <Link to="/shop/tr1" style={{color:"#fff"}} className="hidden-xs">Buy {">"}</Link>
            </div>
          </div>
          <div
            id="tr1-footer"
            className="col-lg-10 col-xs-12 col-centered"
            style={{
              display:"none",
              position:"relative",
              bottom:"0",
              left:"0",
              textAlign:"left"
            }}>
            <div id="tr1-footer-details" style={{
                position:"absolute",
                right:"6px",
                display:"none",
                bottom:"0"
              }}>
              <span style={{fontStyle:"italic",lineHeight:"38px"}}>
                Starting at $2,499
              </span>
            </div>
            <div id="tr1-control-toggle" style={{
                position:"absolute",
                left:"0",
                bottom:"0"
              }}>
              <ButtonSecondary
                label={"Toggle View"}
                onClick={this.handleClick_ToggleText} />
            </div>
          </div>
        </div>
        <div className="row" style={{
            padding:"150px 0px",
          }}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1 style={{fontSize:"64px",paddingBottom:"25px"}}>
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
                {" "}<a href="https://github.com/SlateRobotics">GitHub</a>{" "}
                page.
              </p>
            </div>
            <ButtonPrimary
              label={"Learn more"}
              onClick={this.handleClick_LearnMore} />
          </div>
        </div>
      </div>
    );
  },

  handleClick_LearnMore: function () {
    BrowserHistory.push("/tr1");
  },

  handleClick_Buy: function () {
    BrowserHistory.push("/shop/tr1");
  },

  handleClick_ToggleText: function () {
    $("#tr1-heading").fadeToggle(500);
    $("#tr1-footer-details").fadeToggle(500);
  },
});

module.exports = Component;
