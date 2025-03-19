const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  club_id: { type: String, required: true, ref: 'Clubs' },
  board_id: { type: String, required: true, ref: 'Boards' },
  start_date: { type: String, required: true },
  status: { type: String, enum: ['Running', 'Completed', 'Inactive'], required: true },
  end_date: { type: String, required: true },
  created_on: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Project', projectSchema);
