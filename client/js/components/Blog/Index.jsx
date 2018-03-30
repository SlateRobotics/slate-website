var React = require('react');
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Form = require('../Form/Index.jsx');
var BlogStore = require('../../stores').blog;
var UserStore = require('../../stores').user;

var Component = React.createClass({
  getInitialState: function () {
    return {
      user: '',
      status: 'Active',
      sort: 'Descending By Date',
      search: '',
      blogs: [],
      error: '',
      isLoading: true,
    }
  },

  componentWillMount: function () {
    UserStore.get({
      error: function (error) {
        console.log(error);
      }.bind(this),
      success: function (docs) {
        var user = '';
        if (docs && docs.length > 0) user = docs[0];
        var state = this.state;
        state.user = user;
        this.setState(user);
      }.bind(this),
    });

    BlogStore.get({
      refresh: true,
      error: function (error) {
        var state = this.state;
        state.errors.push({name:"load",message:error});
        state.isLoading = false;
        this.setState(state);
      }.bind(this),
      success: function (docs) {
        var state = this.state;
        state.blogs = docs;
        state.isLoading = false;
        this.setState(state);
      }.bind(this),
    });
  },

  componentDidMount: function () {
    document.title = "Blog - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <h1>Blog | Slate Robotics</h1>
            <h4>
              Tutorials, essays, and company updates.
            </h4>
            {this.getTools()}
            {this.getNewBlogButton()}
          </div>
        </div>
        {this.getBlogs()}
        <div style={{marginTop:"25px"}} />
      </div>
    );
  },

  getTools: function () {
    if (this.state.user.isAdmin) {
      return (
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <Form.Input
              attribute="search"
              placeholder="Search for a blog..."
              value={this.state.search}
              onChange={this.handleChange_Field} />
          </div>
          <div className="hidden-lg hidden-md col-xs-12" style={{marginTop:"10px"}} />
          <div className="col-md-3 col-xs-12">
            <Form.Select
              attribute="sort"
              options={["Ascending By Date","Descending By Date"]}
              value={this.state.sort}
              onChange={this.handleChange_Field} />
          </div>
          <div className="hidden-lg hidden-md col-xs-12" style={{marginTop:"10px"}} />
          <div className="col-md-3 col-xs-12">
            <Form.Select
              attribute="status"
              options={["Active","In Progress","Archive"]}
              value={this.state.status}
              onChange={this.handleChange_Field} />
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-md-9 col-xs-12">
          <Form.Input
            attribute="search"
            placeholder="Search for a blog..."
            value={this.state.search}
            onChange={this.handleChange_Field} />
        </div>
        <div className="hidden-lg hidden-md col-xs-12" style={{marginTop:"10px"}} />
        <div className="col-md-3 col-xs-12">
          <Form.Select
            attribute="sort"
            options={["Ascending By Date","Descending By Date"]}
            value={this.state.sort}
            onChange={this.handleChange_Field} />
        </div>
      </div>
    )
  },

  getNewBlogButton: function () {
    if (this.state.user.isAdmin) {
      return (
        <div style={{marginTop:"10px"}}>
          <Link to="/blog/new">{"New blog"}</Link>
        </div>
      )
    }
  },

  getBlogs: function () {
    var sort = {};
    sort["Ascending By Date"] = function(a,b){return new Date(a.publishedOn) - new Date(b.publishedOn)};
    sort["Descending By Date"] = function(a,b){return new Date(b.publishedOn) - new Date(a.publishedOn)};

    var blogs = this.state.blogs;
    if (this.state.status != "") {
      blogs = blogs.filter(function (blog) {
        return blog.status == this.state.status;
      }.bind(this));
    }

    if (this.state.search) {
      var search = this.state.search.toLowerCase();
      blogs = blogs.filter(function (blog) {
        var title = blog.title.toLowerCase().includes(search);
        var subtitle = blog.subtitle.toLowerCase().includes(search);
        //var body = blog.body.toLowerCase().includes(search);
        return title || subtitle;
      }.bind(this));
    }

    return blogs.sort(sort[this.state.sort]).map(function (blog, i) {
      var friendlyTitle = blog.title;
      //friendlyTitle = friendlyTitle.substring(0,35);
      friendlyTitle = friendlyTitle.toLowerCase();
      friendlyTitle = friendlyTitle.split(" ").join("-");
      friendlyTitle = friendlyTitle.split("/").join("-");
      friendlyTitle = friendlyTitle.split("?").join("-");
      friendlyTitle = friendlyTitle.split(".").join("-");
      friendlyTitle = friendlyTitle.split(":").join("-");
      friendlyTitle = friendlyTitle.split("@").join("-");
      friendlyTitle = friendlyTitle.split("=").join("-");
      friendlyTitle = friendlyTitle.split("&").join("-");
      friendlyTitle = friendlyTitle.split("<").join("-");
      friendlyTitle = friendlyTitle.split(">").join("-");
      friendlyTitle = friendlyTitle.split("#").join("-");
      friendlyTitle = friendlyTitle.split("%").join("-");
      friendlyTitle = friendlyTitle.split("{").join("-");
      friendlyTitle = friendlyTitle.split("}").join("-");
      friendlyTitle = friendlyTitle.split("|").join("-");
      friendlyTitle = friendlyTitle.split("^").join("-");
      friendlyTitle = friendlyTitle.split("~").join("-");
      friendlyTitle = friendlyTitle.split("[").join("-");
      friendlyTitle = friendlyTitle.split("]").join("-");
      friendlyTitle = friendlyTitle.split("`").join("-");
      friendlyTitle = friendlyTitle.split("\\").join("-");
      friendlyTitle = friendlyTitle.split("\"").join("-");
      var url = "/blog/" + blog._id + "/" + friendlyTitle;

      var getPublishedOnString = function (publishedOn) {
        if (!publishedOn) return;
        publishedOn = new Date(publishedOn);
        return publishedOn.toLocaleDateString();
      }

      var getTitle = function () {
        var title = blog.title;
        if (blog.status == "In Progress") title = "*" + title;
        return title;
      }

      var getDetails = function () {
        if (blog.status == "In Progress") {
          return "By " + blog.by + ", currently in progress.";
        }
        return "By " + blog.by + ", published on " + getPublishedOnString(blog.publishedOn);
      }

      var toBlog = function () {BrowserHistory.push(url);}
      return (
        <div key={blog._id} className="row">
          <div className="col-md-8 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <div style={{margin:"10px",borderTop:"1px solid #ccc"}} />
            <div className="row">
              <div className="col-lg-2 col-md-3 col-xs-12" style={{
                  backgroundImage:"url(" + blog.img + ")",
                  backgroundSize:"cover",
                  backgroundPositionX:"center",
                  backgroundPositionY:"top",
                  backgroundColor:"#222",
                  height:"150px",
                  cursor:"pointer",
                }} onClick={toBlog}>
              </div>
              <div className="col-lg-10 col-md-9 col-xs-12">
                <h2><Link to={url}>{getTitle()}</Link></h2>
                <p>{blog.subtitle}</p>
                <div style={{fontStyle:"italic"}}>
                  {getDetails()}
                </div>
              </div>
            </div>
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
});

module.exports = Component;
