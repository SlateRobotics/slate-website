var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row" style={{
          paddingTop:"50px",
          paddingBottom:"35px",
        }}>
        <div className="col-md-3 col-sm-6 col-xs-12" style={{paddingBottom:"15px"}}>
          <img
            src="https://d30y9cdsu7xlg0.cloudfront.net/png/636353-200.png"
            style={{height:"150px"}} />
          <h3>NVIDIA Jetson embedded development system</h3>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12" style={{paddingBottom:"15px"}}>
          <img
            src="https://image.flaticon.com/icons/svg/81/81270.svg"
            style={{height:"150px"}} />
          <h3>Ubuntu 14.04 pre-installed</h3>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12" style={{paddingBottom:"15px"}}>
          <img
            src="https://image.flaticon.com/icons/svg/53/53096.svg"
            style={{height:"150px"}} />
          <h3>8 to 12 hour battery life</h3>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12" style={{paddingBottom:"15px"}}>
          <img
            src="https://i.stack.imgur.com/zUdvS.png"
            style={{height:"150px"}} />
          <h3>Wifi + Bluetooth + Ethernet connectivity</h3>
        </div>
      </div>
    );
  },
});

module.exports = Component;
