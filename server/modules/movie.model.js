const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  href: String,
  source: String,
  create_date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Movie', MovieSchema);


