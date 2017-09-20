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
                  <h1>7-Axis Arms</h1>
                  {/* mobile */}
                  <div className="row hidden-lg hidden-md hidden-sm"
                    style={Style.iconDescriptionContainer}>
                    <div className="col-xs-4">
                      <img src="/img/icon-gyroscope" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>7 Degrees of Freedom</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-weights" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>4.5kg Payload</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-range" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>1m Range</p>
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
                      <p>7 Degrees of Freedom</p>
                    </div>
                    <div className="col-sm-4">
                      <p>4.5kg Payload</p>
                    </div>
                    <div className="col-sm-4">
                      <p>1m Range</p>
                    </div>
                  </div>
                  <div className="row" style={{textAlign:"justify"}}>
                    <div className="col-xs-12">
                      <p>
                        The arms on the Slate TR1 are powered by stepper motors
                        and servos. The wrist and gripper are servo-actuated, and
                        the remaining joints are actuated by stepper motors.
                      </p>
                      <p>
                        The joint at the bottom of the shoulder as well as the connection
                        between the bicep and forearm can rotate 360 degrees.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 col-xs-12" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src="/img/slate-tr1-2" height="600" />
                  </div>
                </div>
              </div>
              <div className="row" style={{marginTop:"35px"}}>
                <div className="col-sm-8 hidden-xs" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src="/img/slate-tr1-3" height="600" />
                  </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                  <h1>Omni-drive Base</h1>
                  {/* mobile */}
                  <div className="row hidden-lg hidden-md hidden-sm"
                    style={Style.iconDescriptionContainer}>
                    <div className="col-xs-4">
                      <img src="/img/icon-gyroscope" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>3 Degrees of Freedom</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-torque" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>6Nm Torque</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-engine" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>75W Power</p>
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
                      <p>3 Degrees of Freedom</p>
                    </div>
                    <div className="col-sm-4">
                      <p>6Nm Torque</p>
                    </div>
                    <div className="col-sm-4">
                      <p>75W Power</p>
                    </div>
                  </div>
                  <div className="row" style={{textAlign:"justify"}}>
                    <div className="col-xs-12">
                      <p>
                        The omni-drive base is capable of translating across both
                        the x and y axis, and as a result, it can drive side-to-side
                        and diagonally.
                      </p>
                      <p>
                        The major benefit of working with the omni-drive base is
                        that the robot can very easily work along multiple areas
                        of a counter-top or table. A two-wheel differential-drive
                        robot would require several extra maneuvers to accomplish the
                        same task.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src="/img/slate-tr1-3" height="600" />
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
