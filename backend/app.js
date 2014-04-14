var express = require('express'),
  fs = require('fs'),
  mysql = require('mysql'),
  config = require('./config/config');

  var dbconnection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "qwe123qwe",
    database: "test"
  });

  dbconnection.on("error", function(error){
    console.log("ERROR" + error);
  });

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

var app = express();

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port);
