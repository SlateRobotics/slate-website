var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var UserStore = require('../../stores').user;

var Footer = React.createClass({
	getInitialState: function () {
		return {
			user: ''
		}
	},
  componentDidMount: function () {
    $("#label-email-b950c68a-3845-476b-8a68-0b660e83f906").css("color","white");

    UserStore.getMe(function (me) {
      var state = this.state;
      state.user = me;
      this.setState(state);
    }.bind(this));
  },

  render: function() {
    var today = new Date(Date.now());
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{marginTop:"15px"}}>
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
                <div style={{marginTop:"10px"}} />
                <h3>Other</h3>
                <a href="https://teespring.com/stores/slate-robotics" style={Style.link}>T-Shirts</a>
              </div>
      				<div className="col-md-3 col-sm-6 col-xs-12">
                <h3>COMPANY</h3>
                <Link to="/about" style={Style.link}>About Us</Link>
                <Link to="/questions" style={Style.link}>Q&A</Link>
                <Link to="/careers" style={Style.link}>Careers</Link>
                <Link to="/blog" style={Style.link}>Blog</Link>
                <Link to="/privacy-policy" style={Style.link}>Privacy Policy</Link>
                <Link to="/terms-and-conditions" style={Style.link}>Terms & Conditions</Link>
                <Link to="/sales-policies" style={Style.link}>Sales Policies</Link>
              </div>
      				<div className="col-md-3 col-sm-6 col-xs-12">
                <h3>SOCIAL</h3>
                <a href="https://www.github.com/SlateRobotics/" style={Style.link}>Github</a>
                <a href="https://www.facebook.com/SlateRobotics/" style={Style.link}>Facebook</a>
                <a href="https://www.twitter.com/SlateRobotics/" style={Style.link}>Twitter</a>
                <a href="https://www.linkedin.com/company/24790837/" style={Style.link}>LinkedIn</a>
                <a href="https://www.instagram.com/SlateRobotics/" style={Style.link}>Instagram</a>
                <a href="https://www.youtube.com/channel/UC1xko_FNwN6H8PL3MLtJ1UQ" style={Style.link}>YouTube</a>
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
                <div>210 W Sunshine St., Suite C</div>
                <div>Springfield, MO 65807</div>
              </div>
            </div>
          </div>
        </div>
        {this.getAdminSection()}
        <div className="row" style={{marginTop:"25px", color:"white"}}>
  				<div className="col-md-10 col-xs-12 col-centered">
            <div className="row">
              <div className="col-xs-12" style={{textAlign:"left"}}>
                <h3>GET SLATE ROBOTICS UPDATES</h3>
                <p>Stay up to date with all product and company information via our email updates</p>
                <iframe
                  id="footer-email-form-iframe"
                  onLoad={this.handleLoad_iFrame}
                  srcDoc='<html><body><script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script><script>hbspt.forms.create({portalId:"4322786",formId:"b950c68a-3845-476b-8a68-0b660e83f906"});</script></body></html>'
                  style={{height:"215px",border:"none",width:"100%"}}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginBottom:"15px"}}>
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
  },

  getAdminSection: function () {
    if (this.state.user && this.state.user.isAdmin) {
      return (
        <div className="row" style={{marginTop:"25px"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-12">
                <h3>ADMIN</h3>
                <Link to="/admin/orders" style={Style.link}>Orders</Link>
                <Link to="/admin/reservations" style={Style.link}>Reservations</Link>
                <Link to="/admin/users" style={Style.link}>Users</Link>
                <Link to="/admin/inventory" style={Style.link}>Inventory</Link>
              </div>
            </div>
          </div>
        </div>
      )
    }
  },

  handleLoad_iFrame: function () {
    var emailFrameContents = $("#footer-email-form-iframe").contents();
    var hubspotFrameContents = emailFrameContents.find("#hs-form-iframe-0").contents();
    hubspotFrameContents.find("#label-email-b950c68a-3845-476b-8a68-0b660e83f906").css("display","none");
    hubspotFrameContents.find(".actions").css("padding","0");
    hubspotFrameContents.find(".hubspot-link__container").css("display","none");
  },
});

module.exports = Footer;
