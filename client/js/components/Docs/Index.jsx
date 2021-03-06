var React = require('react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var $ = require('jquery');
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Form = require('../Form/Index.jsx');
var DocStore = require('../../stores').doc;
var UserStore = require('../../stores').user;

var Component = React.createClass({
  getInitialState: function () {
    return {
      user: '',
      sort: 'Ascending By Ordinal',
      search: '',
      selectedDoc: {},
      docs: [],
      error: '',
      isLoading: true,
      docListHeight: window.innerHeight - 160,
      mobileMenu: true,
    }
  },

  componentWillMount: function () {
    UserStore.getMe(function (me) {
      var state = this.state;
      state.user = me;
      this.setState(state);
    }.bind(this));

    DocStore.get({
      refresh: true,
      error: function (error) {
        var state = this.state;
        state.errors.push({name:"load",message:error});
        state.isLoading = false;
        this.setState(state);
      }.bind(this),
      success: function (docs) {
        var sort = {};
        sort["Ascending By Ordinal"]=function(a,b){return a.ordinal - b.ordinal};
        sort["Descending By Ordinal"]=function(a,b){return b.ordinal - a.ordinal};

        var state = this.state;
        state.docs = docs;

        if (!this.props.params.id) {
          if (docs.length > 0) state.selectedDoc = docs.sort(sort[this.state.sort])[0];
        }

        for (var i = 0; i < docs.length; i++) {
          if (docs[i]._id == this.props.params.id) {
            state.selectedDoc = docs[i];
          }
        }

        state.isLoading = false;
        this.setState(state);
      }.bind(this),
    });

  },

  componentDidMount: function () {
    document.title = "Docs - Slate Robotics";
    window.scrollTo(0,0);
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function () {
    var state = this.state;
    state.docListHeight = window.innerHeight - 160;
    this.setState(state);
  },

  render: function() {
    var menuContainerClass = "col-sm-3 col-xs-2";
    var docContainerClass = "col-sm-9 col-xs-10";

    if (this.state.mobileMenu) {
      menuContainerClass = "col-sm-3 col-xs-10";
      docContainerClass = "col-sm-9 col-xs-2";
    }

    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-10 col-xs-12 col-centered" style={{textAlign:"left"}}>
            <div className="row" style={{marginTop:"5px",position:"fixed",width:"inherit",minHeight:"calc(100% - 86px)"}}>
              {this.getMenu()}
            </div>
            <div className="row" style={{marginTop:"5px"}}>
              <div className={menuContainerClass} />
              <div className={docContainerClass} style={{borderLeft:"1px solid #ccc",wordBreak:"break-word"}}>
                {this.getSelectedDoc()}
              </div>
            </div>
          </div>
        </div>
        <div style={{marginTop:"25px"}} />
      </div>
    );
  },

  getMenu: function () {
    var menuContainerClass = "col-sm-3 col-xs-2";
    var docContainerClass = "col-sm-9 col-xs-10";

    if (this.state.mobileMenu) {
      menuContainerClass = "col-sm-3 col-xs-10";
      docContainerClass = "col-sm-9 col-xs-2";
    }

    if (this.state.mobileMenu) {
      return (
        <div className={menuContainerClass}>
          <h2 style={{width:"100%",marginTop:"0px"}}>
            Documentation
          </h2>
          {this.getNewDocButton()}
          {this.getTools()}
          <div style={{paddingTop:"15px"}}>
            <div style={{border:"1px solid #ccc"}}/>
          </div>
          <div style={{overflowY:"scroll",maxHeight:this.state.docListHeight}}>
            {this.getDocs()}
          </div>
        </div>
      )
    } else {
      return (
        <div className={menuContainerClass} style={{marginTop:"50%"}} onClick={this.handleClick_MobileMenuButton}>
          <h1>
            +
          </h1>
        </div>
      )
    }
  },

  getTools: function () {
    return (
      <Form.Input
        attribute="search"
        placeholder="Search for a doc..."
        value={this.state.search}
        onChange={this.handleChange_Field} />
    )
  },

  getNewDocButton: function () {
    if (this.state.user.isAdmin) {
      return (
        <div style={{marginTop:"10px",marginBottom:"10px"}}>
          <Link to="/docs/new">{"New document"}</Link>
        </div>
      )
    }
  },

  getSelectedDoc: function () {
    var body = "";
    if (this.state.selectedDoc.body) body = this.state.selectedDoc.body;
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

    var docControls;
    if (this.state.user.isAdmin) {
      docControls = (
        <div style={{marginBottom:"15px"}}>
          <Link to="/docs/new">{"New document"}</Link>
          <span style={{marginLeft:"15px"}} />
          <Link to={"/docs/" + this.state.selectedDoc._id + "/edit"}>
            {"Edit document"}
          </Link>
        </div>
      )
    }

    var tableOfContents;
    var toc = this.state.selectedDoc.toc;
    if (toc && toc.length) {
      tableOfContentsItems = toc.map(function (item, i) {
        return (
          <li key={i}><a href={item.link}>{item.name}</a></li>
        )
      });

      tableOfContents = (
        <div style={{
          backgroundColor:"#f1f1f1",
          display:"inline-block",
          padding:"15px",
          border:"1px solid #ccc",
          marginBottom:"15px",
          paddingRight:"100px",
          maxWidth:"100%",
          wordBreak:"normal",
        }}>
          <b>Table of Contents</b>
          <ul>{tableOfContentsItems}</ul>
        </div>
      )
    }

    if (this.state.mobileMenu) {
      return (
        <div>
          <div className="hidden-lg hidden-md hidden-sm">
            <h1 onClick={this.handleClick_MobileMenuButton}>
              -
            </h1>
          </div>
          <div className="hidden-xs">
            <h1 style={{marginTop:"0px"}}>{this.state.selectedDoc.title}</h1>
            {docControls}
            {tableOfContents}
            <div dangerouslySetInnerHTML={{__html: cleanHtml}} />
            </div>
        </div>
    )
    } else {
      return (
        <div>
          <h1 style={{marginTop:"0px"}}>{this.state.selectedDoc.title}</h1>
          {docControls}
          {tableOfContents}
          <div dangerouslySetInnerHTML={{__html: cleanHtml}} />
        </div>
      )
    }

  },

  getDocs: function () {
    var sort = {};
    sort["Ascending By Ordinal"]=function(a,b){return a.ordinal - b.ordinal};
    sort["Descending By Ordinal"]=function(a,b){return b.ordinal - a.ordinal};

    var docs = this.state.docs;
    if (this.state.search) {
      var search = this.state.search.toLowerCase();
      docs = docs.filter(function (doc) {
        var title = doc.title.toLowerCase().includes(search);
        var subtitle = doc.subtitle.toLowerCase().includes(search);
        //var body = doc.body.toLowerCase().includes(search);
        return title || subtitle;
      }.bind(this));
    }

    if (docs.length <= 0) {
      return (
        <div>
          <h4>No documents match your criteria...</h4>
        </div>
      )
    }

    return docs.sort(sort[this.state.sort]).map(function (doc, i) {
      var friendlyTitle = doc.title;
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
      var url = "/docs/" + doc._id + "/" + friendlyTitle;

      var getTitle = function () {
        var title = doc.title;
        if (this.state.user.isAdmin) title += " - " + doc.ordinal;
        return title;
      }.bind(this)

      var onClick = function () {
        window.scrollTo(0,0);
        BrowserHistory.push(url);
        var state = this.state;
        state.selectedDoc = doc;
        state.mobileMenu = false;
        this.setState(state);
      }

      var toc;
      if (doc._id == this.state.selectedDoc._id) {
        toc = doc.toc.map(function (item, i) {
          return (
            <div key={i}><span> - </span><a href={item.link}>{item.name}</a></div>
          )
        });

        toc = (
          <div>{toc}</div>
        )
      }

      return (
        <div key={doc._id}>
          <h4 onClick={onClick.bind(this)}>
            <Link to={url}>{getTitle()}</Link>
          </h4>
          {toc}
        </div>
      )
    }.bind(this));
  },

  handleClick_MobileMenuButton: function () {
    window.scrollTo(0,0);
    var state = this.state;
    state.mobileMenu = !state.mobileMenu;
    this.setState(state);
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
  },
});

module.exports = Component;
