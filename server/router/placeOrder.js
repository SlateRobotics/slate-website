var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var Reservation = require('../models/reservation');
var EmailSender = require('../components/EmailSender');
var Products = require('../../client/js/components/Products/Products.js');
var ProductUtilities = require('../../client/js/components/Products/Utilities.js');

var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config.json"), "utf8"));
var stripe = require('stripe')(config.stripe.secret);

Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

 var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};

function ValidateReservationToken (order, callback) {
  var reservationToken = order.reservationToken;
  var reservationExists = false;
  var orderWithReservationExists = false;
  Reservation.findOne({"token": reservationToken}).exec(function(err, reservation) {
    if (reservation) reservationExists = true;
    if (err) callback(false);
    Order.findOne({"reservationToken": reservationToken}).exec(function(err2, order) {
      if (order) orderWithReservationExists = true;
      if (err2) callback(false);
      callback(reservationExists && !orderWithReservationExists);
    });
  });
}

function getShippingAddressString (order) {
  return order.shipping.address1
    + ", " + order.shipping.city
    + ", " + order.shipping.state
    + " " + order.shipping.zip;
}

function getProductDetailString (order) {
  var result = "";

  for (var i = 0; i < order.products.length; i++) {
    if (i == 0) {
      result = result + order.products[i].quantity + " x " + order.products[i].productId.toUpperCase();
    } else {
      result = result + "<br/>" + order.products[i].quantity + " x " + order.products[i].productId.toUpperCase();
    }

    result = result + ": ";

    for (var j = 0; j < order.products[i].config.length; j++) {
      var config = order.products[i].config[j];
      var productConfig;

      Products.map(function (p) {
        if (p.id == order.products[i].productId) {
          p.config.map(function (c) {
            if (c.name == config.name) {
              productConfig = c;
            }
          });
        }
      });

      var configItem;
      for (var k = 0; k < productConfig.items.length; k++) {
        if (config.value == productConfig.items[k].id) {
          configItem = productConfig.items[k];
        }
      }

      if (configItem) {
        result = result + configItem.label;
      }

      if (j < order.products[i].config.length - 1) {
        result = result + ", ";
      }
    }
  }

  return result;
}

function OrderSuccess (res, order) {
  res.json({success: true, message: "Order placed successfuly"});

  var html = EmailSender.Emails.OrderPlaced
    .replace("__NAME__", order.shipping.firstName)
    .replace("__PRODUCT__", getProductDetailString(order))
    .replace("__ADDRESS__", getShippingAddressString(order))
    .replace("__SUBTOTAL__", "$" + order.subtotal.formatMoney(2))
    .replace("__TAX__", "$" + order.tax.formatMoney(2))
    .replace("__ID__", order._id)
    .replace("__TOKEN__", order.token)
    .replace("__ID__", order._id)
    .replace("__TOKEN__", order.token)
    .replace("__TOTAL__", "$" + order.total.formatMoney(2));
  var emailSender = new EmailSender({
    from: "zach@slaterobots.com",
    to: order.user.email,
    bcc: "zach@slaterobots.com",
    subject: "Slate Robotics Order Confirmation",
    html: html,
  });
  emailSender.send();
}

function OrderError (res, message) {
  res.json({success: false, message: message});
  return false;
}

function VerifyData (req, res) {
  if (!req.body) {
    return OrderError(res, "No order data in body of post request");
  } else if (!req.body.products || req.body.products.length == 0) {
    return OrderError(res, "Invalid product data in body of post request");
  } else if (!req.body.shipping) {
    return OrderError(res, "Invalid shipping data in body of post request");
  } else if (!req.body.shipping.firstName) {
    return OrderError(res, "Invalid shipping data in body of post request: null firstName");
  } else if (!req.body.shipping.lastName) {
    return OrderError(res, "Invalid shipping data in body of post request: null lastName");
  } else if (!req.body.shipping.address1) {
    return OrderError(res, "Invalid shipping data in body of post request: null address1");
  } else if (!req.body.shipping.city) {
    return OrderError(res, "Invalid shipping data in body of post request: null city");
  } else if (!req.body.shipping.state) {
    return OrderError(res, "Invalid shipping data in body of post request: null state");
  } else if (!req.body.shipping.zip) {
    return OrderError(res, "Invalid shipping data in body of post request: null zip");
  } else if (!req.body.billing) {
    return OrderError(res, "Invalid billing data in body of post request");
  } else if (!req.body.billing.firstName) {
    return OrderError(res, "Invalid billing data in body of post request: null firstName");
  } else if (!req.body.billing.lastName) {
    return OrderError(res, "Invalid billing data in body of post request: null lastName");
  } else if (!req.body.billing.address1) {
    return OrderError(res, "Invalid billing data in body of post request: null address1");
  } else if (!req.body.billing.city) {
    return OrderError(res, "Invalid billing data in body of post request: null city");
  } else if (!req.body.billing.state) {
    return OrderError(res, "Invalid billing data in body of post request: null state");
  } else if (!req.body.billing.zip) {
    return OrderError(res, "Invalid billing data in body of post request: null zip");
  } else if (!req.body.card) {
    return OrderError(res, "Invalid card data in body of post request");
  } else if (!req.body.card.token) {
    return OrderError(res, "Invalid card data in body of post request: null token");
  } else if (!req.body.card.last4) {
    return OrderError(res, "Invalid card data in body of post request: null last4");
  } else if (!req.body.user) {
    return OrderError(res, "Invalid user data in body of post request");
  } else if (!req.body.user.email) {
    return OrderError(res, "Invalid user data in body of post request: null email");
  } else if (!req.body.user.phone) {
    return OrderError(res, "Invalid user data in body of post request: null phone");
  }
}

function CalculateSubtotalProduct(product) {
  // don't trust the product obj that gets sent in req body
  var dbProduct;
  var config = product.config;
  Products.map(function (p) {
    if (p.name == product.product.name) {
      dbProduct = p;
    }
  });

  if (!dbProduct) {
    return null;
  }

  var subtotal = ProductUtilities.CalculateTotal(dbProduct, config);
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
  req.body.products = req.body.items;
  req.body.card = {};
  req.body.card.token = req.body.payment.token.id;
  req.body.card.last4 = req.body.payment.token.card.last4;
  req.body.user = {
    email: req.body.shipping.email,
    phone: req.body.shipping.phone,
  }

  if (req.body.billing.isSame == 'true') {
    req.body.billing = req.body.shipping;
    req.body.billing.isSame = true;
  }

  delete req.body.payment;
  delete req.body.items;

  if (VerifyData(req, res) == false) {
    return OrderError(res, "An unexpected error occurred");
  }

  var order = req.body;
  order.subtotal = 0;
  for (var i = 0; i < order.products.length; i++) {
    var st = CalculateSubtotalProduct(order.products[i]);
    if (!st) { //an err occurred
      return OrderError(res, "An unexpected error occurred");
    }
    order.products[i].quantity = Number(order.products[i].quantity);
    if (order.products[i].quantity < 1) {
      return OrderError(res, "Error: you cannot order a quantity less than 1.");
    }

    order.products[i].subtotal = st * order.products[i].quantity;
    order.subtotal = order.subtotal + order.products[i].subtotal;
    order.products[i].productId = order.products[i].product.id;

    // add price, label to each config item
    for (var j = 0; j < order.products[i].config.length; j++) {
      var product = order.products[i].product;
      var config = order.products[i].config;
      Products.map(function (p) {
        if (p.name == product.name) {
          order.products[i].basePrice = p.basePrice;
          p.config.map(function (c1) {
            config.map(function (c2, c2_idx) {
              if (c1.name == c2.name) {
                c1.items.map(function (c1i) {
                  if (c1i.id == Number(c2.value)) {
                    order.products[i].config[c2_idx].categoryLabel = c1.label;
                    order.products[i].config[c2_idx].label = c1i.label;
                    order.products[i].config[c2_idx].price = c1i.price;
                  }
                });
              }
            });
          });
        }
      });
      order.products[i].config
    }
  }

  order.subtotal = order.subtotal;
  order.tax = CalculateTaxes(order);
  order.total = order.subtotal + order.tax;
  order.createdOn = Date(new Date().getTime());
  order.status = "placed";
  order.expectedShipmentDate = new Date();
  order.expectedShipmentDate.setDate(new Date().getDate() + (7*12));
  order.token = token();

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
      return OrderError(res, "An error occurred while processing your payment:" + err.message);
    } else {
        var orderDoc = new Order(order);
        orderDoc.save(function (err, savedDoc) {
          console.log(err);
          if (err) {
            return OrderError(res, "An error occurred while saving the order details to our system:" + err);
          } else {
            OrderSuccess(res, savedDoc);
          }
        });
    }
  });
});

module.exports = router;
