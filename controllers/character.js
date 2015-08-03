var express = require('express');
var router = express.Router();

var BNET_API_KEY = require('../secret').BNET_API_KEY;
var bnet = require('battlenet-api')(BNET_API_KEY);

// TODO pull request battleapi-net to add in 'feed' argument
var wow = require('../wow');
var WowTime = require('../wow-time');


var FEED_TYPES = ['BOSSKILL', 'CRITERIA', 'LOOT']

router.get('/feed/:region/:realm/:name', function(request, response) {
  var realm = request.params.realm; // e.g. emerald-dream
  var name = request.params.name;
  var region = request.params.region;

  // Query string arguments
  var filter = 'string' === typeof request.query.filter ? request.query.filter.toUpperCase() : '';

  var start = parseInt(request.query.start);

  // Filters stuff after X days ago
  var daysAgo = parseInt(request.query.daysAgo);
  start = WowTime.timestampDaysBefore(daysAgo);

  // TODO this is us only at the moment

  wow.getCharacterFeed(
    realm,
    name,
    function onSuccess(data) {

      // Filter items of the wrong type
      if (-1 < FEED_TYPES.indexOf(filter)) {
        data.feed = data.feed.filter(function (element) {
          return filter === element.type;
        });
      }

      // Filter items before a certain time
      if (start) {
        data.feed = data.feed.filter(function (element) {
          return start < (element.timestamp);
        });
      }

      response.json(data);
    },
    function onError(error) {
      response.send(error);
    }
  );
});


router.get('/items/:region/:realm/:name', function(request, response) {
  var realm = request.params.realm; // e.g. emerald-dream
  var name = request.params.name;
  var region = request.params.region;

  bnet.wow.character.items(
    {
      origin: region,
      realm: realm,
      name: name
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
