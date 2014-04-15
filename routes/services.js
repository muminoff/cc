var conn = require('../config');

exports.insert = function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  var connection = conn.index
  , name = req.body.name
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
};
