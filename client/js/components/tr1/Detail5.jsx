var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="container-fluid" style={Style.detail5Container}>
          <div className="row">
            <div className="col-lg-10 col-xs-12 col-centered">
              <div className="row" style={{borderTop:"1px solid #ccc",paddingTop:"75px"}} />
              <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12">
                  <img src="/img/icon-warranty" style={{height:"75px",width:"75px"}} />
                  <h3>1 Year Warranty</h3>
                  <p>
                    The TR1 is backed by a 1 year warranty in the event that
                    parts break or gears strip.
                  </p>
                  <Link to="/sales-policies" style={{color:"#fff"}}>
                    {"Learn more >"}
                  </Link>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{marginTop:"25px"}} />
                <div className="col-md-3 col-sm-6 col-xs-12">
                  <img src="/img/icon-support" style={{height:"75px",width:"75px"}} />
                  <h3>Technical Support</h3>
                  <p>
                    Free technical support is available everyday from
                    7:30 AM to midnight CST.
                  </p>
                  <Link to="/support" style={{color:"#fff"}}>
                    {"Learn more >"}
                  </Link>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{marginTop:"25px"}} />
                <div className="col-md-3 col-sm-6 col-xs-12">
                  <img src="/img/icon-open-source" style={{height:"75px",width:"75px"}} />
                  <h3>Open Platform</h3>
                  <p>
                    All code is open source, and CAD files are freely
                    available under a Creative Commons license.
                  </p>
                  <a href="https://github.com/slaterobotics" target="_blank" style={{color:"#fff"}}>
                    {"View GitHub >"}
                  </a>
                </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{marginTop:"25px"}} />
                <div className="col-md-3 col-sm-6 col-xs-12">
                  <img src="/img/icon-chat" style={{height:"75px",width:"75px"}} />
                  <h3>Questions?</h3>
                  <p>
                    Let us help! Click the button below to start a live chat
                    with a representative.
                  </p>
                  <a href="https://tawk.to/chat/59b4bf6bc28eca75e461f241/default/?$_tawk_popout=true" target="_blank" style={{color:"#fff"}}>
                    {"Chat >"}
                  </a>
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
