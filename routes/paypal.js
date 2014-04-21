'use strict';

var paypal = require('paypal-rest-sdk')
, config = {}
, db = require('../db')
, connection = db.index;

// Routes

exports.create = function (req, res) {
  var method = req.param('method')
  , currency = req.param('currency')
  , amount = req.param('amount')
  // , plan = req.param('plan')
  , name = req.param('manager')
  , company = req.param('company')
  , email = req.param('email')
  , country = req.param('country')
  , phone = req.param('phone')
  , users = req.param('users')
  // , domain = req.param('domain') 
  , payment = {
    "intent": "sale",
    "payer": {
    },
    "transactions": [{
      "amount": {
        "currency": currency,
        "total": amount
      },
      // "description": plan
      "description": "Purchase Mofficesuite"
    }]
  };

  if(method && currency && amount && name && company && email && country && phone && users){

    payment.payer.payment_method = 'paypal';
    payment.redirect_urls = {
      "return_url": "http://paypal.mofficesuite.com:" + config.port + "/execute",
      "cancel_url": "http://paypal.mofficesuite.com:" + config.port + "/cancel"
    };

    paypal.payment.create(payment, function (error, payment) {
      if (error) {
        // console.log(error);
        res.header('Access-Control-Allow-Origin', '*');
        res.json({ 'error': error, result: false });
      } else {

        var insertQuery = "INSERT INTO `paypal`.`purchased_services` (`name`, `company`, `email`, `country`, `phone`, `users`, `amount`, `paypal_payment_id`) VALUES (";
          insertQuery += '"' + name + '", "' + company + '", "' + email + '", ';
    insertQuery += '"' + country + '", "' + phone + '", "' + users + '", "' + amount + '", "' + payment.id + '");';
    connection.query(insertQuery, function(err, rows) {
      if(err)throw err;
      req.session.paymentId = payment.id;
      // res.header('Access-Control-Allow-Origin', '*');
      // res.json({ 'payment': payment, result: true }); 
      res.redirect(payment.links[1].href);
    }); 

      }
    });
  } else {
    res.header('Access-Control-Allow-Origin', '*');
    res.json({ 'error': 'Not enough input data', result: false });
  }
};

exports.execute = function (req, res) {
  var paymentId = req.session.paymentId;
  var payerId = req.param('PayerID'); 
  var details = { "payer_id": payerId };
  var payment = paypal.payment.execute(paymentId, details, function (error, payment) {
    if (error) {
      // console.log(error);
      // res.header('Access-Control-Allow-Origin', '*');
      // res.json({ 'error': error, result: false });
      var outHtml = "<!doctype html>";
      outHtml += "<head>";
      outHtml += "<meta charset=\"utf-8\">";
      outHtml += "<link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/css/bootstrap.min.css\" />";
      outHtml += "<title>Payment failed</title>";
      outHtml += "</head>";
      outHtml += "<body>";
      outHtml += "<h1>Payment failed</h1>";
      outHtml += "<h3>Status code: "+ error.httpStatusCode + "</h3>";
      outHtml += "<p>Error: <b>"+ error.response.name + "</b></p>";
      outHtml += "<p>Message: <b>"+ error.response.message + "</b></p>";
      outHtml += "<p>Debug ID: <b>"+ error.response.debug_id + "</b></p>";
      outHtml += "<a class=\"btn btn-danger btn-lg\" href=\"https://paypal.mofficesuite.com/\">Try again</a>"
      outHtml += "</body>";
      outHtml += "</html>";
      res.send(outHtml);
    } else {
      // res.header('Access-Control-Allow-Origin', '*');
      // res.json({ 'payment': payment, result: true });
      var outHtml = "<!doctype html>";
      outHtml += "<head>";
      outHtml += "<meta charset=\"utf-8\">";
      outHtml += "<link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/css/bootstrap.min.css\" />";
      outHtml += "<title>Payment done</title>";
      outHtml += "</head>";
      outHtml += "<body>";
      outHtml += "<h1>Payment done!</h1>";
      outHtml += "<p>Your payment successfully done. Soon we will inform you when your server gets ready.</p>";
      outHtml += "<p>Payment method: <b>" + payment.payer.payment_method + "</b></p>";
      outHtml += "<p>Transactions: </p>";
      for(var i=0; i<payment.transactions.length; i++){
        var transaction = payment.transactions[i];
        outHtml += "<p>Amount: <b>" + transaction.amount.total + " " + transaction.amount.currency + "</b></p>";
        outHtml += "<p>Description: <b>" + transaction.description + "</b></p>";
      }
      outHtml += "<p>Email: <b>" + payment.payer.payer_info.email + "</b></p>";
      outHtml += "<p>First name: <b>" + payment.payer.payer_info.first_name + "</b></p>";
      outHtml += "<p>Last name: <b>" + payment.payer.payer_info.last_name + "</b></p>";
      outHtml += "<a class=\"btn btn-success btn-lg\" href=\"http://www.mofficesuite.com/\">Go to mofficesuite.com</a>"
      outHtml += "</body>";
      outHtml += "</html>";
      res.send(outHtml);
    }
  });
};

exports.cancel = function (req, res) {
  var deleteQuery = 'DELETE FROM `paypal`.`purchased_services` WHERE `paypal_payment_id`="' + req.session.paymentId + '";';
    connection.query(deleteQuery, function(err, rows) {
      if(err)throw err;
      var outHtml = "<!doctype html>";
      outHtml += "<head>";
      outHtml += "<meta charset=\"utf-8\">";
      outHtml += "<link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/css/bootstrap.min.css\" />";
      outHtml += "<title>Payment done</title>";
      outHtml += "</head>";
      outHtml += "<body>";
      outHtml += "<h1>Payment cancelled</h1>";
      outHtml += "<p>You cancelled your payment.</p>";
      outHtml += "<a class=\"btn btn-warning btn-lg\" href=\"https://paypal.mofficesuite.com/\">Try again</a>"
      outHtml += "</body>";
      outHtml += "</html>";
      res.send(outHtml);
    }); 
};

// Configuration

exports.init = function (c) {
  config = c;
  paypal.configure(c.api);
};
