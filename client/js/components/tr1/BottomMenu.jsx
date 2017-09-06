var React = require('react');
var Style = require('./Style.jsx');
var BrowserHistory = require('react-router').browserHistory;

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div
          className="col-md-6 col-xs-12"
          style={{backgroundColor:"#2b4151",color:"#fff",padding:"35px 0px",cursor:"pointer"}}
          onClick={this.handleClick_Specs}>
          <h1>View Specs</h1>
        </div>
        <div
          className="col-md-6 col-xs-12"
          style={{backgroundColor:"#45415E",color:"#fff",padding:"35px 0px",cursor:"pointer"}}
          onClick={this.handleClick_Buy}>
          <h1>Buy Now</h1>
        </div>
      </div>
    );
  },

  handleClick_Specs: function () {
    BrowserHistory.push("/tr1/specs");
  },

  handleClick_Buy: function () {
    BrowserHistory.push("/shop/tr1");
  },
});

module.exports = Component;
