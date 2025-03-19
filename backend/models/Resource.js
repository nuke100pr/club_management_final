const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  resource_link_id: { type: String, required: true, ref: 'ResourceLink' },
  club_id: { type: String, ref: 'Clubs' },
  event_id: { type: String, ref: 'Event' },
  board_id: { type: String, ref: 'Boards' },
  user_id: { type: String, required: true, ref: 'User' }
});

module.exports = mongoose.model('Resource', resourceSchema);
