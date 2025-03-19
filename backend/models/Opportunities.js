const mongoose = require('mongoose');

const opportunitiesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator_id: { type: String, required: true, ref: 'User' },
  creator_type: { type: String, enum: ['admin', 'student_body'], required: true },
  expiry_date: { type: Date, required: true },
  status: { type: String, enum: ['active', 'inactive'], required: true },
  external_link: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  board_id: { type: String, ref: 'Boards' },
  club_id: { type: String, ref: 'Clubs' },
  event_id: { type: String, ref: 'Event' },
  keywords: [{ type: String }],
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true }
});

module.exports = mongoose.model('Opportunities', opportunitiesSchema);
