// This is some functions that wrap around the Battle.net API,
// but we will save time with require('battlenet-api')

var http = require('http');
var https = require('https');
var querystring = require('querystring');
var API_KEY = require('./secret').BNET_API_KEY;
var DOMAIN = 'us.api.battle.net';

var WowApi = {};

//TODO total calls allowed is 100/sec so we have to cap requests by time

WowApi.get = function (path, onSuccess, onError, args) {

  args = args || {};
  args.apikey = API_KEY;
  args.locale = 'en_US';

  var fullPath = '/wow' + path + '?' + querystring.stringify(args);

  console.log(fullPath)

  var options = {
    method: 'GET',
    hostname: DOMAIN,
    // port: 80,
    path: fullPath
  };

  var request = https.request(
    options,
    function (response) {
      processResponse(response, onSuccess, onError);
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
    onError(http.STATUS_CODES[status] + ': ' + response);
  }
}


//////////////////////////////////////////////////////////////
// USEFUL

WowApi.linkCharacter = function (realm, characterName, region) {
  var domain = 'battle.net/wow/en';
  if (region) {
    domain = region + '.' + domain;
  }
  var path = '/character/' + realm + '/' + characterName + '/advanced'
  return domain + path;
}

//////////////////////////////////////////////////////////////
// CHARACTERS

WowApi.getCharacter = function (realm, characterName, onSuccess, onError, field) {

  // for stupid names like Restogød
  characterName = querystring.escape(characterName);

  WowApi.get(
    '/character/' + realm + '/' + characterName,
    onSuccess,
    onError,
    { fields: field }
  );
}

WowApi.getCharacterItems = function (realm, characterName, onSuccess, onError) {
  WowApi.getCharacter(realm, characterName, onSuccess, onError, 'items');
}

WowApi.getCharacterFeed = function (realm, characterName, onSuccess, onError) {
  WowApi.getCharacter(realm, characterName, onSuccess, onError, 'feed');
}
//////////////////////////////////////////////////////////////
// ITEMS

/**
 * @example /wow/item/:itemid/:context
 * @param   context  e.g. raid-normal, raid-heroic, raid-mythic
 */
WowApi.getItem = function (itemId, onSuccess, onError, context) {
  context = context ? '/' + context : '';
  WowApi.get(
    '/item/' + itemId + context,
    onSuccess,
    onError
  );
}

//////////////////////////////////////////////////////////////
// PVP

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

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

module.exports = WowApi;

