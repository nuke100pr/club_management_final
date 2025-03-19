const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  files: [{ type: String, ref: 'File' }],
  created_at: { type: Date, required: false },
  created_by: { type: String, required: false, ref: 'User' },
  club_id: { type: String, ref: 'Clubs' },
  board_id: { type: String, ref: 'Boards' }
});

module.exports = mongoose.model('Posts', postsSchema);
