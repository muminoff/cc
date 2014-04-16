var conn = require('../config')
, paypal_api = require('paypal-rest-sdk');

var config_opts = {
  'host': 'api.sandbox.paypal.com',
  'port': '',
  'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
  'clietn_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
};

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http:\/\/localhost:3456\/success",
        "cancel_url": "http:\/\/localhost:3456\/cancel"
    },
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};

exports.success = function(req, res){
  res.send('This is success page');
};

exports.cancel = function(req, res){
  res.send('This is cancel page');
};

exports.pay = function(req, res){
  // res.header('Access-Control-Allow-Origin', '*');
  paypal_api.payment.create(create_payment_json, config_opts, function (err, res) {
    if (err) {
      throw err;
    }

    if (res) {
      console.log("Create Payment Response");
      res.json(res);
    }
  });
};

