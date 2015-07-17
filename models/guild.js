var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GuildSchema   = new Schema({
    name: String
});

exports.get_by_id = function(id) {
  Bear.findById(, function(err, bear) {
    if (err)
      res.send(err);
    res.json(bear);
  });
}

module.exports = mongoose.model('Guild', GuildSchema);
