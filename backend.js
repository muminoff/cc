var express = require('express'),
app = express(),
mysql = require('mysql'),
nodemailer = require('nodemailer'),
connection = mysql.createConnection({
    host: 'localhost',
    user: 'paypal',
    password: 'paypal',
    database: 'paypal'
}), 
purchasedServices = 'SELECT name, company, manager, email, country, phone, users, amount, domain FROM purchased_services',
availablePlans = 'SELECT name, rate FROM available_plans';


app.get('/plans', function(req, res) {
  connection.query("desc purchased_services", function(err, rows){
    if(err) throw err;
    res.header('Access-Control-Allow-Origin', '*');
    res.json({available_plans: rows});
  });
});

var sendMailToCustomer = function(managerName, mailAddress, mailContent) {
	var transport = nodemailer.createTransport('Sendmail', '/usr/sbin/sendmail');

	var message = {
	  from: 'Moffice Suite Support Team <support@hanbiro.net>',
	  to: mailAddress, 
	  subject: 'Moffice Suite Support Team',
	  text: managerName + ', Thank you for contacting our support team. Your ticket has been answered for your request. The details of your ticket are shown below. ---------------' + mailContent + '---------------Moffice Suite Support Team',
	  html: '<p>' + managerName + ',</p><br/><p>Thank you for contacting our support team.</p><p>Your ticket has been answered for your request. The details of your ticket are shown below</p><hr>' + mailContent + '<hr>Moffice Suite Support Team'
	}


	transport.sendMail(message, function(error){
	  if(error){
		return;
	  }
	});
}

app.post('/purchase', function(req, res) {
  var ticketId = req.body.ticketId;
  if(ticketId) {

    connection.query('UPDATE `gwmanage`.`moffice_contact` SET `_Status` = "closed" WHERE `moffice_contact`.`_No` =' + ticketId + ';', function(err, rows) {
    if(err) throw err;
		connection.query('SELECT _Company_Manager, _Company_Email FROM `gwmanage`.`moffice_contact` WHERE _No="' + ticketId + '";', function(err, rows) {
		if(err)throw err;
});
        res.header('Access-Control-Allow-Origin', '*');
        res.json({result: rows}); 
      });

  }
});

app.post('/purchasePlan', function(req, res) {
  console.log(req.body);
  // var name = req.body.name,
  // company = req.body.company,
  // email = req.body.email,
  // country = req.body.country,
  // phone = req.body.phone,
  // users = req.body.users,
  // amount = req.body.amount,
  // domain = req.body.domain,
  // if(name && company && email && country && phone && users && amount && domain) {

  // var insertQuery = 'UPDATE purchased_services SET ';
  // insertQuery = insertQuery + 'name="' + name + '", company="' + company + '", email="' + email + '", ';
  // insertQuery = insertQuery + 'country="' + country + '", phone="' + phone + '", ';
  // insertQuery = insertQuery + 'users="' + users + '", amount="' + amount + '", domain="' + domain + '", ';
  // insertQuery = insertQuery + '_Standard_Id2="' + standardId2 + '", _Standard_Pass2="' + standardPass2 + '";';
  // //console.log(insertQuery);
  // connection.query(insertQuery, function(err, rows) {
	  // if(err)throw err;
  //     res.header('Access-Control-Allow-Origin', '*');
  //     res.json({result: true});
  //   });
  // }
});


app.listen(3456);
