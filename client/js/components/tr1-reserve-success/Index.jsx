var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "TR1 - Reservation Success - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{marginTop:"34px",marginBottom:"34px",textAlign:"left"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>
              Your reservation has been successfully processed!
            </h1>
            <p>
              You should receive a confirmation email shortly.
            </p>
            <p>
              We are very excited about getting to work with you! You will be
              contacted via email in the future when your order is ready to be
              finalized. You will need to select various configurations for the TR1
              as well as submitting the final payment at that time.
            </p>
            <p>
              We will email you regularly with updates on the progress of TR1
              developments. You can also follow us on our social media accounts
              (@SlateRobotics) to stay up to date with more general company announcements.
            </p>
            <p>
              If you have any questions at all, feel free to call me personally
              at (417) 849-3612 or email me at zach@slaterobots.com
            </p>
            <p>
              Thank you very much for the opportunity, and I aim to make this
              as smooth and effortless a process as humanly possible.
            </p>
            <p>
              <br/>
              <b>Zach Allen</b><br/>
              Founder & CEO
            </p>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
