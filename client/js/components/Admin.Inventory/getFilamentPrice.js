module.exports = function (items) {
  var filamentPrice = 4.5;
  for (var i = 0; i < items.length; i++) {
    if (items[i].sku == "SR-RM-AB-FM") { // 1k abs filament
      filamentPrice = items[i].price;
      break;
    }
  }
  return filamentPrice;
}
