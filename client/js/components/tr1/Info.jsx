var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row" style={{marginTop:"34px"}}>
        <div className="hidden-lg hidden-md col-xs-12" style={{
            backgroundColor:"#45415E",
            color:"#fff",
          }}>
          <h1 style={{fontSize:"95px"}}>
            Slate TR1
          </h1>
          <h4 style={{fontSize:"32px"}}>
            The first, human-sized robot for hackers
          </h4>
        </div>
        <div className="col-md-6 hidden-md hidden-xs" style={{
            height:"800px",
            backgroundImage:"url('/img/slate-tr1-1')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
        </div>
        <div className="hidden-lg hidden-md col-xs-12" style={{
            height:"400px",
            backgroundImage:"url('/img/slate-tr1-1')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
        </div>
        <div className="col-md-6 hidden-sm hidden-xs" style={{
            height:"800px",
            backgroundColor:"#45415E",
            color:"#fff",
            paddingTop:"250px",
          }}>
          <h1 style={{fontSize:"95px"}}>
            Slate TR1
          </h1>
          <h4 style={{fontSize:"32px"}}>
            The first, human-sized robot for hackers
          </h4>
        </div>
      </div>
    );
  },
});

module.exports = Component;
