var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12" style={{backgroundColor:"#fff"}}>
          <h1>Actuated Torso</h1>
          <div className="col-lg-8 col-sm-10 col-xs-12 col-centered" style={{fontSize:"22px"}}>
            <div className="col-xs-4">
              <h2>12in</h2>
              <div>Extension</div>
            </div>
            <div className="col-xs-4">
              <h2>1.5</h2>
              <div>Kilo newtons</div>
            </div>
            <div className="col-xs-4">
              <h2>Dual</h2>
              <div>Limit Switches</div>
            </div>
          </div>
        </div>
        <div className="col-xs-12" style={{padding:"0px"}}>
          <img style={{width:"100%"}} src="/img/slate-tr1-4" />
        </div>
      </div>
    );
  },
});

module.exports = Component;
