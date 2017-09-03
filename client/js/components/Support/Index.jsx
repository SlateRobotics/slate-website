var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{
            paddingTop:"140px",
            paddingBottom:"150px",
            color:"white",
            backgroundImage:"url('/img/slate-tr1-1')",
            backgroundSize:"cover",
            backgroundPosition: "center top",
          }}>
          <div className="col-xs-12" style={{backgroundColor:"rgba(34,34,34,0.3)"}}>
            <h1 style={{fontSize:"95px"}} className="hidden-xs">
              Slate TR1
            </h1>
            <h1 style={{fontSize:"72px"}} className="hidden-lg hidden-md hidden-sm">
              Slate TR1
            </h1>
            <h4 style={{fontSize:"32px"}}>
              The first, human-sized robot for hackers
            </h4>
            <div style={Style.buttonContainer}>
              <ButtonPrimary
                label={"Pre-order the TR1"}
                onClick={this.handleClick_PreOrder} />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
