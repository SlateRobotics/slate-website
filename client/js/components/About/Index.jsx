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
        <div className="row hidden-lg hidden-md" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1 style={{margin:"0",padding:"0"}}>
              At Slate Robotics, we're building human-sized robots for hackers.
            </h1>
          </div>
        </div>
        <div className="row hidden-sm hidden-xs" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1 style={{margin:"0",padding:"0"}}>
              At Slate Robotics, we're building human-sized robots for hackers.
            </h1>
          </div>
        </div>
        <div className="row" style={{paddingTop:"50px",paddingBottom:"50px"}}>
          <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-10 col-xs-12 col-centered">
                <img src="/img/slate-tr1-8" style={{minHeight:"100%",maxWidth:"100%"}} />
              </div>
              <div className="col-md-10 col-xs-12 col-centered" style={{marginBottom:"15px"}}>
                <h2>
                  We believe that great, affordable platforms for hackers is a crucial
                  first step to building a future of general purpose robots.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"50px",paddingBottom:"50px",borderTop:"3px solid #ccc",borderBottom:"3px solid #ccc"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Team</h1>
            <h4>
              We're a team of determined, industrious hackers making cool things that change the world.
            </h4>
            <div style={{marginTop:"25px"}} />
            <div className="row">
              {this.getMembers("team")}
            </div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"50px",paddingBottom:"50px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Financial backing</h1>
            <div style={{marginTop:"25px"}} />
            <div className="row">
              {this.getMembers("investor")}
            </div>
          </div>
        </div>
        <div className="row" style={{display:"none",borderTop:"3px solid #ccc",borderBottom:"3px solid #ccc"}}>
          <div className="col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-2 hidden-sm hidden-xs" />
              <div className="col-md-4 col-xs-12" style={{marginTop:"50px",marginBottom:"50px"}}>
                <h1>Stop by and see us!</h1>
                <div>We're located at 2728 S Austin Ave in Springfield Missouri</div>
              </div>
              <div className="hidden-lg hidden-md col-xs-12" style={{height:"400px"}} dangerouslySetInnerHTML={{__html:'<iframe width="100%" height="100%" frameborder="0" style="border:0"src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJxysm-t9gz4cRr6sQU18NZDI&key=AIzaSyCF4fFK34hrimVwSz6Ettj3xtaMZSggU58" allowfullscreen></iframe>'}} />
              <div className="col-md-6 hidden-sm hidden-xs" style={{height:"800px"}} dangerouslySetInnerHTML={{__html:'<iframe width="100%" height="100%" frameborder="0" style="border:0"src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJxysm-t9gz4cRr6sQU18NZDI&key=AIzaSyCF4fFK34hrimVwSz6Ettj3xtaMZSggU58" allowfullscreen></iframe>'}} />
            </div>
          </div>
        </div>
      </div>
    );
  },

  getMembers: function (type) {
    var members = team.filter(function (member) {
      return member.isActive && member.type == type;
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

    var membersComponent = [];
    for (var i = 0; i < members.length; i = i + 2) {
      var member1 = members[i];
      var member2 = members[i + 1];
      if (member1 && member2) {
        membersComponent.push((
          <div key={i} className="row">
            {member1}
            {member2}
          </div>
        ));
      } else if (member1 && !member2) {
        membersComponent.push((
          <div key={i} className="row">
            {member1}
          </div>
        ));
      }
    }

    return membersComponent;
  },
});

module.exports = Component;
