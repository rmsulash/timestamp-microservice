// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// empty date parameter
app.get("/api", function (req, res) {
  date= Date.now()
    dateUTC = new Date(date).toUTCString()
    dateUnix= parseInt(date)
  res.json({unix: dateUnix, utc: dateUTC })
});

app.get("/api/:date", function (req, res) {
  let date = req.params.date
  let dateUTC
  let dateUnix

  if (!date.match(/\d{5,}/g)){
  // if date is 2015-12-25
    dateUnix = new Date(date).getTime()
    dateUTC = new Date(date).toUTCString()
  }else{
  // if date is in unix
    date=parseInt(date)
    dateUTC = new Date(date).toUTCString()
    dateUnix= parseInt(date)
  }
  if(dateUTC=='Invalid Date' || dateUnix == null){
    // if invalid date
    res.json({ error : "Invalid Date" })
  }
   res.json({unix: dateUnix, utc: dateUTC })
});

//parse



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
