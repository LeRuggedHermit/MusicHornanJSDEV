const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: String,
  artist: String,
  description: String,
  best: String,
  worst: String,
  runtime: Number
});

const Music = mongoose.model('Album', albumSchema);

module.exports = Music;