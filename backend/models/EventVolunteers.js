const mongoose = require('mongoose');

const eventVolunteersSchema = new mongoose.Schema({
  event_id: { type: String, required: true, ref: 'Event' },
  user_id: { type: String, required: true, ref: 'User' }
});

module.exports = mongoose.model('EventVolunteers', eventVolunteersSchema);