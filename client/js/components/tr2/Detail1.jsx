var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    var s1 = {
      heading: "Life-Sized",
      img: "/img/slate-tr2-7",
      iconImgs: ["/img/icon-weights","/img/icon-range","/img/icon-engine"],
      iconLbls: ["47\" Tall", "26\" Wide", "2.8 mi/hr"],
      text: "Built for the human world. The TR2 is capable of maneuvering rooms, buildings, and houses. The arm is installed high enough to easily work off of most tables and work areas, and the base is narrow enough to easily fit through doors and passageways. Large enough to get work done -- small enough to be practical."
    }

    var s2 = {
      heading: "Back-Drivable Arm",
      img: "/img/slate-tr2-8",
      iconImgs: ["/img/icon-hand","/img/icon-record","/img/icon-play"],
      iconLbls: ["Physical Positioning", "Waypoint Recording", "Waypoint Playback"],
      text: "Intuitive control and positioning. The TR2 was designed for backdriveability, which allows the user to physically move and position the arm into location. This is abundantly valuable when teaching the robot how to perform tasks and recording waypoints for playback."
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
