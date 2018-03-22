var React = require('react');

var Style = require('./Style.jsx');
var MenuNavButton = require('./MenuNavButton.jsx');
var SubMenuListItem = require('./SubMenuListItem.jsx');

var SubMenu = React.createClass({
	render: function () {
		return (
  		<ul id="menu-sub" style={Style.subMenu} className="hidden-lg hidden-md hidden-sm">
	  		<SubMenuListItem label={"TR1"} to={"/tr1"} onClick={this.handleClick_SubMenuListItem} />
		  	{/*<SubMenuListItem label={"Support"} to="/support" onClick={this.handleClick_SubMenuListItem} />*/}
  		</ul>
		);
	},

	handleClick_SubMenuListItem: function () {
		if (this.props.onChange) {
			this.props.onChange();
		}
	},
});

module.exports = SubMenu;
