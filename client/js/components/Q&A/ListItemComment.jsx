var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Form = require('../Form/Index.jsx');
var UserStore = require('../../stores').user;
var QuestionStore = require('../../stores').question;

var Component = React.createClass({
  getInitialState: function () {
    return {
      flagDelete: false,
      isLoading: false,
    }
  },

  render: function() {
    if (this.state.isLoading) {
      return (
        <div className="col-xs-12" style={Style.listItemComment}>
          <div style={{marginTop:"5px"}}>
            <span>processing...</span>
          </div>
        </div>
      )
    }

    if (this.state.flagDelete) {
      return (
        <div className="col-xs-12" style={Style.listItemComment}>
          <div style={{marginTop:"5px",marginBottom:"10px"}}>
            <span>Are you sure you wish to delete your comment?</span>
            <span style={{marginLeft:"15px",color:"red",cursor:"pointer"}} onClick={this.handleClick_DeleteFoReal}>
              Delete
            </span>
            <span style={{marginLeft:"15px",color:"#888",cursor:"pointer"}} onClick={this.handleClick_CancelDelete}>
              Cancel
            </span>
          </div>
        </div>
      )
    }

    return (
      <div className="col-xs-12" style={Style.listItemComment}>
        <div style={{float:"left",fontSize:"16px",textAlign:"center",color:"#888",display:"none"}}>
          <div style={{cursor:"pointer"}}>▲</div>
          <div style={{cursor:"pointer"}}>⚑</div>
        </div>
        <div style={{/*marginLeft:"25px",*/marginTop:"5px",marginBottom:"10px"}}>
          {this.getBody()}
        </div>
      </div>
    )
  },

  getBody: function () {
    var currentTime = new Date();
    var timeSeconds = (currentTime - new Date(this.props.comment.createdOn)) / 1000;

    return (
      <div>
        {this.props.comment.text}
        {" - "}
        <span style={{color:"#07C"}}>
          {this.props.comment.createdBy}
        </span>
        {" "}
        <span style={{color:"#888"}}>
          {this.getTimeLabel(timeSeconds, "seconds")}
        </span>
        {this.getControls()}
      </div>
    )
  },

  getControls: function () {
    if (!this.props.user) return;
    if (!this.props.user.userName) return;
    if (!this.props.comment.createdBy) return;
    if (this.props.user.isAdmin || this.props.user.userName == this.props.comment.createdBy) {
      return (
        <span>
          {" - "}
          <span style={{color:"red",cursor:"pointer",fontSize:"16px"}} onClick={this.handleClick_X}>
            {"✘"}
          </span>
        </span>
      )
    } else {
      return (
        <span />
      )
    }
  },

  handleClick_DeleteFoReal: function () {
    var state = this.state;
    state.isLoading = true;
    this.setState(state);

    if (this.props.answer) {
      QuestionStore.deleteQuestionAnswerComment(this.props.question._id, this.props.answer._id, this.props.comment._id, function (res) {
        var state = this.state;
        state.isLoading = false;
        state.flagDelete = false;
        this.setState(state);
        this.props.onDelete("answer");
      }.bind(this));
    } else {
      QuestionStore.deleteQuestionComment(this.props.question._id, this.props.comment._id, function (res) {
        var state = this.state;
        state.isLoading = false;
        state.flagDelete = false;
        this.setState(state);
        this.props.onDelete();
      }.bind(this));
    }
  },

  handleClick_CancelDelete: function () {
    var state = this.state;
    state.flagDelete = false;
    this.setState(state);
  },

  handleClick_X: function () {
    var state = this.state;
    state.flagDelete = true;
    this.setState(state);
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
});

module.exports = Component;
