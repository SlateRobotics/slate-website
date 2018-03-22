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
        <div className="row hidden-lg hidden-md hidden-sm" style={{
            color:"white",
            backgroundImage:"url('/img/slate-tr1-1')",
            backgroundPosition:"center top",
            backgroundColor:"#222",
            backgroundRepeat:"no-repeat",
            backgroundSize:"800px 500px",
          }}>
          <div
            className="col-lg-10 col-xs-12 col-centered"
            style={{
              height:"500px",
              position:"relative",
            }}>
            <div style={{
                position:"absolute",
                top:"0",
                left:"10px",
                textAlign:"left"
              }}>
              <h1>
                Slate
                <br />
                TR1
              </h1>
              <ButtonPrimary
                label={"Learn more"}
                onClick={this.handleClick_LearnMore} />
            </div>
          </div>
        </div>
        <div className="row hidden-xs" style={{
            color:"white",
            backgroundImage:"url('/img/slate-tr1-1')",
            backgroundPosition:"center top",
            backgroundColor:"#222",
            backgroundRepeat:"no-repeat",
            backgroundSize:"1122px 700px",
          }}>
          <div
            className="col-lg-10 col-xs-12 col-centered"
            style={{
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
              <h3 className="hidden-sm hidden-xs">
                Human-sized robot for hackers
              </h3>
              <h4 className="hidden-lg hidden-md hidden-xs">
                Human-sized robot for hackers
              </h4>
              <Link to="/tr1" style={{color:"#fff",marginRight:"25px"}}>
                Learn More {">"}
              </Link>
              <Link to="/tr1/reserve" style={{color:"#fff"}}>
                Reserve Yours {">"}
              </Link>
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
                Starting at $2,999
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
        <div className="row" style={{padding:"100px 0px"}}>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <h1 style={{paddingBottom:"25px"}}>
                  Let's build the future of general purpose robots
                </h1>
                <div style={{textAlign:"justify"}}>
                  <p>
                    I used to dream of one day being able to sit down and program
                    one of the super-advanced research robots like Willow Garage's PR2.
                    My grades in high school and college weren't great, so I probably
                    wasn't destined to work with one in UC Berkeley's Robotics
                    and Intelligent Machines Lab. And with a price tag of $400,000,
                    it's rather obvious how likely it is that I would just go out and
                    buy one. This also made me realize that even if all
                    of the hard problems of AI and perception were solved today,
                    we still wouldn't get general purpose robot butlers, since
                    the hardware cost problem hadn't been addressed.
                  </p>
                  <p>
                    Naturally, I decided I would just try to build my own
                    research robot that I could program and would be affordable
                    enough for other people to program too. A year of hacking
                    on hardware in my garage led to the development of the TR1,
                    a human-sized platform with two, 7-DOF arms and a mobile,
                    omnidirectional base for only $2,999.
                  </p>
                  <p>
                    I hope affordable robots like the TR1 can do for personal
                    robotics what the Altair 8800 and the Apple II did for
                    personal computing. Perhaps, if we can build a community of
                    hackers and engineers around building tools and applications
                    for robots like the TR1, we can begin to build the future of
                    general purpose robots.
                  </p>
                  <p style={{fontStyle:"italic"}}>
                    <b>Zach Allen</b><br/>
                    Founder & CEO
                  </p>
                </div>
                <ButtonPrimary
                  label={"Learn more"}
                  onClick={this.handleClick_LearnMore} />
              </div>
              <div className="col-md-6 col-xs-12">
                <img src="/img/slate-tr1-8" style={{maxWidth:"100%"}} />
              </div>
            </div>
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
