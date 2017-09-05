var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row hidden-sm hidden-xs" style={{
            height:"800px",
            color:"#fff",
            backgroundImage:"url('/img/slate-tr1-5')",
            backgroundSize:"cover",
            backgroundPosition: "left top",
          }}>
          <div className="col-xs-12" style={{backgroundColor:"rgba(34,34,34,0.6)"}}>
            <h1 style={{fontSize:"72px"}}>Kinect 2.0</h1>
            <h3>Integrated Vision System</h3>
          </div>
        </div>
        <div className="row hidden-lg hidden-md" style={{
            height:"350px",
            color:"#fff",
            backgroundImage:"url('/img/slate-tr1-5')",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition: "42% 45px",
            backgroundColor:"#222",
          }}>
          <div className="col-xs-12" style={{backgroundColor:"rgba(34,34,34,0.6)"}}>
            <h1 style={{fontSize:"28px"}}>Kinect 2.0</h1>
            <h3>Integrated Vision System</h3>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
