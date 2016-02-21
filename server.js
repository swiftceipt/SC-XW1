var express  = require('express');
var app      = express();
var morgan   = require('morgan');

// set for local development, change when deploying
var port     = 50000;
var ipaddress = "127.0.0.1";

// set up our express application
app.use(morgan('dev'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + '/public'));

// routes

// launch 
app.listen(port, ipaddress, function() {
  console.log('%s: Server started on %s:%d ...', Date(Date.now()), ipaddress, port);
});