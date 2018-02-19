var React = require('react');

var Style = require('./Style.jsx');
var MenuListItem = require('./MenuListItem.jsx');
var MenuListItemButton = require('./MenuListItemButton.jsx');

var Menu = React.createClass({
	render: function () {
		return (
  		<ul id="menu" style={Style.menu}>
				<MenuListItem label={"TR1"} to={"/tr1"} farRight={false} />
				<MenuListItem label={"3D Printing"} to={"/printing"} farRight={false} />
				<MenuListItem label={"Support"} to={"/support"} farRight={true} />
  		</ul>
		);
	},
});

module.exports = Menu;
