var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "TR1 - Slate Robotics";
    window.scrollTo(0,0);
    BrowserHistory.push("/tr2");
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
      </div>
    );
  },
});

module.exports = Component;
