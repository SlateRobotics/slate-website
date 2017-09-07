var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var Order = require('../models/order');

var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config.json"), "utf8"));
var stripe = require('stripe')(config.stripe.secret);

var basePrice = 2499;
var computer = [0, 300, 400];
var linearActuator = [0, 50];
var battery = [0, 30];
var shipping = [0, 125, 375, 550];

var errorOccurred = false;

function OrderSuccess (res) {
  res.json({success: true, message: "Order placed successfuly"});
}

function OrderError (res, message) {
  res.json({success: false, message: message});
  errorOccurred = true
}

function VerifyData (req, res) {
  if (!req.body) {
    OrderError(res, "No order data in body of post request");
  } else if (!req.body.products || req.body.products.length == 0) {
    OrderError(res, "Invalid product data in body of post request");
  } else if (!req.body.shipping) {
    OrderError(res, "Invalid shipping data in body of post request");
  } else if (!req.body.shipping.firstName) {
    OrderError(res, "Invalid shipping data in body of post request: null firstName");
  } else if (!req.body.shipping.lastName) {
    OrderError(res, "Invalid shipping data in body of post request: null lastName");
  } else if (!req.body.shipping.address1) {
    OrderError(res, "Invalid shipping data in body of post request: null address1");
  } else if (!req.body.shipping.city) {
    OrderError(res, "Invalid shipping data in body of post request: null city");
  } else if (!req.body.shipping.state) {
    OrderError(res, "Invalid shipping data in body of post request: null state");
  } else if (!req.body.shipping.zip) {
    OrderError(res, "Invalid shipping data in body of post request: null zip");
  } else if (!req.body.billing) {
    OrderError(res, "Invalid billing data in body of post request");
  } else if (!req.body.billing.address1) {
    OrderError(res, "Invalid billing data in body of post request: null address1");
  } else if (!req.body.billing.city) {
    OrderError(res, "Invalid billing data in body of post request: null city");
  } else if (!req.body.billing.state) {
    OrderError(res, "Invalid billing data in body of post request: null state");
  } else if (!req.body.billing.zip) {
    OrderError(res, "Invalid billing data in body of post request: null zip");
  } else if (!req.body.card) {
    OrderError(res, "Invalid card data in body of post request");
  } else if (!req.body.card.token) {
    OrderError(res, "Invalid card data in body of post request: null token");
  } else if (!req.body.card.last4) {
    OrderError(res, "Invalid card data in body of post request: null last4");
  } else if (!req.body.user) {
    OrderError(res, "Invalid user data in body of post request");
  } else if (!req.body.user.email) {
    OrderError(res, "Invalid user data in body of post request: null email");
  } else if (!req.body.user.phone) {
    OrderError(res, "Invalid user data in body of post request: null phone");
  }
}

function CalculateSubtotalProduct(product) {
  var subtotal = basePrice;

  // ensure that only 1 of each is added to price
  // can't purchase 2 shippings, for instance
  var computerAdded = false;
  var linearActuatorAdded = false;
  var batteryAdded = false;
  var shippingAdded = false;

  for (var i = 0; i < product.config.length; i++) {
    if (product.config[i].name == "computer" && !computerAdded) {
      subtotal = subtotal + computer[product.config[i].value];
      computerAdded = true;
    } else if (product.config[i].name == "linearActuator" && !linearActuatorAdded) {
      subtotal = subtotal + linearActuator[product.config[i].value];
      linearActuatorAdded = true;
    } else if (product.config[i].name == "battery" && !batteryAdded) {
      subtotal = subtotal + battery[product.config[i].value];
      batteryAdded = true;
    } else if (product.config[i].name == "shipping" && !shippingAdded) {
      subtotal = subtotal + shipping[product.config[i].value];
      shippingAdded = true;
    }
  }

  return subtotal;
}

function CalculateTaxes (order) {
  var mo = ["MO","MISSOURI"];
  var moSalesTax = 0.04225;
  var greeneCountySalesTax = 0.01250;
  var springfieldSalesTax = 0.02125;
  var salesTax = moSalesTax + greeneCountySalesTax + springfieldSalesTax;
  if (mo.indexOf(order.shipping.state.toUpperCase()) > -1) {
    return (order.subtotal * salesTax);
  } else {
    return 0;
  }
}

router.post('/', function (req, res) {
  VerifyData(req, res);
  if (!errorOccurred) {
    var order = req.body;
    order.subtotal = 0;
    for (var i = 0; i < order.products.length; i++) {
      order.products[i].subtotal = CalculateSubtotalProduct(order.products[i]);
      order.subtotal = order.subtotal + order.products[i].subtotal;
    }

    order.subtotal = order.subtotal;
    order.taxes = CalculateTaxes(order);
    order.total = order.subtotal + order.taxes;

    var metadata = {};
    for (var i = 0; i < order.products.length; i++) {
      for (var j = 0; j < order.products[i].config.length; j++) {
        var key = order.products[i].productId + i + order.products[i].config[j].name.substr(0,3);
        var value = String(order.products[i].config[j].value);
        metadata[key] = value;
      }
    }

    stripe.charges.create({
      amount: Math.round(order.total * 100),
      currency: "usd",
      description: "Slate Robotics, Inc. - TR1",
      metadata: metadata,
      source: order.card.token,
    }, function (err, charge) {
      if (err) {
        OrderError(res, "An error occurred while processing your payment:" + err.message);
      } else {
          var orderDoc = new Order(order);
          orderDoc.save(function (err, results) {
            if (err) {
              OrderError(res, "An error occurred while saving the order details to our system:" + err);
            } else {
              OrderSuccess(res);
            }
          });
      }
    });

  }

});

module.exports = router;
