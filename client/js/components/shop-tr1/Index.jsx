var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{
            padding:"150px 0px"
          }}>
          <div className="col-xs-12">
            <h1 style={{fontSize:"64px"}}>
              Pre-orders opening soon
            </h1>
            <h4 style={{fontSize:"28px"}}>
              {"Follow us on "}
              <a href="https://www.facebook.com/SlateRobotics">Facebook</a>
              {", "}
              <a href="https://www.twitter.com/SlateRobotics">Twitter</a>
              {" or "}
              <a href="https://www.instagram.com/SlateRobotics">Instagram</a>
              {" to stay informed"}
            </h4>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
