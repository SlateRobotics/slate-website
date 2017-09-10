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
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Product Support</h1>
            <p>
              To contact a support specialist for help with your
              product, you have several options available:
            </p>
            <ul>
              <li>
                Click the chat icon in the bottom-right corner and start
                a conversation with a representative immediately
              </li>
              <li>
                <span>Call us at </span>
                <a href="tel:+14178493612">
                  (417) 849-3612
                </a>
              </li>
              <li>
                <span>Email us at </span>
                <a href="mailto:zach@slaterobots.com">
                  zach@slaterobots.com
                </a>
              </li>
              <li>
                <span>Tweet us at </span>
                <a href="https://twitter.com/SlateRobotics/">
                  @SlateRobotics
                </a>
              </li>
            </ul>
            <p>
              We take your questions very seriously, and we will do
              everything in our power to make your experience with
              Slate Robotics as graceful and frictionless as possible.
            </p>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
