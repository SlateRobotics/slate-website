var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Form = require('../Form/Index.jsx');
var Job = require('./Job.jsx');
var jobs = require('./jobs');

var Component = React.createClass({
  getInitialState: function () {
    return {
      jobs: jobs,
      search: "",
    };
  },

  componentDidMount: function () {
    document.title = "Careers - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    if (this.props.params && this.props.params.id) {
      var state = this.state;
      state.search = this.props.params.id.replace(/-/g, " ");
      this.setState(state);
    }

    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Careers</h1>
            <h4>
              We're building the future of general purpose robots. Join our
              growing team and play an integral part of the most important
              technological revolution of our lifetime.
            </h4>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered" style={{marginBottom:"25px"}}>
            <Form.Input
              attribute="search"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleChange_Field} />
          </div>
          <div className="col-md-8 col-xs-12 col-centered">
            <div className="row">
              {this.getJobs()}
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
  },

  getJobs: function () {
    var activeJobs = this.state.jobs.filter(function (job) {
      return job.isActive;
    }.bind(this));

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

    activeJobs = activeJobs.filter(function (job) {
      return job.name.toLowerCase().includes(this.state.search.toLowerCase());
    }.bind(this));

    if (activeJobs.length == 1) {
      function seeAll() {
        window.scrollTo(0,0);
        var state = this.state;
        state.search = "";
        this.setState();
        BrowserHistory.push("/careers");
      }

      var seeAllComponent;
      if (activeJobs.length < this.state.jobs.length) {
        seeAllComponent = (
          <ButtonPrimary
            label="See All Positions"
            onClick={seeAll.bind(this)} />
        )
      }

      return (
        <div>
          <Job job={activeJobs[0]} selected />
          {seeAllComponent}
        </div>
      )
    }

    return activeJobs.map(function (job, i) {
      var line;
      if (i != activeJobs.length - 1) {
        line = (<div style={{borderBottom:"1px solid #ccc",marginTop:"10px"}} />)
      }

      return (
        <div key={"job-" + i}>
          <Job job={job} line={line} />
        </div>
      )
    }.bind(this));
  },
});

module.exports = Component;
