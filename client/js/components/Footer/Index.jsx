var React = require('react');

var Style = require('./Style.jsx');
var ListItem = require('./ListItem.jsx');

var Footer = React.createClass({
  render: function() {
    var today = new Date(Date.now());
    return (
      <div style={Style.container} className="row-fluid">
				<div className="col-lg-8 col-xs-12 col-centered">
					<div>
            {"© " + today.getFullYear() + " Slate Robotics, Inc"}
            {" | zach@slaterobots.com"}
            {" | Springfield, MO"}
					</div>
			    <div style={{paddingTop:"10px"}}>
            {"\"There is no reason anyone would want a computer in their home.\""}
  				</div>
				</div>
      </div>
    );
  }
});

module.exports = Footer;
