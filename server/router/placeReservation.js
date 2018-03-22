var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');
var EmailSender = require('../components/EmailSender');

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

function getBillingAddressString (reservation) {
  return reservation.billing.address1
    + ", " + reservation.billing.city
    + ", " + reservation.billing.state
    + " " + reservation.billing.zip;
}

function OrderSuccess (res, reservation) {
  res.json({success: true, message: "Reservation placed successfuly"});

  var html = EmailSender.Emails.ReservationPlaced
    .replace("__NAME__", reservation.user.firstName)
    .replace("__PHONE__", reservation.user.phone)
    .replace("__ADDRESS__", getBillingAddressString(reservation))
    .replace("__TOTAL__", "$" + reservation.total.formatMoney(2));
  var emailSender = new EmailSender({
    from: "zach@slaterobots.com",
    to: reservation.user.email,
    bcc: "zach@slaterobots.com",
    subject: "Slate Robotics Reservation Confirmation",
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
  } else if (!req.body.user.firstName) {
    OrderError(res, "Invalid user data in body of post request: null firstName");
  } else if (!req.body.user.lastName) {
    OrderError(res, "Invalid user data in body of post request: null lastName");
  } else if (!req.body.user.email) {
    OrderError(res, "Invalid user data in body of post request: null email");
  } else if (!req.body.user.phone) {
    OrderError(res, "Invalid user data in body of post request: null phone");
  }
}

router.post('/', function (req, res) {
  VerifyData(req, res);
  if (!errorOccurred) {
    var reservation = req.body;
    reservation.total = 99;
    reservation.createdOn = Date(new Date().getTime());
    reservation.token = token();

    var metadata = {};
    metadata["firstName"] = reservation.user.firstName;
    metadata["lastName"] = reservation.user.lastName;
    metadata["email"] = reservation.user.email;
    metadata["phone"] = reservation.user.phone;

    stripe.charges.create({
      amount: Math.round(reservation.total * 100),
      currency: "usd",
      description: "Slate Robotics, Inc. - TR1 Reservation",
      metadata: metadata,
      source: reservation.card.token,
    }, function (err, charge) {
      if (err) {
        OrderError(res, "An error occurred while processing your payment:" + err.message);
      } else {
          var reservationDoc = new Reservation(reservation);
          reservationDoc.save(function (err, savedDoc) {
            if (err) {
              OrderError(res, "An error occurred while saving the reservation details to our system:" + err);
            } else {
              OrderSuccess(res, savedDoc);
            }
          });
      }
    });

  }

});

module.exports = router;
