var async = require('async');
var fs = require('fs');

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


wow.getLeaderboards(
  '2v2',
  function (data) {
    saveToFile('2v2.json', data);
  },
  function (error) {
    console.error(error);
  }
);


wow.getCharacterItems(
  'emerald-dream',
  'ojbect',
  function (data) {

    saveToFile('object.json', data);
  },
  function (error) {
    console.error(error);
  }
);

