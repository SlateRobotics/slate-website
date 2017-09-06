var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12" style={{backgroundColor:"#222",color:"#fff"}}>
          <h1>Kinect 2.0</h1>
          <h2>Integrated Vision System</h2>
        </div>
        <div className="col-xs-12" style={{padding:"0px"}}>
          <img style={{width:"100%"}} src="/img/slate-tr1-5" />
        </div>
      </div>
    );
  },
});

module.exports = Component;
