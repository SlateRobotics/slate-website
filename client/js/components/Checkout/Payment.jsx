var React = require('react');
var Style = require('./Style.jsx');
var CartStore = require('../../stores').cart;

var Component = React.createClass({
  getInitialState: function () {
    return {
      error: '',
    }
  },

  componentDidMount: function () {
    this.props.card.mount('#card-element');
    this.props.card.addEventListener('change', this.handleChange_CardElement);
  },

  componentWillUnmount: function () {
    this.props.card.removeEventListener('change', this.handleChange_CardElement);
  },

  render: function() {
    return (
      <div className="row" style={{textAlign:"left"}}>
        <div className="col-lg-8 col-md-10 col-xs-12 col-centered">
          <img
            src="/img/powered-by-stripe"
            className="hidden-xs"
            style={{float:"right"}} />
          <h2>Credit/Debit Card</h2>
          <img
            src="/img/powered-by-stripe"
            className="hidden-lg hidden-md hidden-sm"
            style={{paddingBottom:"15px"}} />
          <div className="row">
            <div className="col-xs-12">
              <div style={{backgroundColor:"#f9f9f9",height:"80px",border:"1px solid #ccc"}}>
                <div id="card-element" style={{margin:"10px 15px",backgroundColor:"#fff",padding:"15px",border:"1px solid #eee"}}></div>
              </div>
              <div role="alert" style={{lineHeight:"35px"}}>
                {this.state.error}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleChange_CardElement: function (event) {
    var state = this.state;

    if (event.error) {
      state.error = event.error.message;
    } else {
      state.error = "";
    }

    this.setState(state);
  },
});

module.exports = Component;
