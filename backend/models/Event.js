const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  club_id: { type: String, required: true, ref: 'Clubs' },
  board_id: { type: String, required: true, ref: 'Boards' },
  event_or_session: { type: String, required: true },
  name: { type: String, required: true },
  venue: { type: String, required: true },
  timestamp: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, ref: 'File' },
  event_type_id: { type: String, required: true, ref: 'EventType' }
});

module.exports = mongoose.model('Event', eventSchema);
