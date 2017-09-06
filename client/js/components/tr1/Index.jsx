var React = require('react');
var Style = require('./Style.jsx');
var Menu = require('./Menu.jsx');
var Info = require('./Info.jsx');
var Arms = require('./Arms.jsx');
var Base = require('./Base.jsx');
var Torso = require('./Torso.jsx');
var Kinect = require('./Kinect.jsx');
var OtherDetails = require('./Other.jsx');
var BottomMenu = require('./BottomMenu.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <Menu />
        <Info />
        <Arms />
        <Base />
        <Torso />
        <Kinect />
        <OtherDetails />
        <BottomMenu />
      </div>
    );
  },
});

module.exports = Component;
