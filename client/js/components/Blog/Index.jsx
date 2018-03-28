var React = require('react');
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var blogs = require('./Blogs');

var Component = React.createClass({
  getInitialState: function () {
    return {
      blogs: [],
    }
  },

  componentWillMount: function () {
    var state = this.state;
    state.blogs = blogs;
    this.setState(state);
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
          </div>
        </div>
        {this.getBlogs()}
        <div style={{marginTop:"25px"}} />
      </div>
    );
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
      var url = "/blog/" + blog.id + "/" + friendlyTitle;

      var toBlog = function () {BrowserHistory.push(url);}
      return (
        <div key={blog.id} className="row">
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
                  By {blog.by}, published on {blog.publishedOn.toLocaleDateString()}
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
