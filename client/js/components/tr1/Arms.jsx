var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row hidden-sm hidden-xs" style={{
            height:"800px",
            color:"#222",
            backgroundImage:"url('/img/slate-tr1-2')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
          <div className="col-xs-12" style={{backgroundColor:"rgba(255,255,255,0.6)"}}>
            <h1 style={{fontSize:"72px"}}>Full-featured Arms</h1>
            <div className="col-lg-8 col-md-10 col-centered" style={{fontSize:"22px"}}>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>7</div>
                <div>DOF</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>10lb</div>
                <div>Payload</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>3.3ft</div>
                <div>Fully Exteneded</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row hidden-lg hidden-md" style={{
            height:"500px",
            color:"#222",
            backgroundImage:"url('/img/slate-tr1-2')",
            backgroundSize:"cover",
            backgroundPosition: "-100px top",
          }}>
          <div className="col-xs-12" style={{backgroundColor:"rgba(255,255,255,0.6)"}}>
            <h1 style={{fontSize:"28px"}}>Full-featured Arms</h1>
            <div className="col-xs-12 col-centered" style={{fontSize:"18px"}}>
              <div className="col-xs-4">
                <div style={{height:"55px",fontSize:"40px"}}>7</div>
                <div>Degrees of Freedom</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"55px",fontSize:"40px"}}>10</div>
                <div>Pound Payload</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"55px",fontSize:"40px"}}>3.3</div>
                <div>Feet Length</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
