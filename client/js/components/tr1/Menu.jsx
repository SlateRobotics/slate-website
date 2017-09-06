var React = require('react');
var Style = require('./Style.jsx');
var Link = require('react-router').Link;

var Component = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row" className="hidden-xs" style={Style.menu}>
          <span style={{fontSize:"24px"}}>TR1</span>
          {" ― "}
          <span style={{color:"#666",cursor:"default"}}>Overview</span>
          {" | "}
          <Link to="/tr1/specs">Specs</Link>
          {" | "}
          <Link to="/shop/tr1">Buy</Link>
        </div>
        <div className="row" className="hidden-lg hidden-md hidden-sm" style={Style.menuMobile}>
          <span style={{color:"#666",cursor:"default"}}>Overview</span>
          {" | "}
          <Link to="/tr1/specs">Specs</Link>
          {" | "}
          <Link to="/shop/tr1">Buy</Link>
        </div>
      </div>
    );
  },
});

module.exports = Component;
