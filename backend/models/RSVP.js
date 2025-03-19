const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  event_id: { type: String, required: true, ref: 'Event' },
  user_id: { type: String, required: true, ref: 'User' },
  timestamp: { type: String, required: true }
});

module.exports = mongoose.model('RSVP', rsvpSchema);
