var React = require('react');
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var BlogStore = require('../../stores').blog;
var UserStore = require('../../stores').user;

var Component = React.createClass({
  getInitialState: function () {
    return {
      user: '',
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
            <h1>The Blog</h1>
            <h4>
              You can read all of the blog related things here. Bloggity blog blog.
            </h4>
            {this.getNewBlogButton()}
          </div>
        </div>
        {this.getBlogs()}
        <div style={{marginTop:"25px"}} />
      </div>
    );
  },

  getNewBlogButton: function () {
    if (this.state.user.isAdmin) {
      return (
        <Link to="/blog/new">{"New blog"}</Link>
      )
    }
  },

  getBlogs: function () {
    var ascendingByDate = function(a,b){return a.publishedOn - b.publishedOn};
    var descendingByDate = function(a,b){return b.publishedOn - a.publishedOn};

    return this.state.blogs.sort(descendingByDate).map(function (blog, i) {
      var friendlyTitle = blog.title;
      friendlyTitle = friendlyTitle.substring(0,35);
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
                <h2><Link to={url}>{blog.title}</Link></h2>
                <p>{blog.subtitle}</p>
                <div style={{fontStyle:"italic"}}>
                  By {blog.by}, published on {getPublishedOnString(blog.publishedOn)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });
  },
});

module.exports = Component;
