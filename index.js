// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// get request for the end point /api
app.get('/api', (req, res) => {
  let dateString1 = Date.now()
  let jsonObj = { 'unix': dateString1, 'utc': Date(dateString1) };
  res.send(jsonObj);
  console.log(jsonObj);
});

// gets the date propertie mapped to the "api" route
app.get('/api/:first', (req, res) => {

  res.send(getUtcAndUnix(req.params.first));

});

// function to convert the mapped parameter to utc or unix 
const getUtcAndUnix = (date) => {
  let newDate
  if(date){
    if(new Date(date)+'' === "Invalid Date"){
        newDate = new Date(parseInt(date,10))
        if(newDate+'' === "Invalid Date") return {error: 'Invalid Date'}
    }else{
        newDate = new Date(date)
    }
  }else{
    newDate = new Date()
  }
  return{
   utc: newDate.toGMTString(),
    unix: newDate.getTime()
  }
}