var React = require('react');
var Griddle = require('griddle-react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var Products = require('../Products/Products.js');
var GetProductConfigItemName = require('../Products/GetProductConfigItemName.js');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var UserStore = require('../../stores').user;
var InventoryItemStore = require('../../stores').inventoryItem;

var LinkComponent = React.createClass({
  render: function(){
    var url ="/admin/inventory/" + this.props.rowData._id;
    return <a href={url}>{this.props.data}</a>
  },
});

var ParentLinkComponent = React.createClass({
  render: function(){
    var url = "/admin/inventory/" + this.props.rowData.parentAssemblyId;
    return <a href={url}>{this.props.data}</a>
  },
});

var URLComponent = React.createClass({
  render: function(){
    var text = this.props.data;
    if (!text) text = "";
    if (text.length > 18) {
      text = text.substring(0,16) + "...";
    }
    if (this.props.data) {
      return <a target="_blank" href={this.props.data}>{text}</a>
    } else {
      return <div />
    }
  },
});

var columnMeta = [
  {
    "columnName": "_id",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "parentAssemblyId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "SKU",
    "order": 1,
    "locked": false,
    "visible": true,
    "customComponent": LinkComponent
  }, {
    "columnName": "Description",
    "order": 2,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "Stock",
    "order": 3,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "Price",
    "order": 4,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "Parent SKU",
    "order": 5,
    "locked": false,
    "visible": true,
    "customComponent": ParentLinkComponent
  }, {
    "columnName": "URL",
    "order": 6,
    "locked": false,
    "visible": true,
    "customComponent": URLComponent
  },
];

var Component = React.createClass({
  getInitialState: function () {
    return {
      errors: [],
      isLoading: true,
      product: Products[0],
      filamentPrice: 4.5,
      parentAssemblyId: "",
      inventoryItems: [],
      inventoryItem: {
        childItems: [],
      },
    }
  },

  componentWillMount: function () {
    UserStore.addChangeListener(this.handleChange_UserStore);
    if (this.props.params.id && this.props.params.id != "new") {
  		InventoryItemStore.get({
        refresh: true,
        id: this.props.params.id,
        error: function (error) {
          var state = this.state;
          state.errors.push({name:"load",message:error});
          state.isLoading = false;
          this.setState(state);
        }.bind(this),
        success: function (data) {
          var state = this.state;
          state.inventoryItem = data;
          if (!state.inventoryItem.childItems) state.inventoryItem.childItems = [];
          state.isLoading = false;
    			this.setState(state);
      		InventoryItemStore.get({
            refresh: true,
            error: function (error) {
              var state = this.state;
              state.errors.push({name:"load",message:error});
              state.isLoading = false;
              this.setState(state);
            }.bind(this),
            success: function (data) {
              var state = this.state;
              state.inventoryItems = data;
              state.isLoading = false;
              for (var i = 0; i < data.length; i++) {
                if (data[i].sku == "SR-RM-AB-FM") { // 1k abs filament
                  state.filamentPrice = data[i].price
                }
                if (data[i].sku == this.state.inventoryItem.parentAssemblySKU) {
                  state.parentAssemblyId = data[i]._id;
                }
                if (data[i].parentAssemblySKU == this.state.inventoryItem.sku) {
                  state.inventoryItem.childItems.push(data[i]);
                }
              }
        			this.setState(state);
            }.bind(this),
          });
        }.bind(this),
      });
    } else {
      var state = this.state;
      state.isLoading = false;
      this.setState(state);
    }
  },

  componentDidMount: function () {
    document.title = "Edit Inventory Item - Slate Robotics";
    window.scrollTo(0,0);
  },

  componentWillUnmount: function () {
		UserStore.removeChangeListener(this.handleChange_UserStore);
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-md-8 col-xs-12 col-centered" style={{
              backgroundColor: "#fbfbfb",
              paddingTop: "15px",
              paddingBottom: "15px",
              binventoryItemRadius: "5px",
              binventoryItem: "1px solid #ccc",
              marginTop: "25px",
              marginBottom: "25px",
            }}>
            <h3>Edit Inventory Item</h3>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <Form.Label label="SKU" isRequired />
                <Form.Input
                  attribute="sku"
                  value={this.state.inventoryItem.sku}
                  onChange={this.handleChange_Field} />
                {this.getError("sku")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Description" isRequired />
                <Form.Input
                  attribute="description"
                  value={this.state.inventoryItem.description}
                  onChange={this.handleChange_Field} />
                {this.getError("description")}
              </div>
              <div className="col-md-6 col-xs-12">
                <span style={{height:"40px",fontWeight:"400",fontSize:"14px",lineHeight:"40px",margin:"5px 0 0 0"}}>
                  {"Parent SKU   "}
                </span>
                {this.getParentSKULink()}
                <Form.Input
                  attribute="parentAssemblySKU"
                  value={this.state.inventoryItem.parentAssemblySKU}
                  onChange={this.handleChange_Field} />
                {this.getError("parentAssemblySKU")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Type" isRequired />
                <Form.Select
                  attribute="type"
                  options={["RM","WIP","FG"]}
                  value={this.state.inventoryItem.type}
                  onChange={this.handleChange_Field} />
                {this.getError("type")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Stock" isRequired />
                <Form.Input
                  attribute="stock"
                  value={this.state.inventoryItem.stock}
                  onChange={this.handleChange_Field} />
                {this.getError("stock")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Price" isRequired />
                <Form.Input
                  attribute="price"
                  disabled={this.getPriceDisabled()}
                  value={this.getPriceValue()}
                  onChange={this.handleChange_Field} />
                {this.getError("price")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Filament (g)" isRequired />
                <Form.Input
                  attribute="filament"
                  value={this.state.inventoryItem.filament}
                  onChange={this.handleChange_Field} />
                {this.getError("filament")}
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Label label="Source" isRequired />
                <Form.Select
                  attribute="source"
                  options={["3D Print","CNC","Assembly Build","Vendor"]}
                  value={this.state.inventoryItem.source}
                  onChange={this.handleChange_Field} />
                {this.getError("source")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="URL" isRequired />
                <Form.Input
                  attribute="url"
                  value={this.state.inventoryItem.url}
                  onChange={this.handleChange_Field} />
                {this.getError("url")}
              </div>
              <div className="col-xs-12">
                <Form.Label label="Notes" isRequired />
                <Form.TextArea
                  attribute="notes"
                  value={this.state.inventoryItem.notes}
                  onChange={this.handleChange_Field} />
                {this.getError("notes")}
              </div>
            </div>
            <div style={{marginTop:"25px"}} />
            <h3>Child Items</h3>
            <div className="row">
              <div className="col-md-8 hidden-sm hidden-xs col-centered">
                <Griddle
                  results={this.getGriddleData()}
                  showFilter={true}
                  columnMetadata={columnMeta}
                  columns={["SKU","Parent SKU","Description","Stock","Price","URL"]}
                  resultsPerPage={20} />
              </div>
              <div className="hidden-lg hidden-md col-xs-12 col-centered">
                <Griddle
                  results={this.getGriddleData()}
                  showFilter={true}
                  columnMetadata={columnMeta}
                  columns={["SKU","Stock"]}
                  resultsPerPage={20} />
              </div>
            </div>
            <div style={{marginTop:"25px"}} />
            <div className="row">
              <div className="col-xs-12">
                {this.getButton()}
                <span style={{marginRight:"15px"}} />
                <ButtonSecondary
                  label="Cancel/Back"
                  onClick={this.handleClick_Cancel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  getParentSKULink: function () {
    if (this.state.parentAssemblyId) {
      return (
        <a href={"/admin/inventory/" + this.state.parentAssemblyId}
          style={{height:"40px",fontWeight:"400",fontSize:"14px",lineHeight:"40px",margin:"5px 0 0 0"}}>
          {"Open >"}
        </a>
      )
    }
  },

  getPriceDisabled: function () {
    return (this.state.inventoryItem.source == "3D Print" || this.state.inventoryItem.source == "Assembly Build" )
  },

  getPriceValue: function () {
    if (this.state.inventoryItem.source == "3D Print") {
      var filamentPrice = this.state.filamentPrice;
      var filament = this.state.inventoryItem.filament / 1000.0;
      return filament * filamentPrice;
    } else {
      return this.state.inventoryItem.price;
    }
  },

  getGriddleData: function () {
    var result = [];
    this.state.inventoryItem.childItems.map(function (inventoryItem) {
      var price = " - ";
      if (inventoryItem.price) {
        price = "$" + inventoryItem.price.toFixed(2).toLocaleString();
      }

      var parentAssemblyId = "";
      for (var i = 0; i < this.state.inventoryItems.length; i++) {
        var item = this.state.inventoryItems[i];
        if (item.sku == inventoryItem.parentAssemblySKU) {
          parentAssemblyId = item._id;
        }
      }

      result.push({
        "_id": inventoryItem._id,
        "parentAssemblyId": parentAssemblyId,
        "SKU": inventoryItem.sku,
        "Parent SKU": inventoryItem.parentAssemblySKU,
        "Description": inventoryItem.description,
        "Type": inventoryItem.type,
        "Stock": inventoryItem.stock,
        "Price": price,
        "URL": inventoryItem.url,
      });
    }.bind(this));

    return result;
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

  handleClick_Cancel: function () {
    BrowserHistory.push("/admin/inventory");
  },

  validateData: function (callback) {
    var errors = [];
    callback(errors);
  },

	handleChange_UserStore: function () {
		var users = UserStore.find();
		if (users.length > 0) {
			var state = this.state;
			state.user = users[0];
			this.setState(state);
		}
	},

  handleChange_Field: function (attribute, value) {
    var state = this.state;
    state.inventoryItem[attribute] = value;
    this.setState(state);
  },

  handleClick_Submit: function () {
    var state = this.state;
    state.isLoading = true;
    state.errors = [];
    this.setState(state);

    this.validateData(function (errors) {
      state.errors = errors;
      this.setState(state);

      if (errors.length > 0) {
        state.isLoading = false;
        this.setState(state);
        return;
      }

      var inventoryItem = this.state.inventoryItem;
      if (inventoryItem._id) {
        InventoryItemStore.update(inventoryItem, function (data) {
          BrowserHistory.push("/admin/inventory");
        });
      } else {
        InventoryItemStore.insert(inventoryItem, function (data) {
          BrowserHistory.push("/admin/inventory");
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
