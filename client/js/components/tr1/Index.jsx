var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" className="hidden-xs" style={Style.menu}>
          <span style={{fontSize:"24px"}}>TR1</span>
          {" ― "}
          <span style={{color:"#666",cursor:"default"}}>Overview</span>
          {" | "}
          <Link to="/tr1/specs">Specs</Link>
          {" | "}
          <Link to="/shop/tr1">Pre-order</Link>
        </div>
        <div className="row" className="hidden-lg hidden-md hidden-sm" style={Style.menuMobile}>
          <span style={{color:"#666",cursor:"default"}}>Overview</span>
          {" | "}
          <Link to="/tr1/specs">Specs</Link>
          {" | "}
          <Link to="/shop/tr1">Pre-order</Link>
        </div>
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
          <div className="col-md-6 col-xs-12" style={{
              height:"800px",
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
        <div className="row" style={{
            height:"800px",
            color:"#222",
            backgroundImage:"url('/img/slate-tr1-2')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
          <div className="col-xs-12" style={{backgroundColor:"rgba(255,255,255,0.6)"}}>
            <h1 style={{fontSize:"72px"}}>Full-featured Arms</h1>
            <div className="col-lg-8 col-sm-10 hidden-xs col-centered" style={{fontSize:"22px"}}>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>7</div>
                <div>Degrees of Freedom</div>
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
            <div className="hidden-lg hidden-md hidden-sm col-xs-12 col-centered" style={{fontSize:"18px"}}>
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
        <div className="row" style={{
            height:"800px",
            color:"#fff",
            backgroundImage:"url('/img/slate-tr1-3')",
            backgroundSize:"cover",
            backgroundPosition: "left top",
          }}>
          <div className="col-xs-12" style={{backgroundColor:"rgba(34,34,34,0.6)"}}>
            <h1 style={{fontSize:"72px"}}>Omni-drive Base</h1>
            <div className="col-lg-8 col-sm-10 hidden-xs col-centered" style={{fontSize:"22px"}}>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>3</div>
                <div>Degrees of Freedom</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>6Nm</div>
                <div>Torque</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>75W</div>
                <div>Power</div>
              </div>
            </div>
            <div className="hidden-lg hidden-md hidden-sm col-xs-12 col-centered" style={{fontSize:"18px"}}>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>3</div>
                <div>Degrees of Freedom</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>6</div>
                <div>N-m of Torque</div>
              </div>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>75</div>
                <div>Watts of Power</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{
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
            <div className="hidden-lg hidden-md hidden-sm col-xs-12 col-centered" style={{fontSize:"18px"}}>
              <div className="col-xs-4">
                <div style={{height:"80px",fontSize:"60px"}}>12</div>
                <div>Inches Extension</div>
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
        <div className="row" style={{
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
        <div className="row" style={{
            paddingTop:"50px",
            paddingBottom:"50px",
          }}>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <img
              src="https://d30y9cdsu7xlg0.cloudfront.net/png/636353-200.png"
              style={{height:"150px"}} />
            <h3>NVIDIA Jetson embedded development system</h3>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <img
              src="https://image.flaticon.com/icons/svg/81/81270.svg"
              style={{height:"150px"}} />
            <h3>Ubuntu 14.04 pre-installed</h3>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <img
              src="https://image.flaticon.com/icons/svg/53/53096.svg"
              style={{height:"150px"}} />
            <h3>8 to 12 hour battery life</h3>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <img
              src="https://i.stack.imgur.com/zUdvS.png"
              style={{height:"150px"}} />
            <h3>Wifi + Bluetooth + Ethernet connectivity</h3>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
