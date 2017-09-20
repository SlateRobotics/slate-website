var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var MenuButton = require('./MenuButton.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row" style={{
          marginTop:"34px",
          textAlign:"left",
          backgroundColor:"#222",
          color:"#fff",
        }}>
        <div className="hidden-lg hidden-md col-xs-12">
          <h1 style={{fontSize:"95px"}}>
            Slate TR1
          </h1>
          <h4 style={{fontSize:"32px"}}>
            A human-sized robot for hackers
          </h4>
        </div>
        <div className="col-md-6 hidden-sm hidden-xs" style={{
            height:"800px",
            backgroundImage:"url('/img/slate-tr1-1')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
        </div>
        <div className="hidden-lg hidden-md col-xs-12" style={{
            backgroundColor:"#222",
            overflow:"hidden",
            height:"500px",
            position:"relative",
          }}>
          <img src="/img/slate-tr1-1" style={{
              height:"500px",
              position:"absolute",
              top: "-9999px",
              bottom: "-9999px",
              left: "-9999px",
              right: "-9999px",
              margin: "auto",
            }} />
        </div>
        <div className="col-md-6 hidden-sm hidden-xs" style={{
            height:"800px",
            paddingTop:"125px",
            backgroundColor:"#222",
            color:"#fff",
          }}>
          <h1 style={{fontSize:"95px"}}>
            Slate TR1
          </h1>
          <h4 style={{fontSize:"32px"}}>
            A human-sized robot for hackers
          </h4>
          <div style={{padding:"15px 0px"}}>
            <ul>
              <li>Two, 7-axis arms</li>
              <li>Omni-drive mobile base</li>
              <li>3-axis head w/ Kinect 2.0</li>
              <li>NVIDIA Jetson embedded development system</li>
              <li>ROS Compatable & Pre-installed</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },

  handleClick_Buy: function () {
    BrowserHistory.push("/shop/tr1");
  },
});

module.exports = Component;
