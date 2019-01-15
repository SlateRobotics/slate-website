var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Link = require('react-router').Link;
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var MenuButton = require('./MenuButton.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row" style={{
          marginTop:"34px",
          textAlign:"left",
          backgroundColor:"#222",
          color:"#fff",
        }}>
        <div className="hidden-lg hidden-md col-xs-12">
          <h1 style={{fontSize:"95px"}}>
            Slate TR2
          </h1>
          <h4 style={{fontSize:"32px"}}>
            The preeminent machine learning playground
          </h4>
        </div>
        <div className="col-md-6 hidden-sm hidden-xs" style={{
            height:"800px",
            backgroundImage:"url('/img/slate-tr2-1')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
        </div>
        <div className="hidden-lg hidden-md col-xs-12" style={{
            backgroundColor:"#222",
            overflow:"hidden",
            height:"500px",
            position:"relative",
          }}>
          <img src="/img/slate-tr2-1" style={{
              height:"500px",
              position:"absolute",
              top: "-9999px",
              bottom: "-9999px",
              left: "-9999px",
              right: "-9999px",
              margin: "auto",
            }} />
        </div>
        <div className="col-md-6 hidden-sm hidden-xs" style={{
            height:"800px",
            paddingTop:"125px",
            backgroundColor:"#222",
            color:"#fff",
          }}>
          <h1 style={{fontSize:"95px"}}>
            Slate TR2
          </h1>
          <h4 style={{fontSize:"32px"}}>
            The preeminent machine learning playground
          </h4>
          <h4 style={{paddingTop:"20px",marginBottom:"25px"}}>
            {"At a price "}
            <a
              target="_blank"
              href="https://www.reddit.com/r/robotics/comments/6hmn35/are_there_any_robots_like_the_pr2but_for/"
              style={{color:"white"}}>
              no one thought possible
            </a>
          </h4>
          <MenuButton to="/shop/tr2" label="Buy Yours" />
        </div>
      </div>
    );
  },

  handleClick_Buy: function () {
    BrowserHistory.push("/shop/tr2");
  },
});

module.exports = Component;
