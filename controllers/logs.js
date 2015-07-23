var express = require('express');
var router = express.Router();

var WarcraftLogs = require('../warcraft-logs');


router.get('/reports/:region/:realm/:guild', function(request, response) {
  var realm = request.params.realm; // e.g. lightnings-blade
  var guild = request.params.guild;
  var region = request.params.region;

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
    }
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
