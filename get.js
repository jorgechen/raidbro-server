var async = require('async');
var fs = require('fs');
var BNET_API_KEY = require('./secret').BNET_API_KEY;
var bnet = require('battlenet-api')(BNET_API_KEY);

var REGION = 'us';
var DIR = './data';

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


// Get a list of top players
bnet.wow.pvp.leaderboards(
  {
    origin: REGION,
    bracket: 'rbg'
  },
  function (error, response) {
    if (error) {
      console.error(error);
    }
    else {

      // {server1: {character1: classId1}}
      var uniqueCharactersInRealms = {};

      response.rows.forEach(function (toon) {
        if (!uniqueCharactersInRealms[toon.realmSlug]) {
          uniqueCharactersInRealms[toon.realmSlug] = {};
        }
        uniqueCharactersInRealms[toon.realmSlug][toon.name] = toon.classId;
      });

      var characters = [];
      for (var realm in uniqueCharactersInRealms) {

        // Create a directory for the server
        var directory = DIR + '/' + realm;
        console.log('mkdir ' + directory);
        try {
          fs.mkdirSync(directory);
        }
        catch (exception) {
          // ignore if folder already exists
        }

        for (var name in uniqueCharactersInRealms[realm]) {
          characters.push({name: name, realm: realm});
        }
      }

      processItemsOnEachCharacter(characters);
    }
  }
);


function processItemsOnEachCharacter(characters) {

  var data = {};

  async.eachSeries(
    characters,
    function (character, callback) {

      // Get the items for this character
      bnet.wow.character.items(
        {
          origin: REGION,
          realm: character.realm,
          name: character.name
        },
        function (error, response) {
          if (error) {
            console.error(error);
          }
          else {
            // Look at each equipped item
            for (var slot in response.items) {
              var item = response.items[slot];
              var id = item.id;

              if (0 === item.name.indexOf('Wild Gladiator')){
                // Found a Warlords S2 conquest gear!
                if (data[id]) {
                  data[id].count++;
                  data[id].owners.push(character);
                }
                else {
                  data.push({
                    count: 1,
                    slot: slot,
                    owners: [ character ]
                  })
                }
              }

            }
          }
          callback();
        }
      );

    }
  );

  saveToFile('warlords-s2-conquest.json', data);
}


