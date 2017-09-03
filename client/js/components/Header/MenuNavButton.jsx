var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');

var MenuNavButton = React.createClass({
  getInitialState: function () {
    return {
      isHovered: '',
      mode: 0,
    }
  },

  componentWillMount: function () {
    this.setState({
      isHovered: false,
      mode: 0,
    });
  },

  componentWillReceiveProps: function (props) {
    if (props.mode) {
      var state = this.state;
      state.mode = props.mode;
      this.setState(state);
    }
  },

	render: function () {
    var style = Style.menuNavButton;
    if (this.state.isHovered) {
      style = Style.menuNavButtonHover;
    }

    var src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAqCAYAAADmmJiOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTM4RTVFOUM2NUQ5MTFFNjhBMzQ4QURCNTJEMjA3NkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTM4RTVFOUQ2NUQ5MTFFNjhBMzQ4QURCNTJEMjA3NkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MzhFNUU5QTY1RDkxMUU2OEEzNDhBREI1MkQyMDc2RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MzhFNUU5QjY1RDkxMUU2OEEzNDhBREI1MkQyMDc2RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsiImz8AAABWSURBVHja7NfRCQAgCAVACzdy/9mqLQS7Bw5w6Icvq+rE4OwYHkBAwN7km2WDgICAgICAgICATb+oRg8ICAio0TtRQEBAQEBAQECN3gYBAQF/Al4BBgB18gP3kpoSZwAAAABJRU5ErkJggg==";
    if (this.state.mode == 1) {
      src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAuCAYAAAC8jpA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjI2NkU2NTE2NURBMTFFNjhBMzQ4QURCNTJEMjA3NkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjI2NkU2NTI2NURBMTFFNjhBMzQ4QURCNTJEMjA3NkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MzhFNUU5RTY1RDkxMUU2OEEzNDhBREI1MkQyMDc2RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMjY2RTY1MDY1REExMUU2OEEzNDhBREI1MkQyMDc2RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk8WKooAAAHdSURBVHjazNlNSgMxFAfw6SsUqaKrAekd6mZALyB07UK78BIeQY/gIVrwAoKiB+i24MKFe6ErQUEE0fcgIyHORz5e8vLgT5mBKb/OJJk0GVRVVRg1xYwxqyLTAuP4APOIucMcZWIcd6EJ/IApMXuZwM8wL+rp/0Pr4Lqk4QReYvbV05/q6B2FKxsulILX4KE6LnU4od8xF5jvli9IDTfBhQmvm8cN5jwDeBu4rhF1TL0jSsP7wG+YGQ3F5pAnBbcGN43TEnAncBs6JdwZ3IVOAfcC96Fjwr3BNugY8CCwLZoTHgx2QXPAWcCu6BA4G9gH7QNnBVMNJ5OJz3D1hHnGnLT88C3Mqfq85gRTDRr+brnUHLPoQHWVF9i3ebg0FXYwB9oHHgTmQrvAg8GcaKofqSWEWLM11tkhJASb8EMptCtYh9/7wiEimDrdVc+b0wsOEcE0SlxavPKd4RARvHKYqzjBITK4iAGHBGB2uC16zjS9ZIGDJXjBOL0MhkNiMAscBMDBcBACB8FBEOwNB2GwFxwyADvDIROwLfwL80lLCLRRdIvZFQb3LU9sMMeYdb1RNFMnpcFtd/wPrLfptTq5yQBswl91cNNiTb0JOhIG67WN+ehbYcp+Q/9XgAEAbpfkRs/2TWkAAAAASUVORK5CYII=";
    }

		return (
				<img id="menu-button"
          style={style}
          src={src}
          onClick={this.handleClick_MenuNavButton}
          onMouseEnter={this.handleMouseEnter_Li}
          onMouseOut={this.handleMouseOut_Li} />
		);
	},

	handleClick_MenuNavButton: function () {
    $("#menu-sub").slideToggle("fast");
    if (this.state.mode == 0) {
      var state = this.state;
      state.mode = 1;
      this.setState(state);
    } else {
      var state = this.state;
      state.mode = 0;
      this.setState(state);
    }
	},

  handleMouseEnter_Li: function () {
    this.setState({
      isHovered: true,
      mode: this.state.mode,
    });
  },

  handleMouseOut_Li: function () {
    this.setState({
      isHovered: false,
      mode: this.state.mode,
    });
  },
});

module.exports = MenuNavButton;
