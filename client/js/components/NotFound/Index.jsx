var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "404'd!! - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-6 col-xs-12 col-centered">
            <img src="/img/404.png" />
            <h1>This page doesn't exist!</h1>
            <h3>
              It is curious how you ended up on this page, but unfortunately,
              there isn't anything here! If you need some help, you can start
              a chat using the button in the bottom right corner. Good luck!
            </h3>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
