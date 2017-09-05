var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row hidden-sm hidden-xs" style={{
            height:"800px",
            color:"#222",
            backgroundImage:"url('/img/slate-tr1-4')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
          <div className="col-xs-12" style={{backgroundColor:"rgba(255,255,255,0.6)"}}>
            <h1 style={{fontSize:"72px"}}>Actuated Torso</h1>
            <div className="col-lg-8 col-sm-10 hidden-xs col-centered" style={{fontSize:"22px"}}>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>12in</div>
                <div>Extension</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>1.5</div>
                <div>Kilonewtons</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>2</div>
                <div>Limit Switches</div>
              </div>
            </div>
          </div>
        </div>
          <div className="row hidden-lg hidden-md" style={{
              height:"500px",
              color:"#222",
              backgroundImage:"url('/img/slate-tr1-4')",
              backgroundSize:"cover",
              backgroundPosition: "45.5% top",
            }}>
            <div className="col-xs-12" style={{backgroundColor:"rgba(255,255,255,0.6)"}}>
              <h1 style={{fontSize:"28px"}}>Actuated Torso</h1>
              <div className="col-xs-12 col-centered" style={{fontSize:"18px"}}>
                <div className="col-xs-4">
                  <div style={{height:"55px",fontSize:"40px"}}>12</div>
                  <div>Inches Extension</div>
                </div>
                <div className="col-xs-4">
                  <div style={{height:"55px",fontSize:"40px"}}>1.5</div>
                  <div>Kilo-newtons</div>
                </div>
                <div className="col-xs-4">
                  <div style={{height:"55px",fontSize:"40px"}}>2</div>
                  <div>Limit Switches</div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  },
});

module.exports = Component;
