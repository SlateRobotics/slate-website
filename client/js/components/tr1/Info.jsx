var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row" style={{marginTop:"34px",textAlign:"left"}}>
        <div className="hidden-lg hidden-md col-xs-12" style={{
            backgroundColor:"#45415E",
            color:"#fff",
          }}>
          <h1 style={{fontSize:"95px"}}>
            Slate TR1
          </h1>
          <h4 style={{fontSize:"32px"}}>
            The first, human-sized robot for hackers
          </h4>
          <div style={{paddingTop:"15px",paddingBottom:"25px"}}>
            <div>• Two, 7 DOF arms</div>
            <div>• Omni-drive mobile base</div>
            <div>• Actuated torso - extends up to 12in (300mm)</div>
            <div>• 3 DOF Head w/ Kinect 2.0</div>
            <div>• NVIDIA Jetson embedded development system</div>
            <div>• 8 to 12 hour battery life</div>
          </div>
        </div>
        <div className="col-md-6 hidden-md hidden-xs" style={{
            height:"800px",
            backgroundImage:"url('/img/slate-tr1-1')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
        </div>
        <div className="hidden-lg hidden-md col-xs-12" style={{
            height:"400px",
            backgroundImage:"url('/img/slate-tr1-1')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
        </div>
        <div className="col-md-6 hidden-sm hidden-xs" style={{
            height:"800px",
            backgroundColor:"#45415E",
            color:"#fff",
            paddingTop:"125px",
          }}>
          <h1 style={{fontSize:"95px"}}>
            Slate TR1
          </h1>
          <h4 style={{fontSize:"32px"}}>
            The first, human-sized robot for hackers
          </h4>
          <div style={{padding:"15px 0px"}}>
            <div>• Two, 7 DOF arms</div>
            <div>• Omni-drive mobile base</div>
            <div>• Actuated torso - extends up to 12in (300mm)</div>
            <div>• 3 DOF Head w/ Kinect 2.0</div>
            <div>• NVIDIA Jetson embedded development system</div>
            <div>• 8 to 12 hour battery life</div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
