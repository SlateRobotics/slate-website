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
            paddingTop:"140px",
            paddingBottom:"150px",
          }}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1 style={{fontSize:"95px"}}>
              Support
            </h1>
            <h4 style={{fontSize:"32px"}}>
              For any questions regarding the support of our products,
              please call us at
              {" "}<a href="tel:+14718493612">(417) 849-3612</a>{" "}
              or email at
              {" "}<a href="mailto:zach@slaterobots.com">zach@slaterobots.com</a>{" "}
            </h4>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
