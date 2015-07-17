var express = require('express');
var router = express.Router();

var BNET_API_KEY = require('../secret').BNET_API_KEY;
var bnet = require('battlenet-api')(BNET_API_KEY);


router.get('/:id', function(request, response) {
  // ID of guild on warcaftlogs.com/guild/:id
  var id = request.params.id;

  response.json('get ' + id);
  // TODO db if needed
});


router.get('/:realm/:guild', function(request, response) {
  var realm = request.params.realm; // e.g. emerald-dream
  var guild = request.params.guild;

  // get the guild roster

  bnet.wow.guild.members(
    {
      origin: 'us',
      realm: realm,
      name: guild
    },
    function (error, data) {
      if (error) {
        response.send(error);
      }
      else {

        response.json(data);
        //TODO


      }
    }
  );




});



module.exports = router;
