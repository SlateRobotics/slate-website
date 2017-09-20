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
                  <img src="/img/icon-info" style={{height:"75px",width:"75px"}} />
                  <h2 style={{paddingBottom:"25px"}}>
                    What is it?
                  </h2>
                  <div style={{textAlign:"left"}}>
                    <p>
                      A robot development platform.
                    </p>
                    <p>
                      It is human-sized and mobile, so that it can work in a
                      variety of human environments. The embedded computer features
                      an integrated GPU and CUDA computing platform, which makes
                      it perfect for vision, machine learning, and AI tasks.
                    </p>
                  </div>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{marginTop:"25px"}} />
                <div className="col-md-4 col-xs-12">
                  <img src="/img/icon-person" style={{height:"75px",width:"75px"}} />
                  <h2 style={{paddingBottom:"25px"}}>
                    Who is it for?
                  </h2>
                  <div style={{textAlign:"left"}}>
                    <p>
                      Programmers.
                    </p>
                    <p>
                      The robot will feel intimately familiar to anyone who has
                      spun up an EC2 instance, programmed a Node.js server, or
                      trained a CNN in TensorFlow—even better if you've done all
                      three.
                    </p>
                  </div>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{marginTop:"25px"}} />
                <div className="col-md-4 col-xs-12">
                  <img src="/img/icon-money" style={{height:"75px",width:"75px"}} />
                  <h2 style={{paddingBottom:"25px"}}>
                    Why buy it?
                  </h2>
                  <div style={{textAlign:"left"}}>
                    <p>
                      It's challenging.
                    </p>
                    <p>
                      The Slate TR1 lets you work on challenging problems that are
                      unique to human-scale robotics, and the solutions to these
                      problems will shape the world over the coming decades. Also,
                      it{"'"}s exhilarating to train a CNN that your robot uses to
                      detect and pick up obstacles around your house!
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
