const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  author: String,
  title: String,
  content: String,
  like_count: {
    type: Number,
    default: 0,
  },
  comment_count: {
    type: Number,
    default: 0,
  },
  create_date: {
    type: Date,
    default: Date.now(),
  },
  update_date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Note', NoteSchema);
