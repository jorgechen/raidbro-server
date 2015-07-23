var express = require('express');
var router = express.Router();

var WarcraftLogs = require('../warcraft-logs');

var WowTime = require('../wow-time');

router.get('/reports/:region/:realm/:guild', function(request, response) {
  var realm = request.params.realm; // e.g. lightnings-blade
  var guild = request.params.guild;
  var region = request.params.region;

  var options = {};

  // number of 'weeks' within which reports should be retrieved
  var weeks;
  if (request.query.weeks) {
    weeks = parseInt(request.query.weeks);
    if (weeks && weeks > 0) {
      options.start = WowTime.previousResetDate(region, weeks).getTime();
    }
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


router.get('/fights/:code', function(request, response) {
  var realm = request.params.code;

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
