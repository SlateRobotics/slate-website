var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var MenuButton = require('./MenuButton.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "TR2 - Technical Specifications - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div>
          <div className="row hidden-xs" style={Style.menu}>
            <div className="col-lg-10 col-xs-12 col-centered">
              <div style={{float:"left"}}>
                <span style={{lineHeight:"34px"}}>Slate TR2</span>
              </div>
              <div style={{float:"right",fontSize:"14px"}}>
                <Link to="/tr2" style={{lineHeight:"34px",color:"#222"}}>Overview</Link>
                <span style={{marginLeft:"25px"}} />
                <span style={{color:"#666",cursor:"default",lineHeight:"34px"}}>Specs</span>
                <span style={{marginLeft:"25px"}} />
                <MenuButton to="/shop/tr2" label="Buy" />
              </div>
            </div>
          </div>
          <div className="row hidden-lg hidden-md hidden-sm" style={Style.menuMobile}>
            <div className="col-xs-12">
              <div style={{float:"left"}}>
                <span style={{lineHeight:"34px"}}>TR2</span>
              </div>
              <div style={{float:"right",fontSize:"14px"}}>
                <Link to="/tr2" style={{lineHeight:"34px",color:"#222"}}>Overview</Link>
                <span style={{marginLeft:"25px"}} />
                <MenuButton to="/shop/tr2" label="Buy" />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop:"34px",textAlign:"left"}}>
          <div className="col-lg-10 col-xs-12 col-centered">
            <h1 style={{paddingTop:"50px"}}>Slate TR2 Technical Specifications</h1>
          </div>
        </div>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-lg-10 col-xs-12 col-centered">
            <div className="row" style={{paddingTop:"15px",paddingBottom:"30px"}}>
              <div className="col-xs-12" style={{marginBottom:"15px",borderBottom:"3px solid #ccc"}}>
                <h3>Main Specifications</h3>
              </div>
            </div>
            <div className="row" style={{marginBottom:"5px"}}>
              <div className="col-md-6 col-xs-12">
                <div style={{backgroundColor:"#f1f1f1",padding:"15px",border:"1px solid #ccc",borderRadius:"15px",margin:"5px"}}>
                  <h3>TR2</h3>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Weight</b></div>
                    <div className="col-md-6 col-xs-6">34kg (75 lbs)</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Height</b></div>
                    <div className="col-md-6 col-xs-6">1.2m (3.9ft)</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Base footprint</b></div>
                    <div className="col-md-6 col-xs-6">500x500mm (20x20in)</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Max speed</b></div>
                    <div className="col-md-6 col-xs-6">100mm/s (4in/s)</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Environment</b></div>
                    <div className="col-md-6 col-xs-6">Indoors</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xs-12">
                <div style={{backgroundColor:"#f1f1f1",padding:"15px",border:"1px solid #ccc",borderRadius:"15px",margin:"5px"}}>
                  <h3>Computer</h3>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Processor</b></div>
                    <div className="col-md-6 col-xs-6">NVIDIA Jetson TX1, TX2</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>RAM</b></div>
                    <div className="col-md-6 col-xs-6">4GB, 8GB</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Hard Drive</b></div>
                    <div className="col-md-6 col-xs-6">16GB, 32GB</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Wireless</b></div>
                    <div className="col-md-6 col-xs-6">802.11a/b/g/n/ac 2×2 867Mbps WiFi</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div style={{backgroundColor:"#f1f1f1",padding:"15px",border:"1px solid #ccc",borderRadius:"15px",margin:"5px"}}>
                  <h3>Sensors</h3>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>3D RGB-D</b></div>
                    <div className="col-md-6 col-xs-6">Orbbec Astra</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xs-12">
                <div style={{backgroundColor:"#f1f1f1",padding:"15px",border:"1px solid #ccc",borderRadius:"15px",margin:"5px"}}>
                  <h3>Extensibility</h3>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Video port</b></div>
                    <div className="col-md-6 col-xs-6">HDMI port</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Busses</b></div>
                    <div className="col-md-6 col-xs-6">2x I2C Bus</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Other ports</b></div>
                    <div className="col-md-6 col-xs-6">3x USB, 1x Ethernet</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{paddingTop:"15px",paddingBottom:"30px"}}>
              <div className="col-xs-12" style={{marginBottom:"15px",borderBottom:"3px solid #ccc"}}>
                <h3>Arm Specifications</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <img style={{maxWidth:"100%"}} src="/img/slate-tr2-2" />
              </div>
              <div className="col-md-6 col-xs-12">
                <div style={{backgroundColor:"#f1f1f1",padding:"15px",border:"1px solid #ccc",borderRadius:"15px",margin:"5px"}}>
                  <h3>7-DOF Arm</h3>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Assembly Weight</b></div>
                    <div className="col-md-6 col-xs-6">8kg (17.6lbs)</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Maximum Payload</b></div>
                    <div className="col-md-6 col-xs-6">2kg (4.4lbs)</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Maximum Operating Distance Range</b></div>
                    <div className="col-md-6 col-xs-6">850mm (33.5in)</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Maximum Gripper Width</b></div>
                    <div className="col-md-6 col-xs-6">100mm (4in)</div>
                  </div>
                  <div className="row" style={{padding:"5px"}}>
                    <div className="col-md-6 col-xs-6"><b>Angle Feedback Resolution</b></div>
                    <div className="col-md-6 col-xs-6">3060 pulses per revolution</div>
                  </div>
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
