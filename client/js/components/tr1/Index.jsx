var React = require('react');
var Style = require('./Style.jsx');
var Menu = require('./Menu.jsx');
var Info = require('./Info.jsx');
var Detail1 = require('./Detail1.jsx');
var Detail2 = require('./Detail2.jsx');
var Detail3 = require('./Detail3.jsx');
var Detail4 = require('./Detail4.jsx');
var Detail5 = require('./Detail5.jsx');
var BottomMenu = require('./BottomMenu.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "TR1 - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <Menu />
        <Info />
        <Detail1 />
        <Detail2 />
        <Detail3 />
        <Detail4 />
        <Detail5 />
        <BottomMenu />
      </div>
    );
  },
});

module.exports = Component;
