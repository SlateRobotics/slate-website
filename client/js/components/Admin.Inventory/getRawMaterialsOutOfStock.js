var getChildItems = require('./getChildItems');

var getRawMaterialsOutOfStock = function (item, items) {
  // get all child items
  var childItems = getChildItems(item, items);
  var result = [];
  for (var i = 0; i < childItems.length; i++) {
    if (!childItems[i].stock || (childItems[i].stock < childItems[i].quantity)) {
      result.push(childItems[i]);
    }
  }
  return result;
}

module.exports = getRawMaterialsOutOfStock;
