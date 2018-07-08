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

  return childItemsOutOfStock;

}

module.exports = getAssembliesOutOfStock;
