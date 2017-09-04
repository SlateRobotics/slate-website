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
          <Link to="/tr1">Overview</Link>
          {" | "}
          <span style={{color:"#666",cursor:"default"}}>Specs</span>
          {" | "}
          <Link to="/shop/tr1">Pre-order</Link>
        </div>
        <div className="row" className="hidden-lg hidden-md hidden-sm" style={Style.menuMobile}>
          <Link to="/tr1">Overview</Link>
          {" | "}
          <span style={{color:"#666",cursor:"default"}}>Specs</span>
          {" | "}
          <Link to="/shop/tr1">Pre-order</Link>
        </div>
        <div className="row" style={{marginTop:"34px"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <h1 style={{padding:"50px 0px"}}>Technical Specifications</h1>
          </div>
        </div>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row" style={{paddingTop:"15px",paddingBottom:"30px",borderBottom:"1px solid #90B2BB"}}>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <h3>Arms</h3>
              </div>
              <div className="col-md-10 col-sm-6 col-xs-12">
                <div style={{paddingTop:"18px"}}>Details</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row" style={{paddingTop:"15px",paddingBottom:"30px",borderBottom:"1px solid #90B2BB"}}>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <h3>Body</h3>
              </div>
              <div className="col-md-10 col-sm-6 col-xs-12">
                <div style={{paddingTop:"18px"}}>Details</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row" style={{paddingTop:"15px",paddingBottom:"30px",borderBottom:"1px solid #90B2BB"}}>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <h3>Sensors</h3>
              </div>
              <div className="col-md-10 col-sm-6 col-xs-12">
                <div style={{paddingTop:"18px"}}>Details</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row" style={{paddingTop:"15px",paddingBottom:"30px"}}>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <h3>Computing</h3>
              </div>
              <div className="col-md-10 col-sm-6 col-xs-12">
                <div style={{paddingTop:"18px"}}>Details</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
