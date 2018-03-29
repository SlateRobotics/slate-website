var React = require('react');
var Style = require('./Style.jsx');

var SignOut = React.createClass({
  componentWillMount: function () {
    return window.location.assign('/sign-out');
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.containerTop}>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-4 col-xs-12 col-centered" style={{
              backgroundColor: "#fbfbfb",
              paddingTop: "15px",
              paddingBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "25px",
              marginBottom: "25px",
            }}>
            <h3>Signing out...</h3>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <img src="/img/wait" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
});

module.exports = SignOut;
