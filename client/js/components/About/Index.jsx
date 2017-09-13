var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "About - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>About</h1>
            <h4>
              Our mission is to get high performance robots into
              the hands of hackers.
            </h4>
          </div>
        </div>
        <div style={{marginTop:"50px"}} />
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <img
                  src="/img/zach"
                  style={{height:"150px",width:"150px",borderRadius:"50%"}} />
                <h3>Zachary Allen</h3>
                <h4>Founder & CEO</h4>
                <div style={{margin:"25px 0px"}}>
                  <a href="https://www.linkedin.com/in/zachary-allen-674ab8a9/">
                    <img src="/img/icon-linkedin" height="35" width="35" />
                  </a>
                  <span style={{marginRight:"25px"}} />
                  <a href="https://twitter.com/ZachAllen417">
                    <img src="/img/icon-twitter" height="35" width="35" />
                  </a>
                  <span style={{marginRight:"25px"}} />
                  <a href="https://www.facebook.com/zach.allen.566">
                    <img src="/img/icon-facebook" height="35" width="35" />
                  </a>
                </div>
                <div style={{marginTop:"15px"}} />
                <p>
                  With a B.A. in Spanish from Drury University, Zach's path
                  to robotics is a long and winding one. Soon after graduating,
                  he found his way into computers and worked as a software
                  engineer for 3 years for his dad. A book on Deep Learning
                  turned his attention to robotics, where he realized it was
                  impossible to buy the kinds of robots with which you could
                  really experiment, ergo the Slate TR1.
                </p>
              </div>
              <div className="col-xs-12 hidden-lg hidden-md" style={{marginBottom:"25px"}} />
              <div className="col-md-6 col-xs-12">
                <img
                  src="/img/brian"
                  style={{height:"150px",width:"150px",borderRadius:"50%"}} />
                <h3>Brian Allen</h3>
                <h4>Investor & Board Member</h4>
                <div style={{margin:"25px 0px"}}>
                  <a href="https://www.linkedin.com/in/brianallenretireadviser1/">
                    <img src="/img/icon-linkedin" height="35" width="35" />
                  </a>
                  <span style={{marginRight:"25px"}} />
                  <a href="https://twitter.com/RetireAdviser1">
                    <img src="/img/icon-twitter" height="35" width="35" />
                  </a>
                </div>
                <div style={{marginTop:"15px"}} />
                <p>
                  Brian is the founder of Pension Consultants, Inc.,
                  and he has served as President and Board Chairperson since
                  its inception in 1994. He serves as Chairperson for Pension
                  Consultants’ Investment Committee, which oversees nearly
                  $3.1B in AUM/AUA. He was approached by Zach in May 2017 to
                  help fund the early stages of Slate Robotics, and he has been
                  an unwaivering proponent of the vision of the company and of
                  the company itself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
