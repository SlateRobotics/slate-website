var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row hidden-sm hidden-xs" style={{
            height:"800px",
            color:"#fff",
            backgroundImage:"url('/img/slate-tr1-3')",
            backgroundSize:"cover",
            backgroundPosition: "left top",
          }}>
          <div className="col-xs-12" style={{backgroundColor:"rgba(34,34,34,0.6)"}}>
            <h1 style={{fontSize:"72px"}}>Omni-drive Base</h1>
            <div className="col-lg-8 col-md-10 col-centered" style={{fontSize:"22px"}}>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>3</div>
                <div>Degrees of Freedom</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>6Nm</div>
                <div>Torque</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>75W</div>
                <div>Power</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row hidden-lg hidden-md" style={{
            height:"500px",
            color:"#fff",
            backgroundImage:"url('/img/slate-tr1-3')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
          <div className="col-xs-12" style={{backgroundColor:"rgba(34,34,34,0.6)"}}>
            <h1 style={{fontSize:"28px"}}>Omni-drive Base</h1>
            <div className="col-xs-12 col-centered" style={{fontSize:"22px"}}>
              <div className="col-xs-4">
                <div style={{height:"55px",fontSize:"40px"}}>3</div>
                <div>DOF</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"55px",fontSize:"40px"}}>6</div>
                <div>N-m Torque</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"55px",fontSize:"40px"}}>75</div>
                <div>Watts Power</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
