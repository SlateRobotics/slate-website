var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "3D Printing - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div>
        <div className="container-fluid" style={Style.containerTop}>
          <div className="row" style={{textAlign:"left"}}>
            <div className="col-md-8 col-xs-12 col-centered" style={{backgroundColor:"rgba(255,255,255,0.7)",paddingTop:"15px",paddingBottom:"15px",borderRadius:"15px"}}>
              <h1>3D Printing by Slate Robotics</h1>
              <h4>The only affordable option for large prints!</h4>
            </div>
          </div>
        </div>
        <div className="container-fluid" style={Style.container}>
          <div className="row" style={{textAlign:"left"}}>
            <div className="col-md-8 col-xs-12 col-centered">
              <p>
                Traditional pricing models for 3D printing services makes it
                entirely cost-prohibitive for large-volume prints. This is because almost all
                services charge by unit volume of material, which is designed
                to recoup operating costs as well as printing material costs.
                This makes their gross margins explode exponentially as the
                volume of the print increases.
              </p>
              <p>
                The only fair way to charge for large-volume prints is to charge
                material costs and operating costs seperately. In order to
                achieve this, we quote by estimating the weight of materials
                used as well as the duration of printing. In other words, materials +
                $1.50 per hour of printing. In some cases, this can mean{" "}
                <a target="_blank" href="https://twitter.com/SlateRobotics/status/965688728403562497">
                  thousands of dollars in savings
                </a>.
              </p>
              <p>
                In addition to great prices, we offer these important features:
              </p>
              <ul>
                <li>Up to 500x500x500mm (20x20x20{"\""}) print volume</li>
                <li>Climate-controlled enclosures, great ABS printing</li>
                <li>24 to 48 hour shipping time for most orders</li>
                <li>Free print post-processing: filling, sanding, and painting</li>
              </ul>
              <h3>
                <span>
                  For a quote, email{" "}
                </span>
                <a href="mailto:zach@slaterobots.com">
                  zach@slaterobots.com
                </a>
                {" "}
                <span>
                  with your 3D models in 3MF, OBJ or STL file
                  formats.
                </span>
              </h3>
              <p>We look forward to working with you!</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
