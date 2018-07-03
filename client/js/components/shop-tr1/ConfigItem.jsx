var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  getInitialState: function () {
    return {
      isSelected: false,
      isHovered: false,
    }
  },

  componentWillMount: function () {
    var state = this.state;
    state.isSelected = this.props.isSelected;
    this.setState(state);
  },

  componentWillReceiveProps: function (props) {
    var state = this.state;
    state.isSelected = props.isSelected;
    this.setState(state);
  },

  render: function() {
    var style = Style.configItem;
    if (this.state.isSelected) {
      style = Style.configItemSelected;
    } else if (this.state.isHovered) {
      style = Style.configItemHovered;
    }

    if (this.props.disabled) {
      style = Style.configItem;
      style.cursor = "default";
    }

    return (
      <div
        style={style}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        {this.props.label}
        <span className="hidden-xs" style={{color:"#ccc",float:"right"}}>
          {this.getValue()}
        </span>
        <div className="hidden-lg hidden-md hidden-md" style={{color:"#ccc"}}>
          {this.getValue()}
        </div>
      </div>
    );
  },

  getValue: function () {
    if (this.props.value && this.props.value != 0) {
      var sign = "+";
      if (this.props.value < 0) {
        sign = "-";
      }

      var value = this.props.value
        .toLocaleString('en-US', { minimumFractionDigits: 2 });

      return sign + "$" + value;
    }
  },

  handleMouseOver: function() {
    var state = this.state;
    state.isHovered = true;
    this.setState(state);
  },

  handleMouseOut: function() {
    var state = this.state;
    state.isHovered = false;
    this.setState(state);
  },

  handleClick: function () {
    this.props.onClick({
      category: this.props.category,
      index: this.props.index
    });
  }
});

module.exports = Component;
