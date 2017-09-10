var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12" style={{backgroundColor:"#353c45",color:"#fff"}}>
          <h1>Full-featured Arms</h1>
          <div className="col-lg-6 col-md-8 col-sm-10 hidden-xs col-centered" style={{fontSize:"22px"}}>
            <div className="col-sm-4">
              <h2>7</h2>
              <div>DOF</div>
            </div>
            <div className="col-sm-4">
              <h2>10lb</h2>
              <div>Payload</div>
            </div>
            <div className="col-sm-4">
              <h2>3.3ft</h2>
              <div>Max Range</div>
            </div>
          </div>
        </div>
        <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{backgroundColor:"#2b4151",color:"#fff",paddingBottom:"15px"}}>
          <div className="row">
            <div className="col-xs-12">
              <div>7 DOF</div>
              <div>10lb Payload</div>
              <div>3.3ft Max Range</div>
            </div>
          </div>
        </div>
        <div className="col-xs-12" style={{padding:"0px"}}>
          <img style={{width:"100%"}} src="/img/slate-tr1-2" />
        </div>
      </div>
    );
  },
});

module.exports = Component;
