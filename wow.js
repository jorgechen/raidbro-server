var https = require('https');
var API_KEY = require('./secret').BNET_API_KEY;
var DOMAIN = 'us.api.battle.net';

var wowRequest = function (method, path) {
  var options = {
    method: method,
    hostname: DOMAIN,
    port: 80,
    path: path + '?api_key=' + API_KEY
  };

  var request = https.request(
    options,
    function(response) {
      response.setEncoding('utf8');
      response.on('data',
        function (chunk) {
          console.log(chunk);
        }
      )
    }
  );

  request.end();
}


/**
 * @param bracket 2v2, 3v3, 5v5, rbg
 */
var getLeaderBoards = function (bracket) {
  if ( 'string' === typeof bracket &&
    -1 != ['2v2', '3v3', '5v5', 'rbg'].indexOf(bracket) ) {





  }
  else {
    throw 'Bracket is wrong';
  }
}

var getCharacterItems = function (name) {

}


