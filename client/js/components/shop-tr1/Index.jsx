var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ConfigItem = require('./ConfigItem.jsx');

var basePrice = 2499;
var computer = [0, 300, 400];
var computerName = ["NVIDIA Jetson TK1", "NVIDIA Jetson TX1", "NVIDIA Jetson TX2"];
var linearActuator = [0, 50];
var linearActuatorName = ["12in 5.7mm/s Linear Actuator", "12in 10mm/s Linear Actuator"];
var battery = [0, 30];
var batteryName = ["12V 8AH Lead-Acid Battery", "12V 20AH Lead-Acid Battery"];

var Component = React.createClass({
  getInitialState: function () {
    return {
      computer: 0,
      linearActuator: 0,
      battery: 0,
    }
  },

  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" className="hidden-xs" style={Style.menu}>
          <span style={{fontSize:"24px"}}>TR1</span>
          {" ― "}
          <Link to="/tr1">Overview</Link>
          {" | "}
          <Link to="/tr1/specs">Specs</Link>
          {" | "}
          <span style={{color:"#666",cursor:"default"}}>Buy</span>
        </div>
        <div className="row" className="hidden-lg hidden-md hidden-sm" style={Style.menuMobile}>
          <Link to="/tr1">Overview</Link>
          {" | "}
          <Link to="/tr1/specs">Specs</Link>
          {" | "}
          <span style={{color:"#666",cursor:"default"}}>Buy</span>
        </div>
        <div className="row" style={{marginTop:"34px"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row" style={{paddingBottom:"30px"}}>
              <div className="col-xs-12" style={{padding:"5px 0px",color:"#da383c"}}>
                <b>
                  NOTE: TR1 begins shipment 11/15/2017
                  <br />
                  Current, estimated delivery is 12/20/2017
                </b>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12 hidden-xs">
                <img src="/img/slate-tr1-specs-2" style={{height:"400px",maxWidth:"100%"}} />
                <div className="hidden-lg hidden-md" style={{paddingBottom:"15px"}} />
              </div>
                <div className="hidden-lg hidden-md hidden-sm col-xs-12">
                  <img src="/img/slate-tr1-specs-2" style={{minHeight:"300px",maxHeight:"400px",maxWidth:"100%"}} />
                  <div style={{paddingBottom:"15px"}} />
                </div>
              <div className="col-md-6 col-xs-12" style={{textAlign:"left"}}>
                <div style={{paddingBottom:"25px",borderBottom:"1px solid #ccc"}}>
                  <h1 style={{marginTop:"0px"}}>TR1.config</h1>
                  <div style={{lineHeight:"150%"}}>
                    <div style={{color:"#aaa"}}>Base Price ($2,499.00)</div>
                    <div>{this.getOverviewText(this.state.computer, computerName, computer)}</div>
                    <div>{this.getOverviewText(this.state.linearActuator, linearActuatorName, linearActuator)}</div>
                    <div>{this.getOverviewText(this.state.battery, batteryName, battery)}</div>
                  </div>
                  <div style={{paddingTop:"15px"}}>
                    <h4>{this.getTotalString()}</h4>
                    <ButtonPrimary
                      label={"Checkout"}
                      onClick={this.handleClick_Checkout} />
                  </div>
                </div>
                <div style={{paddingBottom:"25px",borderBottom:"1px solid #ccc"}}>
                  <h3>Computer</h3>
                  <ConfigItem
                    label="NVIDIA Jetson TK1"
                    value={computer[0]}
                    isSelected={this.state.computer == 0}
                    category="computer"
                    index={0}
                    onClick={this.handleClick_ConfigItem} />
                  <ConfigItem
                    label="NVIDIA Jetson TX1"
                    value={computer[1]}
                    isSelected={this.state.computer == 1}
                    category="computer"
                    index={1}
                    onClick={this.handleClick_ConfigItem} />
                  <ConfigItem
                    label="NVIDIA Jetson TX2"
                    value={computer[2]}
                    isSelected={this.state.computer == 2}
                    category="computer"
                    index={2}
                    onClick={this.handleClick_ConfigItem} />
                </div>
                <div style={{paddingBottom:"25px",borderBottom:"1px solid #ccc"}}>
                  <h3>Linear Actuator</h3>
                  <ConfigItem
                    label="12in 5.7mm/s Linear Actuator"
                    value={linearActuator[0]}
                    isSelected={this.state.linearActuator == 0}
                    category="linearActuator"
                    index={0}
                    onClick={this.handleClick_ConfigItem} />
                  <ConfigItem
                    label="12in 10mm/s Linear Actuator"
                    value={linearActuator[1]}
                    isSelected={this.state.linearActuator == 1}
                    category="linearActuator"
                    index={1}
                    onClick={this.handleClick_ConfigItem} />
                </div>
                <div style={{paddingBottom:"25px",borderBottom:"1px solid #ccc"}}>
                  <h3>Battery</h3>
                  <ConfigItem
                    label="12V 8AH Lead-Acid Battery"
                    value={battery[0]}
                    isSelected={this.state.battery == 0}
                    category="battery"
                    index={0}
                    onClick={this.handleClick_ConfigItem} />
                  <ConfigItem
                    label="12V 20AH Lead-Acid Battery"
                    value={battery[1]}
                    isSelected={this.state.battery == 1}
                    category="battery"
                    index={1}
                    onClick={this.handleClick_ConfigItem} />
                </div>
                <div style={{paddingBottom:"35px"}}>
                  <h3>{this.getTotalString()}</h3>
                  <ButtonPrimary
                    label={"Checkout"}
                    onClick={this.handleClick_Checkout} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleClick_ConfigItem: function (item) {
    var state = this.state;
    state[item.category] = item.index;
    this.setState(state);
  },

  handleClick_Checkout: function () {
    alert("We're still building out the website, and payment processing is currently #1 on our to-do list. Please check back in one or two days!")
  },

  getOverviewText: function (index, arrayName, arrayPrice) {
    if (index == 0) {
      return (
        <span>{arrayName[index]}</span>
      )
    } else {
      var value = arrayPrice[index].toLocaleString('en-US', { minimumFractionDigits: 2 });
      return (
        <b>{arrayName[index] + " (+$" + value + ")"}</b>
      )
    }
  },

  getTotal: function () {
    return basePrice
      + computer[this.state.computer]
      + linearActuator[this.state.linearActuator]
      + battery[this.state.battery];
  },

  getTotalString: function () {
    var total = this.getTotal();
    return "$" + total.toLocaleString('en-US', { minimumFractionDigits: 2 });
  },
});

module.exports = Component;
