const mongoose = require('mongoose');

const privilegeTypeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  posts: { type: Boolean, required: true },
  events: { type: Boolean, required: true },
  projects: { type: Boolean, required: true },
  resources: { type: Boolean, required: true },
  opportunities: { type: Boolean, required: true },
  blogs: { type: Boolean, required: true },
  forums: { type: Boolean, required: true }
});

module.exports = mongoose.model('PrivilegeType', privilegeTypeSchema);
