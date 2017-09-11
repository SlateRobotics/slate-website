var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var OrderStore = require('../../stores/order');

var Component = React.createClass({
  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{
            color:"white",
            backgroundImage:"url('/img/slate-tr1-1')",
            backgroundPosition:"center top",
            backgroundColor:"#222",
            backgroundRepeat:"no-repeat",
          }}>
          <div className="col-xs-12" style={{overflowX:"hidden"}}>
            <img src="/img/slate-tr1-1" style={{visibility:"hidden"}} />
            <div style={{position:"absolute",top:"0",left:"0",right:"0",padding:"140px 0px",margin:"0px auto"}}>
              <h1 style={{fontSize:"95px",textShadow:"5px 5px #222"}} className="hidden-xs">
                Slate TR1
              </h1>
              <h1 style={{fontSize:"72px",textShadow:"4px 4px #222"}} className="hidden-lg hidden-md hidden-sm">
                Slate TR1
              </h1>
              <h4 style={{fontSize:"32px",textShadow:"3px 3px #222"}}>
                A human-sized robot for hackers
              </h4>
              <div style={Style.buttonContainer} className="hidden-xs">
                <ButtonPrimary
                  label={"Learn more"}
                  onClick={this.handleClick_LearnMore} />
                <span style={{marginLeft:"20px"}} />
                <ButtonPrimary
                  label={"Buy"}
                  onClick={this.handleClick_Buy} />
              </div>
              <div style={Style.buttonContainer} className="hidden-lg hidden-md hidden-sm">
                <ButtonPrimary
                  label={"Learn more"}
                  onClick={this.handleClick_LearnMore} />
                <div style={{marginTop:"15px"}} />
                <ButtonPrimary
                  label={"Buy"}
                  onClick={this.handleClick_Buy} />
              </div>
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
});

module.exports = Component;
