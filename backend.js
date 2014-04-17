
/**
 * Hanbiro MofficeSuite Paypal Backend
 * -----------------------------------
 *
 *  Developer: sardor@hanbiro.com
 *  Maintainer: linuxmaster@hanbiro.com
 *
 */

var express = require('express')
  // , services = require('./routes/services')
  , plans = require('./routes/plans')
  , paypal = require('./routes/paypal')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();

// configuration
try {
  var configJSON = fs.readFileSync(__dirname + "/config.json");
  var config = JSON.parse(configJSON.toString());
} catch (e) {
  console.error("File config.json not found or is invalid: " + e.message);
  process.exit(1);
}

paypal.init(config);

// all environments 
app.configure(function(){
  app.set('port', process.env.PORT || config.port);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('Your random generated key here.'));
  app.use(express.session());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/plans', plans.list);
app.post('/create', paypal.create);
app.get('/execute', paypal.execute);
app.get('/cancel', paypal.cancel);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Paypal backend listening on port " + app.get('port'));
});
