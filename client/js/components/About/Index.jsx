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
                <img src="/img/slate-tr1-5" style={{minHeight:"100%",maxWidth:"100%"}} />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{padding:"50px 0px",borderTop:"3px solid #ccc",}}>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-xs-12 col-centered">
                <h1>Our Story</h1>
              </div>
              <div className="hidden-lg hidden-md col-xs-12">
                <img src="/img/slate-tr1-8" style={{maxWidth:"100%"}} />
              </div>
              <div className="col-md-6 col-xs-12">
                <div style={{textAlign:"justify"}}>
                  <p>
                    I used to dream of one day being able to sit down and program
                    one of the super-advanced research robots like Willow Garage's PR2.
                    My grades in high school and college weren't great, so I probably
                    wasn't destined to work with one in UC Berkeley's Robotics
                    and Intelligent Machines Lab. And with a price tag of $400,000,
                    it's rather obvious how likely it is that I would just go out and
                    buy one. This also made me realize that even if all
                    of the hard problems of AI and perception were solved today,
                    we still wouldn't get general purpose robot butlers, since
                    the hardware cost problem hadn't been addressed.
                  </p>
                  <p>
                    Naturally, I decided I would just try to build my own
                    research robot that I could program and would be affordable
                    enough for other people to program too. A year of hacking
                    on hardware in my garage led to the development of the TR1,
                    a human-sized platform with 7-DOF arms and a mobile,
                    omnidirectional base with a base price of only $3,199.
                  </p>
                  <p>
                    I hope affordable robots like the TR1 can do for personal
                    robotics what the Altair 8800 and the Apple II did for
                    personal computing. Perhaps, if we can build a community of
                    hackers and engineers around building tools and applications
                    for robots like the TR1, we can begin to build the future of
                    general purpose robots.
                  </p>
                  <p style={{fontStyle:"italic"}}>
                    <b>Zach Allen</b><br/>
                    Founder & CEO
                  </p>
                </div>
              </div>
              <div className="col-md-6 hidden-sm hidden-xs">
                <img src="/img/slate-tr1-8" style={{maxWidth:"100%"}} />
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
            <h1>Investors</h1>
            <div style={{marginTop:"25px"}} />
            <div className="row">
              {this.getMembers("investor")}
            </div>
          </div>
        </div>
        <div className="row" style={{borderTop:"3px solid #ccc",borderBottom:"3px solid #ccc"}}>
          <div className="col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-2 hidden-sm hidden-xs" />
              <div className="col-md-4 col-xs-12" style={{marginTop:"50px",marginBottom:"50px"}}>
                <h1>Stop by and see us!</h1>
                <div>We're located at 210 W Sunshine St, Suite C in Springfield Missouri</div>
              </div>
              <div className="hidden-lg hidden-md col-xs-12" style={{height:"400px"}} dangerouslySetInnerHTML={{__html:'<iframe width="100%" height="100%" frameborder="0" style="border:0"src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCLZXbFbjUh2W7-GM6Pz6bBuuGohqHUtxo&q=210+W+Sunshine+St.,+Suite+C,+Springfield+MO+65807" allowfullscreen></iframe>'}} />
              <div className="col-md-6 hidden-sm hidden-xs" style={{height:"800px"}} dangerouslySetInnerHTML={{__html:'<iframe width="100%" height="100%" frameborder="0" style="border:0"src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCLZXbFbjUh2W7-GM6Pz6bBuuGohqHUtxo&q=210+W+Sunshine+St.,+Suite+C,+Springfield+MO+65807" allowfullscreen></iframe>'}} />
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
        var result = [];
        if (!member.socials) member.socials = [];
        for (var i = 0; i < member.socials.length; i++) {
          var social = member.socials[i];
          var type = new URL(social).hostname.replace("www.","").replace(".com","");
          result.push(
            <a href={social}>
              <img src={"/img/icon-" + type} height="35" width="35" />
            </a>
          );

          if (i < member.socials.length - 1) {
            result.push(<span style={{marginRight:"25px"}} />);
          }
        }

        return (
          <div style={{margin:"25px 0px"}}>
            {result.map(function (r,i){return r;})}
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

      var style = {};
      if (i > 0) {
        style = {marginTop:"15px"};
      }

      if (member1 && member2) {
        membersComponent.push((
          <div key={i} className="row" style={style}>
            {member1}
            {member2}
          </div>
        ));
      } else if (member1 && !member2) {
        membersComponent.push((
          <div key={i} className="row" style={style}>
            {member1}
          </div>
        ));
      }
    }

    return membersComponent;
  },
});

module.exports = Component;
