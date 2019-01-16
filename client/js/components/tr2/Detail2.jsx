var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="container-fluid" style={Style.detail2Container}>
          <div className="row">
            <div className="col-lg-10 col-xs-12 col-centered">
              <div className="row">
                <div className="col-sm-4 col-xs-12">
                  <div className="hidden-xs" style={{paddingTop:"50px"}}></div>
                  <h1>Powerful Actuators</h1>
                  {/* mobile */}
                  <div className="row hidden-lg hidden-md hidden-sm"
                    style={Style.iconDescriptionContainer}>
                    <div className="col-xs-4">
                      <img src="/img/icon-torque-black" height="50" width="50" />
                      <p>30Nm Torque Output</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-range-black" height="50" width="50" />
                      <p>0.12 Degrees Precision</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-gyroscope-black" height="50" width="50" />
                      <p>Torque Directionality Sensing</p>
                    </div>
                  </div>
                  {/* icons */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <img src="/img/icon-torque-black" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-range-black" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-gyroscope-black" height="50" width="50" />
                    </div>
                  </div>
                  {/* icon descriptions */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <p>30Nm Torque Output</p>
                    </div>
                    <div className="col-sm-4">
                      <p>0.12 Degrees Precision</p>
                    </div>
                    <div className="col-sm-4">
                      <p>Torque Directionality Sensing</p>
                    </div>
                  </div>
                  <div className="row" style={{textAlign:"justify"}}>
                    <div className="col-xs-12">
                      <p>
                        TR2's actuators were designed from the ground-up with a core design principle: simplicity is key. We've eliminated over 85% of the number of parts over the TR1, which makes these actuators unbelieveably reliable.
                      </p>
                      <p>
                        Dozens of design iterations have allowed us to arrive at the perfect design. The TR2 actuator is supported by a 1/2" steel shaft, which can support massive lateral forces to the joint and also allows wires to run through the center of the actuator. Each actuator has a built-in slip ring that transports power and communication lines while enabling continuous, 360-degree rotation--forever, and ever, and ever.
                      </p>
                      <p>
                        The TR2 actuators have built-in motor drivers, an Arduino nano microcontroller, a high-precision angle encoder, and best of all: torque directionality sensors! Torque directionality sensors allow the actuators to estimate the direction and--to a small degree--magnitude of torque that is being applied to the actuator. This feature allows for backdriveability and manually turning the actuators by hand.
                      </p>
                      <p>
                        Outstanding reliability. Incredible performance. Innovative features.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 col-xs-12" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src="/img/tr2-actuator-2" height="600" />
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
