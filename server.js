// Require our dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8800;

// Templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');



/////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
/////////////////////////////////////////////////////////////////////////////
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);

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
