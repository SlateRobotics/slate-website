var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="container-fluid" style={Style.detail1Container}>
          <div className="row" style={{paddingTop:"75px"}}>
            <div className="col-lg-10 col-xs-12 col-centered">
              <div className="row" style={{borderTop:"1px solid #ccc",paddingTop:"75px"}} />
              <div className="row">
                <div className="col-md-4 col-xs-12">
                  <img src="/img/icon-puzzle-piece" style={{height:"75px",width:"75px"}} />
                  <h2 style={{paddingBottom:"25px"}}>
                    Extensibile
                  </h2>
                  <div style={{textAlign:"justify"}}>
                    <p>
                      You can easily add other devices and sensors onto the TR1.
                      The TR1 has a built-in USB hub; Wifi, Bluetooth, and ethernet
                      ports; and an I2C bus. All of this makes adding peripherals
                      and other sensors straight forward and easy to do.
                    </p>
                    <p>
                      Add LIDAR sensors to the base for improved mapping and navigation.
                      Run your algorithms on a seperate, dedicated machine for
                      improved performance. Integrate RFID sensors into the grippers
                      for item scanning and validation. There is are no limits
                      in your way!
                    </p>
                  </div>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{marginTop:"25px"}} />
                <div className="col-md-4 col-xs-12">
                  <img src="/img/icon-ros-2.png" style={{height:"75px", width:"75px"}} />
                  <h2 style={{paddingBottom:"25px"}}>
                    ROS Support
                  </h2>
                  <div style={{textAlign:"justify"}}>
                    <p>
                      We know that ROS is one of the most important assets for
                      anyone programming robots, which is why have gone to great
                      lengths to build and maintain a multitude of ROS packages
                      that lay the ground work for your development efforts.
                    </p>
                    <p>
                      tr1_hardware_interface, tr1_moveit_config, and tr1_description
                      are open-source packages among the most principle building
                      blocks for programming with ROS on the TR1. Together, they
                      provide tools for controlling, visualizing, and planning
                      the robot right out of the box.
                    </p>
                    <p>
                      {"All packages are open source and available on our "}
                      <a href="https://github.com/SlateRobotics?q=ros">GitHub page</a>
                      {"."}
                    </p>
                  </div>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{marginTop:"25px"}} />
                <div className="col-md-4 col-xs-12">
                  <img src="/img/icon-axe" style={{height:"75px",width:"75px"}} />
                  <h2 style={{paddingBottom:"25px"}}>
                    Hacker-friendly
                  </h2>
                  <div style={{textAlign:"justify"}}>
                    <p>
                      Hackers will feel right at home with the TR1. While other
                      development platforms build their own IDEs and interfaces for
                      programming their robots—presumably to make it easier for
                      non-programmers to program—we have left the platform
                      completely open and hackable.
                    </p>
                    <p>
                      If you can do it on your laptop, you will be able to
                      do it on the TR1.
                    </p>
                  </div>
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
