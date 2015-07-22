var async = require('async');
var querystring = require('querystring');
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
        for (var name in uniqueCharactersInRealms[realm]) {
          characters.push({name: name, realm: realm});
        }
      }

      console.log('Players found: ' + characters.length);
      processItemsOnEachCharacter(characters);
    }
  }
);


function processItemsOnEachCharacter(characters) {

  var data = {};

  async.eachSeries(
    characters,//.slice(0, 200), //TODO get all
    function (character, callback) {

      // Get the items for this character
      bnet.wow.character.items(
        {
          origin: REGION,
          realm: character.realm,
          name: querystring.escape(character.name)
        },
        function (error, response) {
          if (error) {
            console.error(error);
          }
          else if (response && response.items) {
            // Look at each equipped item
            for (var slot in response.items) {
              var item = response.items[slot];
              var id = item.id;

              if (-1 !== ['averageItemLevel', 'averageItemLevelEquipped'].indexOf(slot)) {
              }
              else if (0 === item.name.indexOf('Wild Gladiator')
                && -1 !== ['trinket1', 'trinket2'].indexOf(slot)) { //TODO remove
                // Found a Warlords S2 conquest gear!
                if (data[id]) {
                  data[id].count++;
                  data[id].owners.push(character);
                }
                else {
                  data[id] = {
                    name: item.name,
                    quality: item.quality,
                    itemLevel: item.itemLevel,
                    count: 1,
                    slot: slot,
                    owners: [ character ]
                  };
                }
              }

            }

            console.log(JSON.stringify(character));
          }
          else {
            console.error('Nothing for ' + JSON.stringify(character));
          }

          callback();
        }
      );

    },
    function onFinish(error) {
      if (error) {
        console.error(error);
      }
      else {
        saveToFile('warlords-s2-conquest.json', data);
      }
    }
  );

}


// TEST CODE for wow.js
// var wow = require('./wow');

// var saveToFile = function (filePath, data) {
//   fs.writeFile(
//     filePath,
//     JSON.stringify(data, null, 2),
//     function(error) {
//       if (error) {
//         console.error(error);
//       }
//       else {
//         console.log('Saved ' + filePath);
//       }
//     }
//   );
// }

// var bracket = 'rbg';
// wow.getLeaderboards(
//   bracket,
//   function (data) {
//     saveToFile(bracket + '.json', data);
//   },
//   function (error) {
//     console.error(error);
//   }
// );


// wow.getCharacterItems(
//   'tichondrius',
//   querystring.escape('Restogød'),
//   function (data) {

//     console.log('object.json', data);
//   },
//   function (error) {
//     console.error(error);
//   }
// );


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


