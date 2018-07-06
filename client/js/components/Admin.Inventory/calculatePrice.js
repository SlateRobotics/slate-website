var getFilamentPrice = require('./getFilamentPrice');

var calculatePrice = function (item, items) {
  var source = item.source;
  if (source == "3D Print") {
    return item.filament / 1000.0 * getFilamentPrice(items);
  } else if (source == "Assembly Build") {
    if (!item.childItems) item.childItems = [];
    var price = 0;
    for (var i = 0; i < item.childItems.length; i++) {
      var childItem = item.childItems[i];
      var childItemDetail = {};
      for (var j = 0; j < items.length; j++) {
        if (items[j].sku == childItem.sku) {
          childItemDetail = items[j];
          break;
        }
      }
      price += childItem.quantity * calculatePrice(childItemDetail, items);
    }
    return price;
  } else {
    return item.price;
  }
}

module.exports = calculatePrice;
