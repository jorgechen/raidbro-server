var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('home');
});

// include other routes
var GuildController = require('./guild');
router.use('/guild', GuildController);
router.use('/', GuildController);


module.exports = router;
