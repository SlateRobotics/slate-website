var products = require('./Products.js');

module.exports = function (productId, configName, itemValue) {
  var name = "";
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    if (product.id == productId) {
      for (var j = 0; j < product.config.length; j++) {
        var config = product.config[j];
        if (config.name == configName) {
          for (var k = 0; k < config.items.length; k++) {
            var item = config.items[k];
            if (item.id == itemValue) {
              name = item.label;
            }
          }
        }
      }
    }
  }
  return name;
}
