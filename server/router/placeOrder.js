var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var Reservation = require('../models/reservation');
var EmailSender = require('../components/EmailSender');
var Products = require('../../client/js/components/Products/Products.js');
var ProductTr1 = Products[0];

var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config.json"), "utf8"));
var stripe = require('stripe')(config.stripe.secret);

var errorOccurred = false;

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
    Order.findOne({"reservationToken": reservationToken}).exec(function(err, order) {
      if (order) orderWithReservationExists = true;
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
      result = result + order.products[i].productId.toUpperCase();
    } else {
      result = result + "<br/>" + order.products[i].productId.toUpperCase();
    }

    result = result + ": ";

    for (var j = 0; j < order.products[i].config.length; j++) {
      var config = order.products[i].config[j];
      var productConfig;
      for (var k = 0; k < ProductTr1.config.length; k++) {
        if (config.name == ProductTr1.config[k].name) {
          productConfig = ProductTr1.config[k];
        }
      }
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
  } else if (!req.body.billing.firstName) {
    OrderError(res, "Invalid billing data in body of post request: null firstName");
  } else if (!req.body.billing.lastName) {
    OrderError(res, "Invalid billing data in body of post request: null lastName");
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
  var subtotal = ProductTr1.basePrice;

  for (var j = 0; j < product.config.length; j++) {
    var config = product.config[j];
    var productConfig;
    for (var k = 0; k < ProductTr1.config.length; k++) {
      if (config.name == ProductTr1.config[k].name) {
        productConfig = ProductTr1.config[k];
      }
    }
    var configItem;
    for (var k = 0; k < productConfig.items.length; k++) {
      if (config.value == productConfig.items[k].id) {
        configItem = productConfig.items[k];
      }
    }

    if (configItem) {
      subtotal += configItem.price;
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

    if (order.reservationToken) {
      ValidateReservationToken(req.body, function (isValidReservation) {
        if (!isValidReservation) {
          OrderError(res, "Invalid reservation token.");
        } else {
          order.subtotal = order.subtotal - 1549;
          order.discount = 1549;
          order.tax = CalculateTaxes(order);
          order.total = order.subtotal + order.tax;

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
                orderDoc.save(function (err, savedDoc) {
                  if (err) {
                    OrderError(res, "An error occurred while saving the order details to our system:" + err);
                  } else {
                    OrderSuccess(res, savedDoc);
                  }
                });
            }
          });
        }
      });
    } else {
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
            orderDoc.save(function (err, savedDoc) {
              if (err) {
                OrderError(res, "An error occurred while saving the order details to our system:" + err);
              } else {
                OrderSuccess(res, savedDoc);
              }
            });
        }
      });
    }
  }

});

module.exports = router;
