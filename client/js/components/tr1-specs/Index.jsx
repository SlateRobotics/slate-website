var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var BottomMenu = require('./BottomMenu.jsx');

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
          <Link to="/shop/tr1">Buy</Link>
        </div>
        <div className="row" className="hidden-lg hidden-md hidden-sm" style={Style.menuMobile}>
          <Link to="/tr1">Overview</Link>
          {" | "}
          <span style={{color:"#666",cursor:"default"}}>Specs</span>
          {" | "}
          <Link to="/shop/tr1">Buy</Link>
        </div>
        <div className="row" style={{marginTop:"34px"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <h1 style={{padding:"50px 0px"}}>Technical Specifications</h1>
          </div>
        </div>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row" style={{paddingTop:"15px",paddingBottom:"30px",borderBottom:"1px solid #90B2BB"}}>
              <div className="col-xs-12" style={{paddingBottom:"15px"}}>
                <h3>Arms</h3>
              </div>
              <div className="col-md-6 col-xs-12">
                <img style={{width:"100%"}} src="/img/slate-tr1-specs-1" />
              </div>
              <div className="col-md-6 col-xs-12">
                <div className="row" style={{paddingBottom:"10px"}}>
                  <div className="col-sm-4 col-xs-6">
                    <b>15 lbs</b>
                  </div>
                  <div className="col-sm-8 col-xs-6">
                    Assembly Weight
                  </div>
                </div>
                <div className="row" style={{paddingTop:"10px",paddingBottom:"10px"}}>
                  <div className="col-sm-4 col-xs-6">
                    <b>7</b>
                  </div>
                  <div className="col-sm-8 col-xs-6">
                    Degrees of Freedom
                  </div>
                </div>
                <div className="row" style={{paddingTop:"10px",paddingBottom:"10px"}}>
                  <div className="col-sm-4 col-xs-6">
                    <b>4 in</b>
                  </div>
                  <div className="col-sm-8 col-xs-6">
                    Maximum Gripper Width
                  </div>
                </div>
                <div className="row" style={{paddingTop:"10px",paddingBottom:"10px"}}>
                  <div className="col-sm-4 col-xs-6">
                    <b>3.3 ft</b>
                  </div>
                  <div className="col-sm-8 col-xs-6">
                    Maximum Operating Distance Range
                  </div>
                </div>
                <div className="row" style={{paddingTop:"10px",paddingBottom:"10px"}}>
                  <div className="col-sm-4 col-xs-6">
                    <b>10 lbs</b>
                  </div>
                  <div className="col-sm-8 col-xs-6">
                    Maximum Payload
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row" style={{paddingTop:"15px",paddingBottom:"30px"}}>
              <div className="col-xs-12" style={{paddingBottom:"15px"}}>
                <h3>Body</h3>
              </div>
              <div className="col-md-6 col-xs-12">
                <img style={{width:"100%"}} src="/img/slate-tr1-specs-2" />
              </div>
              <div className="col-md-6 col-xs-12">
                <div className="row" style={{paddingBottom:"10px"}}>
                  <div className="col-sm-4 col-xs-6">
                    <b>35 lbs</b>
                  </div>
                  <div className="col-sm-8 col-xs-6">
                    Assembly Weight
                  </div>
                </div>
                <div className="row" style={{paddingTop:"10px",paddingBottom:"10px"}}>
                  <div className="col-sm-4 col-xs-6">
                    <b>5.1 ft</b>
                  </div>
                  <div className="col-sm-8 col-xs-6">
                    Maximum Height
                  </div>
                </div>
                <div className="row" style={{paddingTop:"10px",paddingBottom:"10px"}}>
                  <div className="col-sm-4 col-xs-6">
                    <b>4.1 ft</b>
                  </div>
                  <div className="col-sm-8 col-xs-6">
                    Minimum Height
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomMenu />
      </div>
    );
  },
});

module.exports = Component;
