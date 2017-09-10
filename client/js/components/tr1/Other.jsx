var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row" style={{
          paddingTop:"50px",
          paddingBottom:"35px",
        }}>
        <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
          <div className="row hidden-sm hidden-xs">
            <div className="col-md-3" style={{paddingBottom:"15px"}}>
              <img
                src="/img/icon-gpu"
                style={{height:"125px",width:"125px"}} />
              <h4>NVIDIA Jetson embedded development system</h4>
            </div>
            <div className="col-md-3" style={{paddingBottom:"15px"}}>
              <img
                src="/img/icon-ubuntu"
                style={{height:"125px",width:"125px"}} />
              <h4>Ubuntu 14.04 pre-installed</h4>
            </div>
            <div className="col-md-3" style={{paddingBottom:"15px"}}>
              <img
                src="/img/icon-battery"
                style={{height:"125px",width:"125px"}} />
              <h4>8 to 12 hour battery life</h4>
            </div>
            <div className="col-md-3" style={{paddingBottom:"15px"}}>
              <img
                src="/img/icon-wifi"
                style={{height:"95px",width:"125px",margin:"15px 0px"}} />
              <h4>Wifi + Bluetooth + Ethernet connectivity</h4>
            </div>
          </div>
          <div className="row hidden-lg hidden-md">
            <div className="col-xs-6" style={{paddingBottom:"15px"}}>
              <img
                src="/img/icon-gpu"
                style={{height:"125px",width:"125px"}} />
              <h4>NVIDIA Jetson embedded development system</h4>
            </div>
            <div className="col-xs-6" style={{paddingBottom:"15px"}}>
              <img
                src="/img/icon-ubuntu"
                style={{height:"125px",width:"125px"}} />
              <h4>Ubuntu 14.04 pre-installed</h4>
            </div>
          </div>
          <div className="row hidden-lg hidden-md">
            <div className="col-xs-6" style={{paddingBottom:"15px"}}>
              <img
                src="/img/icon-battery"
                style={{height:"125px",width:"125px"}} />
              <h4>8 to 12 hour battery life</h4>
            </div>
            <div className="col-xs-6" style={{paddingBottom:"15px"}}>
              <img
                src="/img/icon-wifi"
                style={{height:"95px",width:"125px",margin:"15px 0px"}} />
              <h4>Wifi + Bluetooth + Ethernet connectivity</h4>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
