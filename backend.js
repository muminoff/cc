
/**
 * Module dependencies.
 */

var express = require('express')
  , plans = require('./routes/plans')
  , services = require('./routes/services')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql');

var app = express()
  , connection = mysql.createConnection({
  host: 'localhost',
  user: 'paypal',
  password: 'paypal',
  database: 'paypal'
});

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
app.post('/services', services.insert);
app.post('/purchase', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  var name = req.body.name
  , company = req.body.company
  , email = req.body.email
  , country = req.body.country
  , phone = req.body.phone
  , users = req.body.users
  , amount = req.body.amount
  , domain = req.body.domain;
  if(name && company && email && country && phone && users && amount && domain) {

  var insertQuery = "INSERT INTO `paypal`.`purchased_services` (`name`, `company`, `email`, `country`, `phone`, `users`, `amount`, `domain`) VALUES (";
  insertQuery += '"' + name + '", "' + company + '", "' + email + '", ';
  insertQuery += '"' + country + '", "' + phone + '", ';
  insertQuery += '"' + users + '", "' + amount + '", "' + domain + '");';
  console.log(insertQuery);
  connection.query(insertQuery, function(err, rows) {
	  if(err)throw err;
      res.json({result: true});
    });
  } else {
      res.json({result: false});
  }
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
