var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Footer = React.createClass({
  render: function() {
    var today = new Date(Date.now());
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{marginTop:"15px", fontFamily: "'Poiret One', cursive",}}>
  				<div className="col-md-10 col-xs-12 col-centered">
            <Link to="/">
              <img style={Style.logo} src="/img/icon-logo-white" onClick={this.handleClick_Logo} />
            </Link>
            <div style={{float:"left",padding:"0px 5px"}}>
              <Link to="/" style={Style.title}>{"Slate Robotics"}</Link>
              <span style={{display:"block",fontSize:"22px"}}>Human-sized robots for hackers</span>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop:"25px"}}>
  				<div className="col-md-10 col-xs-12 col-centered">
            <div className="row">
      				<div className="col-md-3 col-sm-6 col-xs-12">
                <h3>TR1</h3>
                <Link to="/tr1" style={Style.link}>Overview</Link>
                <Link to="/tr1/specs" style={Style.link}>Specs</Link>
                <Link to="/shop/tr1" style={Style.link}>Buy</Link>
                <Link to="/support" style={Style.link}>Support</Link>
              </div>
      				<div className="col-md-3 col-sm-6 col-xs-12">
                <h3>COMPANY</h3>
                <Link to="/about" style={Style.link}>About Us</Link>
                <a href="https://teespring.com/stores/slate-robotics" style={Style.link}>T-Shirts</a>
                <Link to="/privacy-policy" style={Style.link}>Privacy Policy</Link>
                <Link to="/terms-and-conditions" style={Style.link}>Terms & Conditions</Link>
              </div>
      				<div className="col-md-3 col-sm-6 col-xs-12">
                <h3>SOCIAL</h3>
                <a href="https://www.github.com/SlateRobotics/" style={Style.link}>Github</a>
                <a href="https://www.facebook.com/SlateRobotics/" style={Style.link}>Facebook</a>
                <a href="https://www.twitter.com/SlateRobotics/" style={Style.link}>Twitter</a>
                <a href="https://www.linkedin.com/company/24790837/" style={Style.link}>LinkedIn</a>
                <a href="https://www.instagram.com/SlateRobotics/" style={Style.link}>Instagram</a>
              </div>
      				<div className="col-md-3 col-sm-6 col-xs-12">
                <h3>CONTACT</h3>
                <div>
                  <a href="mailto:zach@slaterobots.com" style={Style.link}>
                    zach@slaterobots.com
                  </a>
                </div>
                <div>
                  <a href="tel:+14178493612" style={Style.link}>
                    (417) 849-3612
                  </a>
                </div>
                <br />
                <div>Slate Robotics, Inc.</div>
                <div>4826 W Stanford St.</div>
                <div>Springfield, MO 65802</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginBottom:"15px",marginTop:"45px"}}>
  				<div className="col-md-10 col-xs-12 col-centered">
  					<div>
              {"© " + today.getFullYear() + " Slate Robotics, Inc"}
              {" | zach@slaterobots.com"}
              {" | Springfield, MO"}
  					</div>
  				</div>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
