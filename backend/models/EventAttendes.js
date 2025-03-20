const mongoose = require('mongoose');

const eventAttendesSchema = new mongoose.Schema({
  event_id: { type: String, required: true, ref: 'Event' },
  user_id: { type: String, required: true, ref: 'User' }
});

module.exports = mongoose.model('EventAttendes', eventAttendesSchema);