var express = require('express');
var webApp = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var fs = require('fs');
var cors = require('cors');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'justtryingsomething1234@gmail.com',
        pass: '!@#$qwer'
    }
});
webApp.use(cors());
webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({extended: true}));

webApp.get('/', function(req, res) {
    res.send("hello world");
});

webApp.post('/email', function(req, res) {
    var postedData = req.body;
    transporter.sendMail({
            from: 'justtryingsomething1234@gmail.com',
            to: 'justtryingsomething1234@gmail.com',
            subject: 'This is a test',
            html: content
        },
        function(err, info) {
          if(err){
            console.log(JSON.stringify(err));
            return res.sendStatus(500);
          }

    console.log(JSON.stringify(info));
    res.json(info);
  });
});

webApp.post('/send-resume', function(req, res){
  if(!req.body || !req.body.destination_email){
    console.log("recieved a bad request");
    res.sendStatus(400);
    return;
  }
  fs.readFile('./resume.html', function(err, content){
    if(err){
      console.log(JSON.stringify(err));
      return res.sendStatus(500);
    }
    transporter.sendMail({
            to: req.body.destination_email,
            subject: 'This is a test',
            html: content
        },
        function(err, info) {
          if(err){
            console.log(JSON.stringify(err));
            return res.sendStatus(500);
          }
    console.log(JSON.stringify(info));
    res.json(info);
  })
  });
});

webApp.get('/send-resume', function(req, res){
  fs.readFile('./resume-emailer.html', function(err, contents){
    res.end(contents);
  })
})

webApp.listen(8967);
console.log('server listening');
