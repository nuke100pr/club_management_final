const mongoose = require('mongoose');

const privilegeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  privilege_type_id: { type: String, required: true, ref: 'PrivilegeType' },
  club_id: { type: String, ref: 'Clubs' },
  user_id: { type: String, required: true, ref: 'User' }
});

module.exports = mongoose.model('Privilege', privilegeSchema);
