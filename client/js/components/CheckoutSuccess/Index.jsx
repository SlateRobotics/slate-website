var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "Checkout Success - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Success!</h1>
            <h3>Your order has been placed</h3>
            <p>
              You will receive an email confirmation shortly with a
              link to where you may track your order.
            </p>
            <h3>Have any questions?</h3>
            <p>
              If you have any additional questions about your order,
              we'd be delighted to assist you! You may contact us
              through one of the following options:
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
            </ul>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
