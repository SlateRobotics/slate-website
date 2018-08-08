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
                label={"Learn more >"}
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
            backgroundSize:"1204px 674px",
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
                The preeminent machine learning playground
              </h3>
              <h4 className="hidden-lg hidden-md hidden-xs">
                The preeminent machine learning playground
              </h4>
              <Link to="/tr1" style={{color:"#fff",marginRight:"25px"}}>
                Learn More {">"}
              </Link>
              <Link to="/shop/tr1" style={{color:"#fff"}}>
                Buy {">"}
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
                {/*"Starting at $3,199"*/}
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
        <div className="row" style={{padding:"50px 0px",backgroundColor:"#575371",color:"#fff"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-6 col-xs-12" style={{textAlign:"left"}}>
                <h2 style={{marginBottom:"25px"}}>
                  Proudly serving the best in AI
                </h2>
                <p>
                  We are proud to soon be delivering robots to the absolute brightest in
                  AI and Machine Learning. Our community is top, world-class
                  talent. If you are a force to be reckoned with in the AI/ML
                  community, you are in the presence of good company.
                </p>
              </div>
              <div className="col-md-6 col-xs-12">
                <div className="row hidden-sm hidden-xs">
                <div className="col-xs-6">
                    <img style={{height:"150px"}} src="/img/icon-intel-white"/>
                  </div>
                  <div className="col-xs-6">
                    <img style={{height:"150px"}} src="/img/icon-facebook-white"/>
                  </div>
                </div>
                <div className="row hidden-lg hidden-md">
                <div className="col-xs-6">
                    <img style={{height:"100px"}} src="/img/icon-intel-white"/>
                  </div>
                  <div className="col-xs-6">
                    <img style={{height:"100px"}} src="/img/icon-facebook-white"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"50px"}}>
          <div className="col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-6 hidden-sm hidden-xs" style={{
                  backgroundImage: "url('/img/slate-tr1-5')",
                  height:"445px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPositionY: "bottom",
                }}/>
              <div className="hidden-lg hidden-md col-xs-12">
                <img src="/img/slate-tr1-5" style={{width:"100%"}} />
              </div>
              <div className="col-md-5 col-xs-12" style={{textAlign:"left"}}>
                <h2 style={{marginBottom:"25px"}}>
                  You've been living in a dream world, Neo.
                </h2>
                <p>
                  Slate Robotics is a team of hackers and vagabonds fixated on
                  a single, unifying purpose:
                </p>
                <h4 style={{margin:"20px 0px"}}>
                  Robots for hackers that don't suck.
                </h4>
                <p>
                  Gone are the days of $3,000 Turtle Bots and $400,000 PR2s. We
                  match the key features of high-end research robots at
                  a price formerly reserved for triflers.
                </p>
                <p>
                  It is time for a new era of robotic platforms.
                </p>
                <ButtonPrimary
                  label="Check it out >"
                  onClick={this.handleClick_LearnMore} />
              </div>
              <div className="hidden-lg hidden-md col-xs-12" style={{paddingBottom:"10px"}} />
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

  handleClick_AboutUs: function () {
    BrowserHistory.push("/about");
  },

  handleClick_ToggleText: function () {
    $("#tr1-heading").fadeToggle(500);
    $("#tr1-footer-details").fadeToggle(500);
  },
});

module.exports = Component;
