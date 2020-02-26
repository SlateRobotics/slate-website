var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "Prototyping - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div>
        <div className="container-fluid" style={Style.containerTop}>
          <div className="row" style={{textAlign:"left"}}>
            <div className="col-md-8 col-xs-12 col-centered" style={{backgroundColor:"rgba(255,255,255,0.7)",paddingTop:"15px",paddingBottom:"15px",borderRadius:"15px"}}>
              <h1>Prototyping by Slate Robotics</h1>
              <h4>Designing and fabrication of electronics, mechanicsms, and robots</h4>
            </div>
          </div>
        </div>
        <div className="container-fluid" style={Style.container}>
          <div className="row" style={{textAlign:"left"}}>
            <div className="col-md-8 col-xs-12 col-centered">
              <div className="col-xs-12" style={{textAlign:"center"}}>
                <div className="row" style={{textAlign:"justify"}}>
                  <div className="col-xs-12">
                    <p>
                      Slate Robotics offers a prototyping service to take your idea from concept to reality. We'll sit down with you to discuss everything you're looking for, discuss what's feasible given your time and budget constraints, and put together a full plan of action for how to make it happen.
                    </p>
                    <p>
                      Our team has an extensive background in designing and building complicated, electro-mechanical systems, and we are particularly skilled in ensuring your prototype has a design that is low-cost, simple to manufacture, and is feature-rich. A prototype that can't be reproduced is unfortunate, after all!
                    </p>
                    <p>
                      We love building new things and working with customers. Reach out today to schedule a free 30-minute consultation over the phone. We'll help you get a better understanding of what's possible given your constraints, and we will provide a full quote via email after the meeting.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <h3 style={{backgroundColor:"#e6e6e6",padding:"25px",borderRadius:"15px"}}>
                    <span>
                      For more information, email{" "}
                    </span>
                    <a href="mailto:zach@slaterobots.com">
                      zach@slaterobots.com
                    </a>
                  </h3>
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
