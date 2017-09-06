var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12" style={{backgroundColor:"#222",color:"#fff"}}>
          <h1>Omni-drive Base</h1>
          <div className="col-lg-8 col-md-10 hidden-xs col-centered" style={{fontSize:"22px"}}>
            <div className="col-sm-4">
              <h2>3</h2>
              <div>DOF</div>
            </div>
            <div className="col-sm-4">
              <h2>6Nm</h2>
              <div>Torque</div>
            </div>
            <div className="col-sm-4">
              <h2>75W</h2>
              <div>Power</div>
            </div>
          </div>
        </div>
        <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{backgroundColor:"#222",color:"#fff",paddingBottom:"15px"}}>
          <div className="row">
            <div className="col-xs-12">
              <div>3 DOF</div>
              <div>6Nm Torque</div>
              <div>75W Power</div>
            </div>
          </div>
        </div>
        <div className="col-xs-12" style={{padding:"0px"}}>
          <img style={{width:"100%"}} src="/img/slate-tr1-3" />
        </div>
      </div>
    );
  },
});

module.exports = Component;
