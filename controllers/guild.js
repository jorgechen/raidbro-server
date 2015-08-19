var express = require('express');
var router = express.Router();

var BNET_API_KEY = require('../config').BNET_API_KEY;
var bnet = require('battlenet-api')(BNET_API_KEY);


router.get('/roster/:region/:realm/:guild', function(request, response) {
  var realm = request.params.realm; // e.g. emerald-dream
  var guild = request.params.guild;
  var region = request.params.region;

  // get the guild roster
  bnet.wow.guild.members(
    {
      origin: region,
      realm: realm,
      name: guild
    },
    function (error, data) {
      if (error) {
        response.send(error);
      }
      else {
        response.json(data);
      }
    }
  );
});


module.exports = router;
