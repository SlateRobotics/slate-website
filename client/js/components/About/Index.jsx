var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var team = require('./team');

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "About - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>About</h1>
            <h4>
              Our mission is to get high performance robots into
              the hands of hackers.
            </h4>
          </div>
        </div>
        <div style={{marginTop:"50px"}} />
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered">
            <div className="row">
              {this.getTeam()}
            </div>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
      </div>
    );
  },

  getTeam: function () {
    return team.filter(function (member) {
      return member.isActive;
    }).map(function (member, i) {
      function getSocialLink (social) {
        if (member[social]) {
          return (
            <a href={member[social]}>
              <img src={"/img/icon-" + social} height="35" width="35" />
            </a>
          )
        }
      }

      function getSocial() {
        var marginOne;
        if (member.linkedin && (member.twitter || member.facebook)) {
          marginOne = (<span style={{marginRight:"25px"}} />);
        }

        var marginTwo;
        if ((member.linkedin || member.twitter) && member.facebook) {
          marginTwo = (<span style={{marginRight:"25px"}} />);
        }

        return (
          <div style={{margin:"25px 0px"}}>
            {getSocialLink("linkedin")}
            {marginOne}
            {getSocialLink("twitter")}
            {marginTwo}
            {getSocialLink("facebook")}
          </div>
        )
      }

      return (
      <div key={"member-" + i} className="col-md-6 col-xs-12">
        <img
          src={member.img}
          style={{height:"150px",width:"150px",borderRadius:"50%"}} />
        <h3>{member.name}</h3>
        <h4>{member.title}</h4>
        {getSocial()}
        <div style={{marginTop:"15px"}} />
        <p>{member.description}</p>
      </div>
      )
    });
  },
});

module.exports = Component;
