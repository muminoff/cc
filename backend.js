
/**
 * Module dependencies.
 */

var express = require('express')
  , plans = require('./routes/plans')
  , services = require('./routes/services')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3456);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/plans', plans.list);
app.post('/purchase', services.insert);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
