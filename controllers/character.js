var express = require('express');
var router = express.Router();

var BNET_API_KEY = require('../secret').BNET_API_KEY;
var bnet = require('battlenet-api')(BNET_API_KEY);

// TODO pull request battleapi-net to add in 'feed' argument
var wow = require('../wow');


router.get('/feed/:realm/:character', function(request, response) {
  var realm = request.params.realm; // e.g. emerald-dream
  var character = request.params.character;

  // TODO this is us only at the moment
  wow.getCharacterFeed(
    realm,
    character,
    function onSuccess(data) {
      response.json(data);
    },
    function onError(error) {
      response.send(error);
    }
  );
});


module.exports = router;
