var express = require('express');
var router = express.Router();

var WarcraftLogs = require('../warcraft-logs');

var WowTime = require('../wow-time');

router.get('/reports/:region/:realm/:guild', function(request, response) {
  var realm = request.params.realm; // e.g. lightnings-blade
  var guild = request.params.guild;
  var region = request.params.region;

  var options = {};

  // Filters from less than X days ago
  var daysAgo = parseInt(request.query.daysAgo);
  if (daysAgo && 0 < daysAgo) {
    options.start = WowTime.timestampDaysBefore(daysAgo);
  }

  WarcraftLogs.getGuildReports(
    realm,
    guild,
    region,
    function (error, data) {
      if (error) {
        response.send(error);
      }
      else {
        response.json(data);
      }
    },
    options
  );
});

// All the fights (wipes + kills) in a single night
router.get('/fights/:code', function(request, response) {
  var code = request.params.code;

  WarcraftLogs.getFights(
    code,
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
