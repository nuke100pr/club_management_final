const mongoose = require('mongoose');

const banUserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  user_id: { type: String, required: true, ref: 'User' },
  banned_by_id: { type: String, required: true, ref: 'User' },
  banned_at: { type: String, required: true },
  reason: { type: String, required: true }
});

module.exports = mongoose.model('BanUser', banUserSchema);
