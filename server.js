var express  = require('express');
var app      = express();
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var Chance = require('chance');
var chance = new Chance();

// set for local development, change when deploying
var port     = 50000;
var ipaddress = "127.0.0.1";

// set up our express application
app.use(morgan('dev'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + '/public'));

// set up sessions
app.use(bodyParser());
app.use(session({
  cookieName: 'session',
  secret: chance.word({length: 30}),
  duration: 180 * 60 * 1000, // 180 minutes or 3 hours
  activeDuration: 30 * 60 * 1000, // 30 minutes
  secure: true, // ensures cookies are only used via HTTPS
}));

// routes
require('./routes/routes.js').init(app);
require('./routes/graph_data.js').init(app);
require('./routes/folder.js').init(app);

// launch 
app.listen(port, ipaddress, function() {
  console.log('%s: Server started on %s:%d ...', Date(Date.now()), ipaddress, port);
});