var express = require('express'),
app = express(),
mysql = require('mysql'),
nodemailer = require('nodemailer'),
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wpswkd',
    database: 'gwmanage'
}),
openTicketsQuery = 'SELECT _No, _Company_Name, _Company_Manager, _Phone, _Company_Email, _Count, _Receive_Time, _Country, _Access_Ip, _Status FROM moffice_contact WHERE _Status="new" ORDER BY _Receive_Time;',
closedTicketsQuery = 'SELECT _No, _Company_Name, _Company_Manager, _Phone, _Company_Email, _Count, _Receive_Time, _Country, _Access_Ip, _Status FROM moffice_contact WHERE _Status="closed" ORDER BY _Receive_Time;',
allTicketsQuery = 'SELECT _No, _Company_Name, _Company_Manager, _Phone, _Company_Email, _Count, _Receive_Time, _Country, _Access_Ip, _Status FROM moffice_contact ORDER BY _Receive_Time;',
allTicketsAmountQuery = 'SELECT (SELECT COUNT(_No) FROM moffice_contact WHERE _Status="closed") AS closed_tickets, (SELECT COUNT(_No) FROM moffice_contact WHERE _Status="new") AS open_tickets;',
demoAccountInfoQuery = 'SELECT * FROM demomanage;';

app.use(express.json());
app.use(express.urlencoded());

app.get('/open_tickets', function(req, res) {
  connection.query(openTicketsQuery, function(err, rows){
    if(err) throw err;
    res.header('Access-Control-Allow-Origin', '*');
    res.json({openTickets: rows});
  });
});

app.get('/closed_tickets', function(req, res) {
  connection.query(closedTicketsQuery, function(err, rows){
    if(err) throw err;
    res.header('Access-Control-Allow-Origin', '*');
    res.json({closedTickets: rows});
  });
});

app.get('/all_tickets', function(req, res) {
  connection.query(allTicketsQuery, function(err, rows){
    if(err) throw err;
	res.header('Access-Control-Allow-Origin', '*');
	res.json({allTickets: rows});
  });
});

app.get('/tickets_amount', function(req, res) {
  connection.query(allTicketsAmountQuery, function(err, rows){
    if(err) throw err;
	res.header('Access-Control-Allow-Origin', '*');
	res.json({ticketsAmount: rows});
  });
});

app.get('/getTicketInfo', function(req, res) {
  connection.query('SELECT _No, _Company_Name, _Company_Manager, _Phone, _Company_Email, _Count, _Receive_Time, _Status, _Comment, _Reply FROM moffice_contact WHERE _No ="' + req.query.id + '";', function(err, rows){
    if(err) throw err;
	res.header('Access-Control-Allow-Origin', '*');
	res.json({ticketInfo: rows});
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

app.post('/respondTicket', function(req, res) {
  var ticketId = req.body.ticketId,
  ticketRespond = req.body.ticketRespond;
  if(ticketId && ticketRespond) {

    connection.query('UPDATE `gwmanage`.`moffice_contact` SET `_Reply` = "' + ticketRespond + '", `_Status` = "closed" WHERE `moffice_contact`.`_No` =' + ticketId + ';', function(err, rows) {
    if(err) throw err;
		connection.query('SELECT _Company_Manager, _Company_Email FROM `gwmanage`.`moffice_contact` WHERE _No="' + ticketId + '";', function(err, rows) {
		if(err)throw err;
		sendMailToCustomer(rows[0]._Company_Manager, rows[0]._Company_Email, ticketRespond);
});
        res.header('Access-Control-Allow-Origin', '*');
        res.json({result: rows}); 
      });

  }
});

app.post('/closeTicket', function(req, res) {
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

app.get('/getDemoAccountInfo', function(req, res) {
  connection.query(demoAccountInfoQuery, function(err, rows){
	//console.log(rows);
    if(err) throw err;
	res.header('Access-Control-Allow-Origin', '*');
	res.json({demoAccount: rows});
  });
});

app.post('/setDemoAccountInfo', function(req, res) {
  //console.log(req.body);
  var liteUrl = req.body.liteUrl,
  liteId1 = req.body.liteId1,
  litePass1 = req.body.litePass1,
  liteId2 = req.body.liteId2,
  litePass2 = req.body.litePass2,
  standardUrl = req.body.standardUrl,
  standardId1 = req.body.standardId1,
  standardPass1 = req.body.standardPass1,
  standardId2 = req.body.standardId2,
  standardPass2 = req.body.standardPass2,
  advancedUrl = req.body.advancedUrl,
  advancedId1 = req.body.advancedId1,
  advancedPass1 = req.body.advancedPass1,
  advancedId2 = req.body.advancedId2,
  advancedPass2 = req.body.advancedPass2,
  messengerUrl = req.body.messengerUrl,
  messengerId1 = req.body.messengerId1,
  messengerPass1 = req.body.messengerPass1,
  messengerId2 = req.body.messengerId2,
  messengerPass2 = req.body.messengerPass2,
  clouddiskUrl = req.body.clouddiskUrl,
  clouddiskId1 = req.body.clouddiskId1,
  clouddiskPass1 = req.body.clouddiskPass1,
  clouddiskId2 = req.body.clouddiskId2,
  clouddiskPass2 = req.body.clouddiskPass2;
  if(liteUrl && liteId1 && litePass1 && liteId2 && litePass2 && standardUrl && standardId1 && standardPass1 && standardId2 && standardPass2 && advancedUrl && advancedId1 && advancedPass1 && advancedId2 && advancedPass2 && messengerUrl && messengerId1 && messengerPass1 && messengerId2 && messengerPass2 && clouddiskUrl && clouddiskId1 && clouddiskPass1 && clouddiskId2 && clouddiskPass2) {

  var insertQuery = 'UPDATE demomanage SET ';
  insertQuery = insertQuery + '_Lite_Url="' + liteUrl + '", _Lite_Id1="' + liteId1 + '", _Lite_Pass1="' + litePass1 + '", ';
  insertQuery = insertQuery + '_Lite_Id2="' + liteId2 + '", _Lite_Pass2="' + litePass2 + '", ';
  insertQuery = insertQuery + '_Standard_Url="' + standardUrl + '", _Standard_Id1="' + standardId1 + '", _Standard_Pass1="' + standardPass1 + '", ';
  insertQuery = insertQuery + '_Standard_Id2="' + standardId2 + '", _Standard_Pass2="' + standardPass2 + '", ';
  insertQuery = insertQuery + '_Advanced_Url="' + advancedUrl + '", _Advanced_Id1="' + advancedId1 + '", _Advanced_Pass1="' + advancedPass1 + '", ';
  insertQuery = insertQuery + '_Advanced_Id2="' + advancedId2 + '", _Advanced_Pass2="' + advancedPass2 + '", ';
  insertQuery = insertQuery + '_Messenger_Url="' + messengerUrl + '", _Messenger_Id1="' + messengerId1 + '", _Messenger_Pass1="' + messengerPass1 + '", ';
  insertQuery = insertQuery + '_Messenger_Id2="' + messengerId2 + '", _Messenger_Pass2="' + messengerPass2 + '", ';
  insertQuery = insertQuery + '_Cloud_Url="' + clouddiskUrl + '", _Cloud_Id1="' + clouddiskId1 + '", _Cloud_Pass1="' + clouddiskPass1 + '",';
  insertQuery = insertQuery + '_Cloud_Id2="' + clouddiskId2 + '", _Cloud_Pass2="' + clouddiskPass2 + '";';
  //console.log(insertQuery);
  connection.query(insertQuery, function(err, rows) {
	  if(err)throw err;
      res.header('Access-Control-Allow-Origin', '*');
      res.json({result: true});
    });
  }
});


app.listen(3000);
