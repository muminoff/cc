var conn = require('../config')
  , availablePlans = 'SELECT name, rate FROM available_plans';

exports.list = function(req, res){
  var connection = conn.index;
  connection.query(available_plans, function(err, rows){
    if(err) throw err;
    res.header('Access-Control-Allow-Origin', '*');
    res.json({available_plans: rows});
  });
};
