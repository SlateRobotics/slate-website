var React = require('react');
var Style = require('./Style.jsx');

var FormInput = React.createClass({
  getInitialState: function () {
    return {
      isHovered: false,
      isFocused: false,
    }
  },

  render: function() {
    if (this.props.type == "checkbox") {
      if (this.props.value == true) {
        return (
          <input
            style={this.getStyle()}
            type={this.props.type}
            placeholder={this.props.placeholder}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            checked />
        )
      }
      return (
        <input
          style={this.getStyle()}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}/>
      )
    }

    return (
      <input
        style={this.getStyle()}
        value={this.props.value}
        type={this.props.type}
        placeholder={this.props.placeholder}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}/>
    )
  },

  getStyle: function () {
    var style = Style.input;
    if (this.props.disabled) style = Style.inputDisabled;
    if (this.state.isHovered === true) {
      style = Style.inputHovered;
      if (this.state.isFocused === true) {
        style = Style.inputHoveredFocused
      }
    } else if (this.state.isFocused === true) {
      if (this.state.isFocused === true) {
        style = Style.inputFocused
      }
    }
    return style;
  },

  handleMouseEnter: function () {
    if (this.props.disabled) return;
    this.setState({
      isHovered: true,
      isFocused: this.state.isFocused,
    });
  },

  handleMouseLeave: function () {
    if (this.props.disabled) return;
    this.setState({
      isHovered: false,
      isFocused: this.state.isFocused,
    });
  },

  handleFocus: function () {
    if (this.props.disabled) return;
    this.setState({
      isHovered: this.state.isHovered,
      isFocused: true,
    });
  },

  handleBlur: function () {
    if (this.props.disabled) return;
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({
      isHovered: this.state.isHovered,
      isFocused: false,
    });
  },

  handleChange: function (event) {
    if (this.props.disabled) return;
    if (this.props.onChange) {
      var value = event.target.value;
      if (this.props.attribute) {
        this.props.onChange(this.props.attribute, value);
      } else {
        this.props.onChange(value);
      }
    }
  },

  handleKeyPress: function (e) {
    if (this.props.disabled) return;
    if (this.props.onKeyPress) {
      if (!e) e = window.event;
      var keyCode = e.keyCode || e.which;
      if (this.props.attribute) {
        this.props.onKeyPress(this.props.attribute, keyCode);
      } else {
        this.props.onKeyPress(keyCode);
      }
    }
  },
});

module.exports = FormInput;
