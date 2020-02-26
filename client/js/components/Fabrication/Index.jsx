var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "Fabrication - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div>
        <div className="container-fluid" style={Style.containerTop}>
          <div className="row" style={{textAlign:"left"}}>
            <div className="col-md-8 col-xs-12 col-centered" style={{backgroundColor:"rgba(255,255,255,0.7)",paddingTop:"15px",paddingBottom:"15px",borderRadius:"15px"}}>
              <h1>Fabrication by Slate Robotics</h1>
              <h4>3D Printing, CNC Machining, and More</h4>
            </div>
          </div>
        </div>
        <div className="container-fluid" style={Style.container}>
          <div className="row" style={{textAlign:"left"}}>
            <div className="col-md-8 col-xs-12 col-centered">
              <div className="col-xs-12" style={{textAlign:"center"}}>
                <div className="row" style={{textAlign:"justify"}}>
                  <div className="col-xs-12">
                    <p>
                      Slate Robotics offers fabrications services like 3D Printing and CNC Machining for your custom parts and assemblies. Our 3D printers and CNC machines have a generous build area and can easily accommodate oversized parts. PLA, ABS, Nylon, Delrin, and PC are available for most fabrication processes; do note that we are limited in our capacity to work with metals at this time.
                    </p>
                    <p>
                      Our prices are competitive, and we can typically turn parts around in under 72 hours. We are also skilled in the aiding of the design of your parts and assemblies, and we will simply charge an hourly rate for doing so. Assembly and post-processing is also available upon request.
                    </p>
                    <p>
                      Please reach out with any inquiries and send us your 3D files for a full quote.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <h3 style={{backgroundColor:"#e6e6e6",padding:"25px",borderRadius:"15px"}}>
                    <span>
                      For more information, email{" "}
                    </span>
                    <a href="mailto:zach@slaterobots.com">
                      zach@slaterobots.com
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
