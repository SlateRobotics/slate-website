var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var UserStore = require('../../stores').user;
var Form = require('../Form/Index.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row" style={Style.listItem}>
        <div className="col-lg-3 col-md-4 col-xs-12">
          {this.getDataDetail()}
        </div>
        <div className="col-lg-9 col-md-8 col-xs-12">
          {this.getTitle()}
          {this.getTimeStampMobile()}
          <div style={{marginTop:"5px"}} />
          {this.getTags()}
          {this.getTimeStamp()}
        </div>
      </div>
    )
  },

  getTitle: function () {
    var friendlyTitle = this.props.question.title;
    friendlyTitle = friendlyTitle.substring(0,50);
    friendlyTitle = friendlyTitle.toLowerCase();
    friendlyTitle = friendlyTitle.split(" ").join("-");
    friendlyTitle = friendlyTitle.split("/").join("-");
    friendlyTitle = friendlyTitle.split("?").join("-");
    friendlyTitle = friendlyTitle.split(".").join("-");
    friendlyTitle = friendlyTitle.split(":").join("-");
    friendlyTitle = friendlyTitle.split("@").join("-");
    friendlyTitle = friendlyTitle.split("=").join("-");
    friendlyTitle = friendlyTitle.split("&").join("-");
    friendlyTitle = friendlyTitle.split("<").join("-");
    friendlyTitle = friendlyTitle.split(">").join("-");
    friendlyTitle = friendlyTitle.split("#").join("-");
    friendlyTitle = friendlyTitle.split("%").join("-");
    friendlyTitle = friendlyTitle.split("{").join("-");
    friendlyTitle = friendlyTitle.split("}").join("-");
    friendlyTitle = friendlyTitle.split("|").join("-");
    friendlyTitle = friendlyTitle.split("^").join("-");
    friendlyTitle = friendlyTitle.split("~").join("-");
    friendlyTitle = friendlyTitle.split("[").join("-");
    friendlyTitle = friendlyTitle.split("]").join("-");
    friendlyTitle = friendlyTitle.split("`").join("-");
    friendlyTitle = friendlyTitle.split("\\").join("-");
    friendlyTitle = friendlyTitle.split("\"").join("-");
    var url = "/questions/" + this.props.question._id + "/" + friendlyTitle;

    return (
      <div style={{fontSize:"18px"}}>
        <Link to={url}>
          {this.props.question.title}
        </Link>
      </div>
    )
  },

  getTimeStamp: function () {
    var label = "asked by";
    var person = this.props.question.createdBy;

    var modifiedOn = new Date(this.props.question.modifiedOn);
    var createdOn = new Date(this.props.question.createdOn);

    var currentTime = new Date();
    var timeSeconds = (currentTime - createdOn) / 1000;
    var timeLabel = this.getTimeLabel(timeSeconds, "seconds");

    if (modifiedOn.getTime() != createdOn.getTime()) {
      label = "modified by";
      person = this.props.question.modifiedBy;
      timeSeconds = (currentTime - modifiedOn) / 1000;
      timeLabel = this.getTimeLabel(timeSeconds, "seconds");
    }


    return (
      <div className="hidden-sm hidden-xs" style={{fontSize:"12px",float:"right",marginTop:"7px"}}>
        {label + " " + person + " " + timeLabel}
      </div>
    )
  },

  getTimeStampMobile: function () {
    var label = "asked by";
    var person = this.props.question.createdBy;

    var modifiedOn = new Date(this.props.question.modifiedOn);
    var createdOn = new Date(this.props.question.createdOn);

    var currentTime = new Date();
    var timeSeconds = (currentTime - createdOn) / 1000;
    var timeLabel = this.getTimeLabel(timeSeconds, "seconds");

    if (modifiedOn.getTime() != createdOn.getTime()) {
      label = "modified by";
      person = this.props.question.modifiedBy;
      timeSeconds = (currentTime - modifiedOn) / 1000;
      timeLabel = this.getTimeLabel(timeSeconds, "seconds");
    }


    return (
      <div className="hidden-lg hidden-md row">
        <div className="col-xs-12" style={{fontSize:"12px"}}>
          {label + " " + person + " " + timeLabel}
        </div>
      </div>
    )
  },

  getTimeLabel: function (value, unit) {
    var units = ["seconds","minutes","hours","days","weeks","months","years"]
    var unitMax = [60, 60, 24, 7, 4, 12];
    var unitIndex = units.indexOf(unit);
    if (value > unitMax[unitIndex]) {
      return this.getTimeLabel(value / unitMax[unitIndex], units[unitIndex + 1]);
    } else {
      var valueLabel = Math.floor(value)
      var unitsLabel = units[unitIndex];
      if (valueLabel == 1) { unitsLabel = unitsLabel.substring(0, unitsLabel.length - 1); }
      return valueLabel + " " + unitsLabel + " ago";
    }
  },

  getTags: function () {
    var tags = this.props.question.tags.map(function (tag, i) {
      return (
        <span key={"tag-" + i} style={{backgroundColor:"#E1ECF4",marginRight:"5px",border:"1px solid #E1ECF4",color:"#39739d",padding:".4em .5em",fontSize:"12px"}}>
          <Link to={"/questions?tag=" + tag}>{tag}</Link>
        </span>
      )
    }.bind(this));

    return (
      <div style={{float:"left"}}>
        {tags}
      </div>
    )
  },

  getDataDetail: function () {
    var votesLabel = "votes";
    var answersLabel = "answers";
    var viewsLabel = "views";

    if (this.props.question.votesCount == 1) votesLabel = "vote";
    if (this.props.question.answersCount == 1) answersLabel = "answer";
    if (this.props.question.viewsCount == 1) viewsLabel = "view";

    var answerStyle = {};
    var answerStyleMobile = {paddingRight:"5px"};
    var questionAnswered = false;
    if (this.props.question.answered) {
      answerStyleMobile = {
        paddingRight:"5px",
        color: "green",
      };
      answerStyle = {
        color: "white",
        backgroundColor: "#5fba7d",
        borderRadius: "3px",
      };
    }

    return (
      <div className="row" style={{textAlign:"center"}}>
        <div className="hidden-lg hidden-md col-xs-12" style={{textAlign:"left",color:"#888"}}>
          <span style={{paddingRight:"5px"}}>
            <b style={{color:"#666"}}>{this.props.question.votesCount}</b>
            {" "}
            {votesLabel}
          </span>
          <span style={answerStyleMobile}>
            <b style={{color:"#666"}}>{this.props.question.answersCount}</b>
            {" "}
            {answersLabel}
          </span>
          <span style={{paddingRight:"5px"}}>
            <b style={{color:"#666"}}>{this.props.question.viewsCount}</b>
            {" "}
            {viewsLabel}
          </span>
        </div>
        <div className="col-md-4 hidden-sm hidden-xs">
          {this.props.question.votesCount}
          <br />
          {votesLabel}
        </div>
        <div className="col-md-4 hidden-sm hidden-xs" style={answerStyle}>
          {this.props.question.answersCount}
          <br />
          {answersLabel}
        </div>
        <div className="col-md-4 hidden-sm hidden-xs">
          {this.props.question.viewsCount}
          <br />
          {viewsLabel}
        </div>
      </div>
    )
  },
});

module.exports = Component;
