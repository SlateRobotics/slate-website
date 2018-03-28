var React = require('react');
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var sanitizeHtml = require('sanitize-html');
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var blogs = require('./Blogs');
var marked = require('marked');

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var Component = React.createClass({
  getInitialState: function () {
    return {
      editor: false,
      editorValue: "",
      blog: {
        id: -1,
        title: "Loading blog...",
      },
    }
  },

  componentWillMount: function () {
    var blogId = this.props.params.id;
    var blog = blogs.find(function(x) {return x.id == blogId})
    var state = this.state;
    state.blog = blog;
    if (getUrlParameter("editor") == "true") {
      state.editor = true;
      state.editorValue = blog.body;
    }
    this.setState(state);
  },

  componentDidMount: function () {
    document.title = this.state.blog.title + " - Blog - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{paddingTop:"5px",paddingBottom:"5px",backgroundColor:"#565371"}}>
          <div className="col-md-8 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <Link to="/blog" style={{color:"white"}}>{"< Back to blogs"}</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered" style={{
              backgroundImage:"url(" + this.state.blog.img + ")",
              backgroundSize:"cover",
              backgroundPositionX:"center",
              backgroundPositionY:"top",
              backgroundColor:"#222",
              height:"300px"
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
          <div className="col-lg-1 hidden-md hidden-sm hidden-xs" />
          <div className="col-lg-2 col-md-3 hidden-sm hidden-xs" style={{textAlign:"left"}}>
            <h3>Join our newsletter!</h3>
            <p>
              Stay up to date with the latest TR1 and Slate Robotics developments.
            </p>
            <iframe
              srcDoc='<html><body><script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script><script>hbspt.forms.create({portalId: "4322786",formId: "e1557a14-0023-45af-a782-02dad3bbceab"});</script></body></html>'
              style={{height:"500px",border:"none",width:"100%"}}/>
          </div>
          <div className="col-md-6 col-xs-12" style={{textAlign:"left",backgroundColor:"#f1f1f1"}}>
            {this.getBody()}
          </div>
          <div className="col-md-3 hidden-sm hidden-xs">

          </div>
        </div>
        {this.getEditor()}
        <div style={{marginTop:"60px"}} />
      </div>
    );
  },

  getBody: function () {
    var html = marked(this.state.blog.body);
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
    if (!this.state.blog.publishedOn) return;
    return this.state.blog.publishedOn.toLocaleDateString();
  },

  getEditor: function () {
    if (this.state.editor == true) {
      return (
        <div className="row">
          <div className="col-md-3 hidden-sm hidden-xs">

          </div>
          <div className="col-md-6 col-xs-12" style={{textAlign:"left"}}>
            <Form.TextArea
              attribute="body"
              value={this.state.editorValue}
              onChange={this.handleChange_Editor} />
          </div>
          <div className="col-md-3 hidden-sm hidden-xs">

          </div>
        </div>
      )
    }
  },

  handleChange_Editor: function (attribute, value) {
    var state = this.state;
    state.blog.body = value;
    state.editorValue = value;
    this.setState(state);
  },
});

module.exports = Component;
