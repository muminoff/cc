
/*
 * configuration
 */

var mysql = require('mysql');

exports.index = mysql.createConnection({
  host: 'localhost',
  user: 'paypal',
  password: 'paypal',
  database: 'paypal'
});
