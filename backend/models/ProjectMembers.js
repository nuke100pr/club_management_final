const mongoose = require('mongoose');

const projectMembersSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  project_id: { type: String, required: true, ref: 'Project' },
  user_id: { type: String, required: true, ref: 'User' },
  added_on: { type: String, required: true }
});

module.exports = mongoose.model('ProjectMembers', projectMembersSchema);
