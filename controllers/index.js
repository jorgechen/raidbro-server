var express = require('express');
var router = express.Router();

var React = require('react');
var JSX = require('node-jsx').install();
var App = React.createFactory(require('../components/main.jsx'));


///////////////////////////////////////////////////////////////////////
// Home page
///////////////////////////////////////////////////////////////////////
router.get('/', function(req, res) {

  var initialGuild = {
    realm: 'emerald-dream',
    name: 'nightfall'
  }

  // Render React to a string, passing in our fetched tweets

  // var element = React.createElement(App, {
  var element = App({
    guild: initialGuild
  });

  var markup = React.renderToString(
    element
  );

  // Render our 'home' template
  res.render('home', {
    markup: markup, // Pass rendered react markup
    state: JSON.stringify(initialGuild) // Pass current state to client side
  });
});

///////////////////////////////////////////////////////////////////////
// API routes
///////////////////////////////////////////////////////////////////////

router.use('/', require('./character'));
router.use('/', require('./logs'));

var GuildController = require('./guild');
router.use('/', GuildController);

module.exports = router;

