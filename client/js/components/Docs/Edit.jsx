var React = require('react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var DocStore = require('../../stores').doc;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var Component = React.createClass({
  getInitialState: function () {
    return {
      errors: [],
      isLoading: true,
      doc: {},
    }
  },

  componentWillMount: function () {
    if (this.props.params.id) {
      DocStore.get({
        id: this.props.params.id,
        error: function (error) {
          var state = this.state;
          state.errors.push({name:"load",message:error});
          state.isLoading = false;
          this.setState(state);
        }.bind(this),
        success: function (doc) {
          var state = this.state;
          state.doc = doc;
          state.tocString = JSON.stringify(doc.toc);
          state.isLoading = false;
          this.setState(state);
          document.title = this.state.doc.title + " - Doc - Slate Robotics";
        }.bind(this),
      });
    } else {
      var state = this.state;
      state.isLoading = false;
      this.setState(state);
    }
  },

  componentDidMount: function () {
    document.title = this.state.doc.title + " - Doc - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-10 col-xs-12 col-centered" style={{
              backgroundColor: "#fbfbfb",
              paddingTop: "15px",
              paddingBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "25px",
              marginBottom: "25px",
            }}>
            <div className="row">
              <div className="col-xs-6">
                <h3>Edit doc</h3>
                <div className="row">
                  <div className="col-xs-12">
                    <Form.Label label="Status" isRequired />
                    <Form.Select
                      attribute="status"
                      options={["Active","In Progress","Archive"]}
                      value={this.state.doc.status}
                      onChange={this.handleChange_Field} />
                    {this.getError("status")}
                  </div>
                  <div className="col-xs-12">
                    <Form.Label label="Ordinal" isRequired />
                    <Form.Input
                      attribute="ordinal"
                      value={this.state.doc.ordinal}
                      onChange={this.handleChange_Field} />
                    {this.getError("ordinal")}
                  </div>
                  <div className="col-xs-12">
                    <Form.Label label="Title" isRequired />
                    <Form.Input
                      attribute="title"
                      value={this.state.doc.title}
                      onChange={this.handleChange_Field} />
                    {this.getError("title")}
                  </div>
                  <div className="col-xs-12">
                    <Form.Label label="Subtitle" isRequired />
                    <Form.Input
                      attribute="subtitle"
                      value={this.state.doc.subtitle}
                      onChange={this.handleChange_Field} />
                    {this.getError("subtitle")}
                  </div>
                  <div className="col-xs-12">
                    <Form.Label label="By" isRequired />
                    <Form.Input
                      attribute="by"
                      value={this.state.doc.by}
                      onChange={this.handleChange_Field} />
                    {this.getError("by")}
                  </div>
                  <div className="col-xs-12">
                    <Form.Label label="Main Image" isRequired />
                    <Form.Input
                      attribute="img"
                      value={this.state.doc.img}
                      onChange={this.handleChange_Field} />
                    {this.getError("img")}
                  </div>
                  <div className="col-xs-12">
                    <Form.Label label="Published On" />
                    <Form.Input
                      attribute="publishedOn"
                      value={this.state.doc.publishedOn}
                      onChange={this.handleChange_Field} />
                    {this.getError("publishedOn")}
                  </div>
                  <div className="col-xs-12">
                    <Form.Label label="Table of Contents" isRequired />
                    <Form.TextArea
                      attribute="tocString"
                      value={this.state.tocString}
                      onChange={this.handleChange_TOC} />
                    {this.getError("toc")}
                  </div>
                  <div className="col-xs-12">
                    <Form.Label label="Body" isRequired />
                    <Form.TextArea
                      attribute="body"
                      value={this.state.doc.body}
                      onChange={this.handleChange_Field} />
                    {this.getError("body")}
                  </div>
                </div>
                <div style={{marginTop:"25px"}} />
                <div className="row">
                  <div className="col-xs-12">
                    {this.getButton()}
                  </div>
                </div>
              </div>
              <div className="col-xs-6">
                <h1>{this.state.doc.title}</h1>
                <div style={{
                  backgroundColor:"#f1f1f1",
                  display:"inline-block",
                  padding:"15px",
                  border:"1px solid #ccc",
                  marginBottom:"15px",
                }}>
                  <b>Table of Contents</b>
                  <ul>{this.getTableOfContents()}</ul>
                </div>
                {this.getBody()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  getTableOfContents: function () {
    var tableOfContents;
    if (this.state.doc.toc) {
      tableOfContents = this.state.doc.toc.map(function (item, i) {
        return (
          <li><a href={item.link}>{item.name}</a></li>
        )
      });
    }
    return tableOfContents
  },

  getBody: function () {
    var body = "";
    if (this.state.doc.body) body = this.state.doc.body;
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

  getButton: function () {
    if (this.state.isLoading) {
      return (
        <ButtonSecondary label="Processing..." disabled />
      )
    } else {
      return (
        <ButtonPrimary label="Submit" onClick={this.handleClick_Submit} />
      )
    }
  },

  validateData: function (callback) {
    var errors = [];
    if (!this.state.doc.status) {
      errors.push({name:"status", message: "Status is a required field"});
    }
    if (!this.state.doc.title) {
      errors.push({name:"title", message: "Title is a required field"});
    }
    if (!this.state.doc.subtitle) {
      errors.push({name:"subtitle", message: "Subtitle is a required field"});
    }
    if (!this.state.doc.by) {
      errors.push({name:"by", message: "By is a required field"});
    }
    if (!this.state.doc.img) {
      errors.push({name:"img", message: "Image is a required field"});
    }
    if (!this.state.doc.status == "Active" && this.state.doc.publishedOn) {
      errors.push({name:"publishedOn", message: "Published on is a required field for Active docs"});
    }
    if (!this.state.doc.img) {
      errors.push({name:"body", message: "Body is a required field"});
    }
    callback(errors);
  },

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state.doc[attribute] = value;
    this.setState(state);
  },

  handleChange_TOC: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
  },

  handleClick_Submit: function () {
    var state = this.state;
    state.isLoading = true;
    state.errors = [];
    this.setState(state);

    state.doc.toc = JSON.parse(state.tocString);

    this.validateData(function (errors) {
      state.errors = errors;
      this.setState(state);

      if (errors.length > 0) {
        state.isLoading = false;
        this.setState(state);
        return;
      }

      var doc = this.state.doc;
      if (doc._id) {
        DocStore.update(doc, function (data) {
          BrowserHistory.push("/docs");
        });
      } else {
        DocStore.insert(doc, function (data) {
          BrowserHistory.push("/docs");
        });
      }
    }.bind(this));
  },

  getError: function (name) {
    var messages = "";
    for (var i = 0; i < this.state.errors.length; i++) {
      var error = this.state.errors[i];
      if (error.name == name) {
        messages += error.message + " ";
      }
    }

    if (messages != "") {
      return (
        <span style={{fontSize:"11px",fontStyle:"italic",color:"red"}}>
          {messages}
        </span>
      )
    }
  },
});

module.exports = Component;
