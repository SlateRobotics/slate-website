var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "TR1 - Technical Specifications - Slate Robotics";
    window.scrollTo(0,0);
    BrowserHistory.push("/tr2/specs");
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
      </div>
    );
  },
});

module.exports = Component;
