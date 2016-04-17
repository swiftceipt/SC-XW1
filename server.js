var express  = require('express');
var app      = express();
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var Chance = require('chance');
var chance = new Chance();
var config = require('./config.json');

var port     = config.server.port;
var ipaddress = config.server.ipaddress;

// set up our express application
app.use(morgan('dev'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + '/public'));

// set up sessions
app.use(bodyParser());
app.use(session({
  cookieName: 'session',
  secret: chance.word({length: 30}),
  duration: config.session_duration,
  activeDuration: config.activeDuration,
  secure: true, // ensures cookies are only used via HTTPS
}));

// routes
require('./routes/routes.js').init(app);
require('./routes/graph_data.js').init(app);
require('./routes/folder.js').init(app);
require('./routes/add_and_remove_receipts.js').init(app);

// launch 
app.listen(port, ipaddress, function() {
  console.log('%s: Server started on %s:%d ...', Date(Date.now()), ipaddress, port);
});