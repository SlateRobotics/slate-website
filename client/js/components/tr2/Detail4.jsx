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
                <div className="col-sm-8 hidden-xs" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src="/img/ubuntu" height="600" />
                  </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                  <div className="hidden-xs" style={{paddingTop:"150px"}}></div>
                  <h1>Ubuntu Linux</h1>
                  <h3>Operating System</h3>
                  {/* mobile */}
                  <div className="row hidden-lg hidden-md hidden-sm"
                    style={Style.iconDescriptionContainer}>
                    <div className="col-xs-4">
                      <img src="/img/icon-open-source" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>Open Source</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-ssh" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>SSH Access</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-vnc" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>VNC Access</p>
                    </div>
                  </div>
                  {/* icons */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <img src="/img/icon-open-source" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-ssh" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-vnc" height="50" width="50" />
                    </div>
                  </div>
                  {/* icon descriptions */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <p>Open Source</p>
                    </div>
                    <div className="col-sm-4">
                      <p>SSH Access</p>
                    </div>
                    <div className="col-sm-4">
                      <p>VNC Access</p>
                    </div>
                  </div>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src="/img/ubuntu" height="600" />
                  </div>
                </div>
              </div>
              <div className="row" style={{marginTop:"35px"}}>
                <div className="col-sm-4 col-xs-12">
                  <div className="hidden-xs" style={{paddingTop:"150px"}}></div>
                  <h1>NVIDIA Jetson</h1>
                  <h3>Embedded Development System</h3>
                  {/* mobile */}
                  <div className="row hidden-lg hidden-md hidden-sm"
                    style={Style.iconDescriptionContainer}>
                    <div className="col-xs-4">
                      <img src="/img/icon-chip" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>Up to 8GB 128 bit memory</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-cuda" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>CUDA Platform</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-wifi" height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>Wifi + Bluetooth</p>
                    </div>
                  </div>
                  {/* icons */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <img src="/img/icon-chip" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-cuda" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-wifi" height="50" width="50" />
                    </div>
                  </div>
                  {/* icon descriptions */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <p>Up to 8GB 128 bit memory</p>
                    </div>
                    <div className="col-sm-4">
                      <p>CUDA Parallel Computing Platform</p>
                    </div>
                    <div className="col-sm-4">
                      <p>Wifi + Bluetooth Connectivity</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 col-xs-12" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src="/img/nvidia-jetson-tx1" height="600" />
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
