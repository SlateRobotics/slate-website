var React = require('react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var BlogStore = require('../../stores').blog;
var UserStore = require('../../stores').user;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var Component = React.createClass({
  getInitialState: function () {
    return {
      user: '',
      error: '',
      isLoading: true,
      blog: '',
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
        this.setState(state);
      }.bind(this),
    });

    BlogStore.get({
      id: this.props.params.id,
      error: function (error) {
        var state = this.state;
        state.blog.title = "An error occured loading the blog:";
        state.blog.subtitle = error;
        state.error = error;
        state.isLoading = false;
        this.setState(state);
      }.bind(this),
      success: function (doc) {
        var state = this.state;
        state.blog = doc;
        state.isLoading = false;
        this.setState(state);
        document.title = this.state.blog.title + " - Blog - Slate Robotics";
      }.bind(this),
    });
  },

  componentDidMount: function () {
    document.title = this.state.blog.title + " - Blog - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{paddingTop:"5px",paddingBottom:"5px",borderBottom:"1px solid #ccc"}}>
          <div className="col-md-8 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <Link to="/blog">{"< Back to blogs"}</Link>
            {this.getEditButton()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered" style={{
              backgroundImage:"url(" + this.state.blog.img + ")",
              backgroundSize:"cover",
              backgroundPositionX:"center",
              backgroundPositionY:"top",
              backgroundColor:"#222",
              height:"400px"
            }}>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <h1>{this.state.blog.title}</h1>
            <h4>
              {this.state.blog.subtitle}
            </h4>
            <div style={{fontStyle:"italic"}}>
              By {this.state.blog.by}, published on {this.getPublishedOnString()}
            </div>
          </div>
        </div>
        <div style={{marginTop:"20px"}} />
        <div className="row">
          <div className="col-md-3 hidden-sm hidden-xs">

          </div>
          <div className="col-md-6 col-xs-12" style={{textAlign:"left",backgroundColor:"#f1f1f1"}}>
            {this.getBody()}
          </div>
          <div className="col-lg-2 col-md-3 hidden-sm hidden-xs" style={{textAlign:"left"}}>
            <h3>Join our newsletter!</h3>
            <p>
              Stay up to date with the latest TR1 and Slate Robotics developments.
            </p>
            <iframe
              srcDoc='<html><body><script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script><script>hbspt.forms.create({portalId: "4322786",formId: "e1557a14-0023-45af-a782-02dad3bbceab"});</script></body></html>'
              style={{height:"210px",border:"none",width:"100%"}}/>
          </div>
          <div className="col-lg-1 hidden-md hidden-sm hidden-xs" />
        </div>
        <div style={{marginTop:"60px"}} className="hidden-lg hidden-md" />
        <div className="row hidden-lg hidden-md">
          <div className="hidden-lg hidden-md col-xs-12" style={{textAlign:"left"}}>
            <h3>Join our newsletter!</h3>
            <p>
              Stay up to date with the latest TR1 and Slate Robotics developments.
            </p>
            <iframe
              srcDoc='<html><body><script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script><script>hbspt.forms.create({portalId: "4322786",formId: "e1557a14-0023-45af-a782-02dad3bbceab"});</script></body></html>'
              style={{height:"210px",border:"none",width:"100%"}}/>
          </div>
        </div>
        <div style={{marginTop:"60px"}} />
      </div>
    );
  },

  getEditButton: function () {
    if (this.state.user.isAdmin) {
      return (
        <span style={{float:"right"}}>
          <Link to={"/blog/" + this.state.blog._id + "/edit"}>Edit</Link>
          <a style={{cursor:"pointer",marginLeft:"15px"}} onClick={this.handleClick_Delete}>
            {"Delete"}
          </a>
        </span>
      )
    }
  },

  getBody: function () {
    var body = "";
    if (this.state.blog.body) body = this.state.blog.body;
    var html = marked(body);
    var options = {
      allowedTags: ['h1','h2','h3','h4','h5','h6','blockquote','p','a','ul','ol',
        'nl','li','b','i','strong','em','strike','code','hr','br','div',
        'table','thead','caption','tbody','tr','th','td','pre','img','iframe'],
      allowedAttributes: {
        a: ['href','name','target' ],
        iframe: ['src','height','width','frameborder','allow','style'],
        img: ['src','height','width','style']
      },
      selfClosing: ['img','br','hr','area','base','basefont','input','link','meta'],
      allowedSchemes: ['http','https','ftp','mailto'],
      allowedSchemesByTag: {},
      allowedSchemesAppliedToAttributes: ['href','src','cite'],
      allowProtocolRelative: true,
      allowedIframeHostnames: ['www.youtube.com','player.vimeo.com']
    };
    var cleanHtml = sanitizeHtml(html, options);
    return (<div dangerouslySetInnerHTML={{__html: cleanHtml}} />)
  },

  getPublishedOnString: function () {
    if (!this.state.blog.publishedOn) return "";
    var publishedOn = new Date(this.state.blog.publishedOn);
    return publishedOn.toLocaleDateString();
  },

  handleClick_Delete: function () {
    if (confirm('Are you sure you want to delete this blog?')) {
      BlogStore.delete(this.state.blog, function (data) {
        BrowserHistory.push("/blog");
      });
    }
  },
});

module.exports = Component;
