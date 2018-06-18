var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Link = require('react-router').Link;
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var UserStore = require('../../stores').user;

var Component = React.createClass({
  getInitialState: function () {
    return {
      user: '',
      users: [],
      search: '',
      sort: 'Descending By Date',
    }
  },

  componentWillMount: function () {
    UserStore.addChangeListener(this.handleChange_UserStore);
		UserStore.get({
      refresh: true,
      success: function (data) {
  			var state = this.state;
  			state.users = data;
  			this.setState(state);
      }.bind(this),
    });
  },

  componentDidMount: function () {
    document.title = "Admin - Users - Slate Robotics";
    window.scrollTo(0,0);
  },

  componentWillUnmount: function () {
		UserStore.removeChangeListener(this.handleChange_UserStore);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Users</h1>
          </div>
        </div>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-8 col-xs-12">
                <Form.Input
                  attribute="search"
                  placeholder="Search for a user..."
                  value={this.state.search}
                  onChange={this.handleChange_Field} />
              </div>
              <div className="hidden-lg hidden-md col-xs-12" style={{marginTop:"10px"}} />
              <div className="col-md-4 col-xs-12">
                <Form.Select
                  attribute="sort"
                  options={["Ascending By Date","Descending By Date"]}
                  value={this.state.sort}
                  onChange={this.handleChange_Field} />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            {this.getReservations()}
          </div>
        </div>
      </div>
    );
  },

  getReservations: function () {
    var sort = {};
    sort["Ascending By Date"] = function(a,b){return new Date(a.createdOn) - new Date(b.createdOn)};
    sort["Descending By Date"] = function(a,b){return new Date(b.createdOn) - new Date(a.createdOn)};

    var users = this.state.users;
    if (this.state.search) {
      var search = this.state.search.toLowerCase();
      users = users.filter(function (user) {
        var firstName = user.firstName.toLowerCase().includes(search);
        var lastName = user.lastName.toLowerCase().includes(search);
        var email = user.email.toLowerCase().includes(search);
        return email || firstName || lastName;
      }.bind(this));
    }

    return users.sort(sort[this.state.sort]).map(function (user, i) {

        return (
          <div className="row" key={"reservation-" + i} style={{fontSize:"12px", textAlign:"left", paddingBottom:"15px", marginBottom:"15px", borderBottom:"1px solid #ccc"}}>
            <div className="col-xs-12" style={{marginBottom:"15px"}}>
              <h4 style={{display:"inline"}}>{user.email}</h4>
              <span> | </span>
              <Link to={"/admin/users/" + user._id} style={Style.link}>edit</Link>
            </div>
            <div className="col-xs-12" style={{marginBottom:"15px"}}>
              <div>{"First Name: " + user.firstName}</div>
              <div>{"Last Name: " + user.lastName}</div>
              <div>{"Is Admin: " + user.isAdmin}</div>
              <div>{"Created On: " + new Date(user.createdOn).toLocaleString()}</div>
            </div>
          </div>
        )
      });
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
  },

	handleChange_UserStore: function () {
		var users = UserStore.find();
		if (users.length > 0) {
			var state = this.state;
			state.user = users[0];
			this.setState(state);
		}
	},
});

module.exports = Component;
