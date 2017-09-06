var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12" style={{backgroundColor:"#fff"}}>
          <h1>Full-featured Arms</h1>
          <div className="col-lg-8 col-md-10 col-xs-12 col-centered" style={{fontSize:"22px"}}>
            <div className="col-xs-4">
              <h2>7</h2>
              <div>DOF</div>
            </div>
            <div className="col-xs-4">
              <h2>10lb</h2>
              <div>Payload</div>
            </div>
            <div className="col-xs-4">
              <h2>3.3ft</h2>
              <div>Max Range</div>
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
