const mongoose = require('mongoose');

const boardsSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, ref: 'File' },
  created_at: { type: Date, required: true },
  created_by: { type: String, required: true, ref: 'User' }
});

module.exports = mongoose.model('Boards', boardsSchema);
