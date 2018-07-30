var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var MenuButton = require('./MenuButton.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "TR1 - Technical Specifications - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div>
          <div className="row hidden-xs" style={Style.menu}>
            <div className="col-lg-10 col-xs-12 col-centered">
              <div style={{float:"left"}}>
                <span style={{lineHeight:"34px"}}>Slate TR1</span>
              </div>
              <div style={{float:"right",fontSize:"14px"}}>
                <Link to="/tr1" style={{lineHeight:"34px",color:"#222"}}>Overview</Link>
                <span style={{marginLeft:"25px"}} />
                <span style={{color:"#666",cursor:"default",lineHeight:"34px"}}>Specs</span>
                <span style={{marginLeft:"25px"}} />
                <MenuButton to="/shop/tr1" label="Buy" />
              </div>
            </div>
          </div>
          <div className="row hidden-lg hidden-md hidden-sm" style={Style.menuMobile}>
            <div className="col-xs-12">
              <div style={{float:"left"}}>
                <span style={{lineHeight:"34px"}}>TR1</span>
              </div>
              <div style={{float:"right",fontSize:"14px"}}>
                <Link to="/tr1" style={{lineHeight:"34px",color:"#222"}}>Overview</Link>
                <span style={{marginLeft:"25px"}} />
                <MenuButton to="/shop/tr1" label="Buy" />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop:"34px",textAlign:"left"}}>
          <div className="col-lg-10 col-xs-12 col-centered">
            <h1 style={{paddingTop:"50px"}}>Slate TR1 Technical Specifications</h1>
          </div>
        </div>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-lg-10 col-xs-12 col-centered">
            <div className="row" style={{paddingTop:"15px",paddingBottom:"30px",borderBottom:"1px solid #90B2BB"}}>
              <div className="col-xs-12" style={{marginBottom:"15px",borderBottom:"3px solid #ccc"}}>
                <h3>Arm Specifications</h3>
              </div>
              <div className="col-xs-12">
                <img style={{maxWidth:"100%"}} src="/img/slate-tr1-arm-spec" />
              </div>
              <div className="col-xs-12" style={{backgroundColor:"#f1f1f1",padding:"15px",border:"1px solid #ccc",borderRadius:"15px"}}>
                <div className="row" style={{padding:"15px"}}>
                  <h4>Additional Statistics:</h4>
                  <div>Degrees of Freedom: 7</div>
                  <div>Assembly Weight: 8 kilograms</div>
                  <div>Maximum Payload: 1.8 kilograms</div>
                  <div>Maximum Operating Distance Range: 1 meter</div>
                  <div>Maximum Gripper Width: 100 millimeters</div>
                  <div>Angle Feedback Resolution: 1024 pulses per revolution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
