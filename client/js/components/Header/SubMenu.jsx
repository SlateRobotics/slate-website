var React = require('react');
var Style = require('./Style.jsx');
var MenuNavButton = require('./MenuNavButton.jsx');
var SubMenuListItem = require('./SubMenuListItem.jsx');
var UserStore = require('../../stores').user;

var SubMenu = React.createClass({
	getInitialState: function () {
		return {
			user: ''
		}
	},

	componentWillMount: function () {
		UserStore.addChangeListener(this.handleChange_UserStore);
	},

	componentWillUnmount: function () {
		UserStore.removeChangeListener(this.handleChange_UserStore);
	},

	render: function () {
		if (this.state.user) {
			return (
	  		<ul id="menu-sub" style={Style.subMenu} className="hidden-lg hidden-md hidden-sm">
		  		<SubMenuListItem label={"TR1"} to={"/tr1"} onClick={this.handleClick_SubMenuListItem} />
			  	<SubMenuListItem label={"Blog"} to={"/blog"} onClick={this.handleClick_SubMenuListItem} />
			  	<SubMenuListItem label={"Sign Out"} to={"/sign-out"} onClick={this.handleClick_SubMenuListItem} />
			  	{/*<SubMenuListItem label={"Support"} to="/support" onClick={this.handleClick_SubMenuListItem} />*/}
	  		</ul>
			);
		}

		return (
  		<ul id="menu-sub" style={Style.subMenu} className="hidden-lg hidden-md hidden-sm">
	  		<SubMenuListItem label={"TR1"} to={"/tr1"} onClick={this.handleClick_SubMenuListItem} />
		  	<SubMenuListItem label={"Blog"} to={"/blog"} onClick={this.handleClick_SubMenuListItem} />
		  	<SubMenuListItem label={"Sign In"} to={"/sign-in"} onClick={this.handleClick_SubMenuListItem} />
		  	{/*<SubMenuListItem label={"Support"} to="/support" onClick={this.handleClick_SubMenuListItem} />*/}
  		</ul>
		);
	},

	handleChange_UserStore: function () {
		var users = UserStore.find();
		if (users.length > 0) {
			var state = this.state;
			state.user = users[0];
			this.setState(state);
		}
	},

	handleClick_SubMenuListItem: function () {
		if (this.props.onChange) {
			this.props.onChange();
		}
	},
});

module.exports = SubMenu;
