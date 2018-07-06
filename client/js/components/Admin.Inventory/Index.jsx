var React = require('react');
var Griddle = require('griddle-react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Link = require('react-router').Link;
var Form = require('../Form/Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var GetProductConfigItemName = require('../Products/GetProductConfigItemName.js');
var UserStore = require('../../stores').user;
var InventoryItemStore = require('../../stores').inventoryItem;

var LinkComponent = React.createClass({
  render: function(){
    var url ="/admin/inventory/" + this.props.rowData._id;
    return <Link to={url}>{this.props.data}</Link>
  },
});

var ParentLinkComponent = React.createClass({
  render: function(){
    var url ="/admin/inventory/" + this.props.rowData.parentAssemblyId;
    return <Link to={url}>{this.props.data}</Link>
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
      user: '',
      inventoryItems: [],
      search: '',
      totalValue: 0,
      sort: 'Ascending By SKU',
    }
  },

  componentWillMount: function () {
    UserStore.addChangeListener(this.handleChange_UserStore);
		InventoryItemStore.get({
      refresh: true,
      success: function (data) {
  			var state = this.state;
  			state.inventoryItems = data;

        var totalValue = 0;
        data.map(function (inventoryItem) {
          if (inventoryItem.price && inventoryItem.stock) {
            totalValue += inventoryItem.price * inventoryItem.stock;
          }
        });
        state.totalValue = totalValue;
  			this.setState(state);
      }.bind(this),
    });


    var totalValue = 0;

    var state = this.state;
    state.totalValue = totalValue;
    this.setState(state);
  },

  componentDidMount: function () {
    document.title = "Admin - Inventory - Slate Robotics";
    window.scrollTo(0,0);
    this.handleChange_InventoryItemStore();
  },

  componentWillUnmount: function () {
		UserStore.removeChangeListener(this.handleChange_UserStore);
  },

  render: function() {
    var totalValue = "";
    if (this.state.totalValue) {
      totalValue = "Over $" + this.state.totalValue.toFixed(2).toLocaleString() + " in total value.";
    }
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <h1>Inventory</h1>
            <div>{this.state.inventoryItems.length + " total items. " + totalValue}</div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"25px"}}>
          <div className="col-md-8 col-xs-12 col-centered">
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <Form.Input
                  attribute="search"
                  placeholder="Search for an item..."
                  value={this.state.search}
                  onChange={this.handleChange_Field} />
              </div>
              <div className="hidden-lg hidden-md col-xs-12" style={{marginTop:"10px"}} />
              <div className="col-md-4 col-xs-12">
                <Form.Select
                  attribute="sort"
                  options={["Ascending By SKU","Descending By SKU"]}
                  value={this.state.sort}
                  onChange={this.handleChange_Field} />
              </div>
              <div className="col-md-2 col-xs-12">
                <div className="hidden-lg hidden-md" style={{marginTop:"25px"}} />
                <ButtonPrimary label="New Item" onClick={this.handleClick_New} />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{paddingTop:"25px", paddingBottom:"25px"}}>
          <div className="col-md-8 hidden-sm hidden-xs col-centered">
            <Griddle
              results={this.getGriddleData()}
              columnMetadata={columnMeta}
              columns={["SKU","Parent SKU","Description","Stock","Price","URL"]}
              resultsPerPage={20} />
          </div>
          <div className="hidden-lg hidden-md col-xs-12 col-centered">
            <Griddle
              results={this.getGriddleData()}
              columnMetadata={columnMeta}
              columns={["SKU","Stock"]}
              resultsPerPage={20} />
          </div>
        </div>
      </div>
    );
  },

  getGriddleData: function () {
    var sort = {};
    sort["Ascending By SKU"] = function(a,b){
      if(a.sku < b.sku) return -1;
      if(a.sku > b.sku) return 1;
      return 0;
    };
    sort["Descending By SKU"] = function(a,b){
      if(a.sku < b.sku) return 1;
      if(a.sku > b.sku) return -1;
      return 0;
    };

    var inventoryItems = this.state.inventoryItems;
    if (this.state.search) {
      var search = this.state.search.toLowerCase();
      inventoryItems = inventoryItems.filter(function (inventoryItem) {
        if (!inventoryItem.sku) inventoryItem.sku = "";
        if (!inventoryItem.description) inventoryItem.description = "";
        var sku = inventoryItem.sku.toLowerCase().includes(search);
        var description = inventoryItem.description.toLowerCase().includes(search);
        return sku || description;
      }.bind(this));
    }

    var result = [];
    inventoryItems.sort(sort[this.state.sort]).map(function (inventoryItem) {
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

  handleClick_New: function () {
    BrowserHistory.push("/admin/inventory/new");
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

	handleChange_InventoryItemStore: function () {
		InventoryItemStore.get({
      success: function (data) {
  			var state = this.state;
  			state.inventoryItems = data;
  			this.setState(state);
      }.bind(this),
    });
	},
});

module.exports = Component;
