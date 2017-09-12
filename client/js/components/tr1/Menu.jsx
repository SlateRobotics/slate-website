var React = require('react');
var Style = require('./Style.jsx');
var Link = require('react-router').Link;
var MenuButton = require('./MenuButton.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row hidden-xs" style={Style.menu}>
          <div className="col-lg-10 col-xs-12 col-centered">
            <div style={{float:"left"}}>
              <span style={{lineHeight:"34px"}}>Slate TR1</span>
            </div>
            <div style={{float:"right"}}>
              <span style={{color:"#666",cursor:"default",lineHeight:"34px"}}>Overview</span>
              <span style={{marginLeft:"25px"}} />
              <Link to="/tr1/specs" style={{lineHeight:"34px",color:"#222"}}>Specs</Link>
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
            <div style={{float:"right"}}>
              <Link to="/tr1/specs" style={{lineHeight:"34px",color:"#222"}}>Specs</Link>
              <span style={{marginLeft:"25px"}} />
              <MenuButton to="/shop/tr1" label="Buy" />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
