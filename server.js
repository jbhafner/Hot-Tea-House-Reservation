var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================


// Table reservation data

var tables = [
{
"customerName": "joe",
"phoneNumber": "834746665",
"customerEmail": "lsldfj",
"customerID": "css"
},
{
"customerName": "ewtsty",
"phoneNumber": "23424234",
"customerEmail": "sfsgsfdg@gmail.com",
"customerID": "33445"
},
{
"customerName": "sally",
"phoneNumber": "9797897987",
"customerEmail": "lsdkjfk",
"customerID": "html"
},
{
"customerName": "Test",
"phoneNumber": "123 123 1234",
"customerEmail": "test@test.com",
"customerID": "test"
}];

var waitList = [];

// GETS


app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/tables',function(req,res){
	res.sendFile(path.join(__dirname,'tables.html'));
});

app.get('/reserve',function(req,res){
	res.sendFile(path.join(__dirname,'reserve.html'));
});

app.get("/api/tables", function(req, res) {
    res.json(tables);
  });
  app.get("/api/waitlist", function(req, res) {
    res.json(waitList);
  });

  app.post("/api/tables", function(req, res) {
    if (tables.length < 5) {
      tables.push(req.body);
      res.json(true);
    }
    else {
      waitList.push(req.body);
      res.json(false);
    }
  });

app.post("/api/clear", function() {
    // Empty out the arrays of data
    tables = [];
    waitList = [];
    console.log(tables);
  });

// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
