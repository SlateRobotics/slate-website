var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var jobs = require('./jobs');

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "Careers - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Careers</h1>
            <h4>
              Our mission is to get high performance robots into
              the hands of hackers.
            </h4>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered">
            <div className="row">
              {this.getJobs()}
            </div>
          </div>
        </div>
      </div>
    );
  },

  getJobs: function () {
    var activeJobs = jobs.filter(function (job) {
      return job.isActive;
    });

    if (activeJobs.length == 0) {
      return (
        <div className="col-xs-12">
          <span>
            {"We are always looking for the best talent. Send your resume to"}
            <a href="mailto:zach@slaterobots.com">zach@slaterobots.com</a>
            {" if you're interested in joining us to help pioneer the future "}
            of personal robots.
          </span>
        </div>
      )
    }

    return activeJobs.map(function (job, i) {
      function getDuties() {
        return job.duties.map(function (duty, j) {
          return (
            <li key={"job-" + i + "-duty-" + j}>{duty}</li>
          );
        })
      }

      function getSkills() {
        return job.skills.map(function (skill, j) {
          return (
            <li key={"job-" + i + "-skill-" + j}>{skill}</li>
          );
        })
      }

      var line;
      if (i != activeJobs.length - 1) {
        line = (<div style={{borderBottom:"1px solid #ccc",marginTop:"25px"}} />)
      }

      return (
        <div key={"job-" + i} className="col-xs-12" style={{textAlign:"left",marginBottom:"25px"}}>
          <h3>{job.name}</h3>
          <p>{job.description}</p>
          <div>Responsibilities:</div>
          <ul>{getDuties()}</ul>
          <div>Skills and Qualifications:</div>
          <ul>{getSkills()}</ul>
          <p>
            {"To apply, send to "}
            <a href="mailto:zach@slaterobots.com">zach@slaterobots.com</a>
            {" a resume and a 3-5 sentence explanation for why you "}
            are the absolute best, most capable person on this wonderful planet
            to perform this job.
          </p>
          {line}
        </div>
      )
    });
  },
});

module.exports = Component;
