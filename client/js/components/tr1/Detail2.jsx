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
                  <div className="hidden-xs" style={{paddingTop:"150px"}}></div>
                  <h1>Actuated Torso</h1>
                  {/* mobile */}
                  <div className="row hidden-lg hidden-md hidden-sm"
                    style={Style.iconDescriptionContainer}>
                    <div className="col-xs-4">
                      <img src="/img/icon-up" height="50" width="50" />
                      <p>300mm Extension</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-force" height="50" width="50" />
                      <p>1.5kN Force</p>
                    </div>
                    <div className="col-xs-4">
                      <img src="/img/icon-switch" height="50" width="50" />
                      <p>Integrated Limit Switches</p>
                    </div>
                  </div>
                  {/* icons */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <img src="/img/icon-up" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-force" height="50" width="50" />
                    </div>
                    <div className="col-sm-4">
                      <img src="/img/icon-switch" height="50" width="50" />
                    </div>
                  </div>
                  {/* icon descriptions */}
                  <div className="row hidden-xs" style={Style.iconDescriptionContainer}>
                    <div className="col-sm-4">
                      <p>300mm Extension</p>
                    </div>
                    <div className="col-sm-4">
                      <p>1.5kN Force</p>
                    </div>
                    <div className="col-sm-4">
                      <p>Integrated Limit Switches</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 col-xs-12" style={{height:"600px",padding:"0"}}>
                  <div style={Style.imageContainer}>
                    <img style={Style.imageCenter} src="/img/slate-tr1-4" height="600" />
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
