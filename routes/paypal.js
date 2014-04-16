var conn = require('../config');

exports.success = function(req, res){
  res.send('This is success page');
};

exports.cancel = function(req, res){
  res.send('This is cancel page');
};
