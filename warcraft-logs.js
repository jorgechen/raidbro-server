// Node wrapper for WarcraftLogs.com API

var http = require('http');
var https = require('https');
var querystring = require('querystring');

var API_KEY = require('./config').WARCRAFT_LOGS_API_KEY;
var DOMAIN = 'www.warcraftlogs.com';
var PORT = 443;

var WarcraftLogs = {};

//TODO total calls allowed is 100/sec so we have to cap requests by time

WarcraftLogs.get = function (path, callback, args) {

  args = args || {};
  args.api_key = API_KEY;

  var fullPath = '/v1' + path + '?' + querystring.stringify(args);

  console.log('GET ' + fullPath)

  var options = {
    method: 'GET',
    hostname: DOMAIN,
    port: PORT,
    path: fullPath
  };

  var request = https.request(
    options,
    function (response) {
      processResponse(response, callback);
    }
  );

  request.end();
}

// helper
function processResponse( response, callback ) {
  var json = null;
  var body = '';
  var status = response.statusCode;

  response.setEncoding('utf8');

  // Combine data received
  response.on('data', function(data) {
    body += data;
  });

  response.on('end', function() {
    // parse response
    try {
      json = JSON.parse(body);
    }
    catch (exception) {
      callback('Could not parse ' + body);
    }

    // finish
    if (200 == status && json) {
      callback(null, json);
    }
    else {
      callback(status + ' ' + http.STATUS_CODES[status] + '  ' + JSON.stringify(json));
    }
  });
}


/**
 * @brief All or subset of reports for a guild,
 *        e.g. /reports/guild/nightfall/emerald-dream
 */
WarcraftLogs.getGuildReports = function (realm, guildName, region, callback, options) {
  WarcraftLogs.get(
    '/reports/guild/' + guildName + '/' + realm + '/' + region,
    callback,
    options
  );
}


/**
 * @brief Get fights (i.e. pulls) from a report along with raiders in the fight,
 *        e.g. /report/fights/HZxc1zGB2d3WkyvJ
 */
WarcraftLogs.getFights = function (code, callback) {
  WarcraftLogs.get(
    '/report/fights/' + code,
    callback
  );
}


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

module.exports = WarcraftLogs;

