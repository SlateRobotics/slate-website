var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  getInitialState: function () {
    return {
      selected: false,
    }
  },

  render: function() {
    var job = this.props.job;
    var selected = this.state.selected;
    if (this.props.selected) selected = this.props.selected;

    if (!selected) {
      return (
        <div className="col-xs-12" style={{textAlign:"left",marginBottom:"10px"}}>
          <h3 style={{marginTop:"0px"}}>{job.name}</h3>
          <div style={{fontStyle:"italic"}}>
            {job.location}
            {" - "}
            {job.employmentType}
          </div>
          <a onClick={this.handleClick_Apply} style={{cursor:"pointer",marginTop:"5px",marginRight:"10px"}}>Apply Now</a>
          <a onClick={this.handleSelect} style={{cursor:"pointer",marginTop:"5px"}}>View Details</a>
          {this.props.line}
        </div>
      )
    }

    return (
      <div className="col-xs-12" style={{textAlign:"left",marginBottom:"10px"}}>
        <a onClick={this.handleUnSelect} style={{cursor:"pointer",float:"right"}}>Hide</a>
        <h3 style={{marginTop:"0px"}}>{job.name}</h3>
        <div style={{fontStyle:"italic"}}>
          {job.location}
          {" - "}
          {job.employmentType}
        </div>
        <div style={{marginTop:"15px"}} />
        <p>{job.description}</p>
        {this.getDuties()}
        {this.getSkills()}
        <a onClick={this.handleClick_Apply} style={{cursor:"pointer",marginTop:"5px",marginRight:"10px"}}>
          Click here to apply
        </a>
        {this.props.line}
      </div>
    );
  },

  handleClick_Apply: function () {
    BrowserHistory.push("/careers/" + this.props.job._id + "/apply");
  },

  handleSelect: function () {
    var state = this.state;
    state.selected = true;
    this.setState(state);
  },

  handleUnSelect: function () {
    var state = this.state;
    state.selected = false;
    this.setState(state);
  },

  getDuties: function () {
    var job = this.props.job;
    var duties = job.duties.map(function (duty, i) {
      return (
        <li key={"duty-" + i}>{duty}</li>
      );
    });
    if (job.duties.length > 0) {
      return (
        <div>
          <div>Duties and Responsibilities:</div>
          <ul>{duties}</ul>
        </div>
      )
    }
  },

  getSkills: function () {
    var job = this.props.job;
    var skills = job.skills.map(function (skill, i) {
      return (
        <li key={"skill-" + i}>{skill}</li>
      );
    });
    if (job.skills.length > 0) {
      return (
        <div>
          <div>Skills and Qualifications:</div>
          <ul>{skills}</ul>
        </div>
      )
    }
  },
});

module.exports = Component;
