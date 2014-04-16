var conn = require('../config');

exports.insert = function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  var connection = conn.index
  , plan = req.body.plan
  , name = req.body.manager
  , company = req.body.company
  , email = req.body.email
  , country = req.body.country
  , phone = req.body.phone
  , users = req.body.users
  , amount = req.body.amount
  , domain = req.body.domain;
  if(plan && name && company && email && country && phone && users && amount && domain) {

  var insertQuery = "INSERT INTO `paypal`.`purchased_services` (`plan`, `name`, `company`, `email`, `country`, `phone`, `users`, `amount`, `domain`, `paid`) VALUES (";
  insertQuery += '"' + plan + '", "' + name + '", "' + company + '", "' + email + '", ';
  insertQuery += '"' + country + '", "' + phone + '", "' + users + '", "' + amount + '", "' + domain + '", 0);';
  connection.query(insertQuery, function(err, rows) {
	  if(err)throw err;
      res.json({result: true});
    });
  } else {
      res.json({result: false});
  }
};
