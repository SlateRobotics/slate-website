var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="container-fluid" style={Style.detail4Container}>
          <div className="row">
            <div className="col-lg-10 col-xs-12 col-centered">
              <div className="row">
                <div className="col-sm-4 col-xs-12">
                  <h1>5-Axis Arm</h1>
                  {/* mobile */}
                  <div className="row hidden-lg hidden-md hidden-sm"
                    style={Style.iconDescriptionContainer}>
                    <div className="col-xs-4">
                      <img src="/img/icon-gyroscope" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>5 Degrees of Freedom</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-weights" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>2kg Payload</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-range" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>850mm Range</p>
                    </div>
                  </div>
                  {/* icons */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <img src="/img/icon-gyroscope" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-weights" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-range" height="50" width="50" />
                    </div>
                  </div>
                  {/* icon descriptions */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <p>5 Degrees of Freedom</p>
                    </div>
                    <div className="col-sm-4">
                      <p>2kg Payload</p>
                    </div>
                    <div className="col-sm-4">
                      <p>850mm Range</p>
                    </div>
                  </div>
                  <div className="row" style={{textAlign:"justify"}}>
                    <div className="col-xs-12">
                      <p>
                        The Slate TR2 arm is a powerful piece of technology. Each actuator is capable of delivering over 30 Nm of torque and reading angle resolution down to 1/10 of a degree. The TR2 arm is also capable of measuring torque, which allows for back-drivability.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 col-xs-12" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} className="hidden-sm hidden-xs" src="/img/slate-tr2-2" height="600" />
                    <img style={Style.imageCenter} className="hidden-lg hidden-md" src="/img/slate-tr2-2" width="100%" />
                  </div>
                </div>
              </div>
              <div className="row" style={{marginTop:"35px"}}>
                <div className="col-sm-8 hidden-xs" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src="/img/slate-tr2-3" height="600" />
                  </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                  <h1>Diff-drive Base</h1>
                  {/* mobile */}
                  <div className="row hidden-lg hidden-md hidden-sm"
                    style={Style.iconDescriptionContainer}>
                    <div className="col-xs-4">
                      <img src="/img/icon-gyroscope" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>2 Degrees of Freedom</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-torque" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>Up to 16Nm Torque</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-engine" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>Up to 300W Power</p>
                    </div>
                  </div>
                  {/* icons */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <img src="/img/icon-gyroscope" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-torque" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-engine" height="50" width="50" />
                    </div>
                  </div>
                  {/* icon descriptions */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <p>2 Degrees of Freedom</p>
                    </div>
                    <div className="col-sm-4">
                      <p>Up to 16Nm Torque</p>
                    </div>
                    <div className="col-sm-4">
                      <p>Up to 300W Power</p>
                    </div>
                  </div>
                  <div className="row" style={{textAlign:"justify"}}>
                    <div className="col-xs-12">
                      <p>
                        The diff-drive base of the TR2 is faster than its predecessor. At 4.57km per hour (2.84mi per hour), the TR2 approaches walking speed. The larger, 200mm-diameter wheels also allow the TR2 to more easily go over bumps and inconsistencies in its path. Further, the wheel placement allows for a near-zero degree turn radius, which permits the TR2 to turn in-place for easy, simple navigation.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} className="hidden-sm hidden-xs" src="/img/slate-tr2-3" height="600" />
                    <img style={Style.imageCenter} className="hidden-lg hidden-md" src="/img/slate-tr2-3" height="500" />
                  </div>
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
