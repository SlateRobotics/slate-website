var getChildAssemblies = function (item, items) {
  var childItems = [];
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
      childItems.push(childItemDetail);
      var _items = getChildAssemblies(childItemDetail, items);
      childItems = childItems.concat(_items);
    }
  }

  // concat
  for (var i = 0; i < childItems.length; i++) {
    var quantity = childItems[i].quantity;
    for (var j = 0; j < childItems.length; j++) {
      if (i == j) continue;
      var item1 = childItems[i];
      var item2 = childItems[j];
      if (item1.sku == item2.sku) {
        quantity = quantity + item2.quantity;
        childItems[j] = {remove: true};
      }
    }
    childItems[i].quantity = quantity;
  }

  var result = [];
  for (var i = 0; i < childItems.length; i++) {
    var item = childItems[i];
    if (!item.remove) result.push(item);
  }

  return result;

}

module.exports = getChildAssemblies;
