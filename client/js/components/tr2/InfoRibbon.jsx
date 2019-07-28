var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    //var backgroundVideo = document.getElementById("backgroundVideo");
    //backgroundVideo.loop = true;
    //backgroundVideo.play();
  },

  render: function() {
    var vHeight = 450;
    var vWidth = Math.floor(vHeight * 1.78);
    return (
      <div className="row">
        <div className="container-fluid" style={Style.detail1Container}>
          <div className="row" style={{paddingTop:"75px"}}>
            <div className="col-centered col-xs-10">
              <div className="row" style={{borderTop:"1px solid #ccc",paddingTop:"75px"}} />
              <div className="row">
                <div className="col-xs-12">
                  <iframe style={{maxWidth:"100%"}} width={vWidth} height={vHeight} src="https://www.youtube.com/embed/sWvwDx3w0iA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
              </div>
              <div className="row" style={{borderBottom:"1px solid #ccc",paddingBottom:"75px"}} />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
