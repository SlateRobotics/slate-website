var React = require('react');
var Style = require('./Style.jsx');
var Menu = require('./Menu.jsx');
var Info = require('./Info.jsx');
var InfoRibbon = require('./InfoRibbon.jsx');
var Detail1 = require('./Detail1.jsx');
var Detail2 = require('./Detail2.jsx');
var Detail3 = require('./Detail3.jsx');
var Detail4 = require('./Detail4.jsx');
var Detail5 = require('./Detail5.jsx');
var Detail6 = require('./Detail6.jsx');
var BottomMenu = require('./BottomMenu.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "TR2 - Slate Robotics";
    if(!window.location.hash) {
      window.scrollTo(0,0);
    }
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <Menu />
        <Info />
        <InfoRibbon />
        <Detail1 />
        <Detail2 />
        <Detail6 />
        <Detail3 />
        <Detail4 />
        <Detail5 />
      </div>
    );
  },
});

module.exports = Component;
