var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');
var Menu = require('./Menu.jsx');
var MenuNavButton = require('./MenuNavButton.jsx');
var SubMenu = require('./SubMenu.jsx');

var Header = React.createClass({
	render: function () {
		return (
			<div className="container-fluid" style={Style.headerContainer}>
				<div className="row hidden-xs" style={Style.navigation}>
					<div className="col-lg-10 col-xs-12 col-centered">
						<Link to="/" style={{
								height:"44px",
								display:"inline-block",
								float:"left",
							}}>
							<img
								style={Style.logo}
								src="/img/logo-icon"
								onClick={this.handleClick_Logo} />
						</Link>
						<div style={{
								float:"left",
								paddingLeft:"10px",
								display:"inline-block",
								lineHeight:"44px",
							}}>
							<Link to="/" style={Style.title}>
								Slate Robotics
							</Link>
						</div>
						<div style={Style.menuContainer}>
							<Menu />
						</div>
					</div>
				</div>
				<div className="row" style={Style.navigationMobile}>
					<div className="col-xs-12 col-centered">
						<Link to="/" style={{
								height:"44px",
								display:"inline-block",
								float:"left",
							}}>
							<img
								style={Style.logo}
								src="/img/logo-icon"
								onClick={this.handleClick_Logo} />
						</Link>
						<div style={{
								float:"left",
								paddingLeft:"10px",
								display:"inline-block",
								lineHeight:"44px",
							}}>
							<Link to="/" style={Style.titleMobile}>
								<span>
									Slate Robotics
								</span>
							</Link>
						</div>
						<div style={{
						    height:"44px",
								position:"absolute",
								top:"0",
								right:"0",
							}}>
							<MenuNavButton />
						</div>
					</div>
				</div>
				<SubMenu />
			</div>
		);
	},
});

module.exports = Header;
