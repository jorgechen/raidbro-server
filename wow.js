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
// CHARACTERS

WowApi.linkCharacter = function (realm, characterName, region) {
  var domain = 'battle.net/wow/en';
  if (region) {
    domain = region + '.' + domain;
  }
  var path = '/character/' + realm + '/' + characterName + '/advanced'
  return domain + path;
}

WowApi.getCharacter = function (realm, characterName, onSuccess, onError, field) {

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



// TEST CODE
var wow = require('./wow');

var saveToFile = function (filePath, data) {
  fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    function(error) {
      if (error) {
        console.error(error);
      }
      else {
        console.log('Saved ' + filePath);
      }
    }
  );
}

var bracket = 'rbg';

// wow.getLeaderboards(
//   bracket,
//   function (data) {
//     saveToFile(bracket + '.json', data);
//   },
//   function (error) {
//     console.error(error);
//   }
// );


wow.getCharacterItems(
  'tichondrius',
  querystring.escape('Restogød'),
  function (data) {

    console.log('object.json', data);
  },
  function (error) {
    console.error(error);
  }
);


// wow.getItem(
//   '115576',
//   function (data) {
//     console.log(data);
//   },
//   function (error) {
//     console.error(error);
//   },
//   'raid-heroic'
// )

