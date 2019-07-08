var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    var s1 = {
      heading: "1kg Payload",
      img: "/img/slate-tr2-10",
      iconImgs: ["/img/icon-range","/img/icon-motor","/img/icon-range"],
      iconLbls: ["850mm Reach", "Continuous Rotation", "75mm Gripper Opening"],
      text: "Strength for real-world application. The TR2 is capable of picking up and manipulating objects up to 1kg (2.2 lbs) in weight. This allows users to develop applications that work with a wide variety of tools and objects. The TR2 also features up to 24 hrs of gripper hold duration. Domestic chores are no match for this superior machine."
    }

    var s2 = {
      heading: "CPU + GPU",
      img: "/img/slate-tr2-11",
      iconImgs: ["/img/icon-app","/img/icon-gaussian","/img/icon-neural-net"],
      iconLbls: ["Application Development", "Image Pocessing", "Machine Learning Deployment"],
      text: "GPU for image processing and machine learning. The TR2 is equipped with NVIDIA's Jetson platform that gives the robot on-board computation and GPU processing. This makes the TR2 the ideal platform for machine learning professionals and engineers. You can develop applications straight on the computer through the Ubuntu desktop environment or SSH into the machine remotely. You'll love the development experience."
    }

    return (
      <div className="row">
        <div className="container-fluid" style={Style.detail4Container}>
          <div className="row">
            <div className="col-lg-10 col-xs-12 col-centered">
              <div className="row">
                <div className="col-sm-4 col-xs-12">
                  <h1>{s1.heading}</h1>
                  {/* mobile */}
                  <div className="row hidden-lg hidden-md hidden-sm"
                    style={Style.iconDescriptionContainer}>
                    <div className="col-xs-4">
                      <img src={s1.iconImgs[0]} height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>{s1.iconLbls[0]}</p>
                    </div>
                    <div className="col-xs-4">
                      <img src={s1.iconImgs[1]} height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>{s1.iconLbls[1]}</p>
                    </div>
                    <div className="col-xs-4">
                      <img src={s1.iconImgs[2]} height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>{s1.iconLbls[2]}</p>
                    </div>
                  </div>
                  {/* icons */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <img src={s1.iconImgs[0]} height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src={s1.iconImgs[1]} height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src={s1.iconImgs[2]} height="50" width="50" />
                    </div>
                  </div>
                  {/* icon descriptions */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <p>{s1.iconLbls[0]}</p>
                    </div>
                    <div className="col-sm-4">
                      <p>{s1.iconLbls[1]}</p>
                    </div>
                    <div className="col-sm-4">
                      <p>{s1.iconLbls[2]}</p>
                    </div>
                  </div>
                  <div className="row" style={{textAlign:"justify"}}>
                    <div className="col-xs-12">
                      <p>{s1.text}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 col-xs-12" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src={s1.img} height="600" />
                  </div>
                </div>
              </div>
              <div className="row" style={{marginTop:"35px"}}>
                <div className="col-sm-8 hidden-xs" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src={s2.img} height="600" />
                  </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                  <h1>{s2.heading}</h1>
                  {/* mobile */}
                  <div className="row hidden-lg hidden-md hidden-sm"
                    style={Style.iconDescriptionContainer}>
                    <div className="col-xs-4">
                      <img src={s2.iconImgs[0]} height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>{s2.iconLbls[0]}</p>
                    </div>
                    <div className="col-xs-4">
                      <img src={s2.iconImgs[1]} height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>{s2.iconLbls[1]}</p>
                    </div>
                    <div className="col-xs-4">
                      <img src={s2.iconImgs[2]} height="50" width="50" />
                      <div style={{marginTop:"5px"}}></div>
                      <p>{s2.iconLbls[2]}</p>
                    </div>
                  </div>
                  {/* icons */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <img src={s2.iconImgs[0]} height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src={s2.iconImgs[1]} height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src={s2.iconImgs[2]} height="50" width="50" />
                    </div>
                  </div>
                  {/* icon descriptions */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <p>{s2.iconLbls[0]}</p>
                    </div>
                    <div className="col-sm-4">
                      <p>{s2.iconLbls[1]}</p>
                    </div>
                    <div className="col-sm-4">
                      <p>{s2.iconLbls[2]}</p>
                    </div>
                  </div>
                  <div className="row" style={{textAlign:"justify"}}>
                    <div className="col-xs-12">
                      <p>{s2.text}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src={s2.img} height="600" />
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
