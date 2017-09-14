var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="container-fluid" style={Style.detail5Container}>
          <div className="row">
            <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
              <div className="row">
                <div className="col-xs-12" style={{paddingTop:"150px",height:"600px"}}>
                  <h1>Any questions?</h1>
                  <h4 className="hidden-xs">
                    Give us a call at
                    {" "}<a href="tel:+14178493612">(417) 849-3612</a>{" "}
                    or you can use the chat icon in the bottom-right
                    corner of your screen to chat with an agent immediately.
                  </h4>
                  <div className="hidden-lg hidden-md hidden-sm">
                    Give us a call at
                    {" "}<a href="tel:+14178493612">(417) 849-3612</a>{" "}
                    or email at
                    {" "}<a href="mailto:zach@slaterobots.com">zach@slaterobots.com</a>{". "}
                    We look forward to hearing from you!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
