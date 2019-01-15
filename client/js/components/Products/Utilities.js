module.exports = {
  CalculateTotal: function (product, config) {
    if (!product || !config) { return; }
    var total = product.basePrice;
    for (var i = 0; i < product.config.length; i++) {
      var productConfig = product.config[i];

      var orderConfig;
      for (var j = 0; j < config.length; j++) {
        if (config[j].name == productConfig.name) {
          orderConfig = config[j];
        }
      }

      var configItem;
      for (var j = 0; j < productConfig.items.length; j++) {
        if (productConfig.items[j].id == orderConfig.value) {
          configItem = productConfig.items[j];
        }
      }

      if (configItem) { total += configItem.price; }
    }

    return total;
  }
}
