var React = require('react');
var Style = require('./Style.jsx');
var MenuListItem = require('./MenuListItem.jsx');
var MenuListItemButton = require('./MenuListItemButton.jsx');
var UserStore = require('../../stores').user;

var Menu = React.createClass({
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
	  		<ul id="menu" style={Style.menu}>
					<MenuListItem label={"TR1"} to={"/tr1"} farRight={false} />
					<MenuListItem label={"Blog"} to={"/blog"} farRight={false} />
					<MenuListItem label={"Sign Out"} to={"/sign-out"} farRight={true} />
					{/*<MenuListItem label={"Support"} to={"/support"} farRight={true} />*/}
	  		</ul>
			)
		}

		return (
  		<ul id="menu" style={Style.menu}>
				<MenuListItem label={"TR1"} to={"/tr1"} farRight={false} />
				<MenuListItem label={"Blog"} to={"/blog"} farRight={false} />
				<MenuListItem label={"Sign In"} to={"/sign-in"} farRight={true} />
				{/*<MenuListItem label={"Support"} to={"/support"} farRight={true} />*/}
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
});

module.exports = Menu;
