var http = require('http');
var https = require('https');
var querystring = require('querystring');
var API_KEY = require('./secret').BNET_API_KEY;
var DOMAIN = 'us.api.battle.net';

var WowApi = {};

WowApi.get = function (path, onSuccess, onError, arguments) {

  arguments = arguments || {};
  arguments.apikey = API_KEY;
  arguments.locale = 'en_US';

  var fullPath = '/wow' + path + '?' + querystring.stringify(arguments);

  console.log(fullPath)

  var options = {
    method: 'GET',
    hostname: DOMAIN,
    // port: 80,
    path: fullPath
  };

  var request = https.request(
    options,
    function (data) {
      processResponse(data, onSuccess, onError);
    }
  );

  request.end();
}

// helper
function processResponse( response, onSuccess, onError ) {
  var json = null;
  var body = '';
  var status = response.statusCode;

  if ( 200 === status ) {
    response.setEncoding('utf8');

    // Combine data received
    response.on('data', function(data) {
      body += data;
    });

    response.on('end', function() {
      try {
        json = JSON.parse(body);
      }
      catch (exception) {
        onError('Could not parse ' + body);
      }

      if (null !== json) {
        onSuccess(json);
      }
    });

  }
  else {
     onError(status + ': ' + http.STATUS_CODES[status]);
  }
}


WowApi.BRACKETS = ['2v2', '3v3', '5v5', 'rbg'];
/**
 * @param bracket 2v2, 3v3, 5v5, rbg
 */
WowApi.getLeaderboards = function (bracket, onSuccess, onError) {
  if ( 'string' === typeof bracket &&
    -1 != WowApi.BRACKETS.indexOf(bracket) ) {

    WowApi.get(
      '/leaderboard/' + bracket,
      onSuccess,
      onError
    );
  }
  else {
    throw 'Bracket is wrong';
  }
}

WowApi.getCharacter = function (realm, characterName, onSuccess, onError, field) {

  WowApi.get(
    '/character/' + realm + '/' + characterName,
    onSuccess,
    onError,
    { 'fields': field }
  );
}

WowApi.getCharacterItems = function (realm, characterName, onSuccess, onError) {
  WowApi.getCharacter(realm, characterName, onSuccess, onError, 'items');
}


module.exports = WowApi;
