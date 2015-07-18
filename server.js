// Require our dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 9000;

// Templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

/////////////////////////////////////////////////////////////////////////////
// ROUTES
/////////////////////////////////////////////////////////////////////////////

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// routes
app.use(require('./controllers'));


/////////////////////////////////////////////////////////////////////////////
// START THE SERVER
/////////////////////////////////////////////////////////////////////////////

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
