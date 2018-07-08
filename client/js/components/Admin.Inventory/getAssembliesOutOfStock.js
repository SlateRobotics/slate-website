var getAssembliesOutOfStock = function (item, items) {
  var childItemsOutOfStock = [];
  if (!item.childItems) item.childItems = [];
  for (var i = 0; i < item.childItems.length; i++) {
    var childItem = item.childItems[i];
    var childItemDetail = {};

    for (var j = 0; j < items.length; j++) {
      if (items[j].sku == childItem.sku) {
        childItemDetail = items[j];
        break;
      }
    }

    if (childItem.quantity) childItemDetail.quantity = childItem.quantity;
    if (!childItemDetail.childItems) childItemDetail.childItems = [];

    if (childItemDetail.childItems.length > 0) {
      if (!childItemDetail.stock || childItemDetail.stock < childItemDetail.quantity) {
        childItemsOutOfStock.push(childItemDetail);
        var _items = getAssembliesOutOfStock(childItemDetail, items);
        childItemsOutOfStock = childItemsOutOfStock.concat(_items);
      }
    }
  }

  // concat
  for (var i = 0; i < childItemsOutOfStock.length; i++) {
    for (var j = 0; j < childItemsOutOfStock.length; j++) {
      if (i == j) continue;
      var item1 = childItemsOutOfStock[i];
      var item2 = childItemsOutOfStock[j];
      if (item1.sku == item2.sku) {
        childItemsOutOfStock[i].quantity = item1.quantity + item2.quantity;
        childItemsOutOfStock[j] = {remove: true};
      }
    }
  }

  var result = [];
  for (var i = 0; i < childItemsOutOfStock.length; i++) {
    var item = childItemsOutOfStock[i];
    if (!item.remove) result.push(item);
  }

  return result;
}

module.exports = getAssembliesOutOfStock;
