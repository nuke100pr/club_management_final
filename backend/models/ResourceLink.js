const mongoose = require('mongoose');

const resourceLinkSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  resource_id: { type: String, required: true, ref: 'Resource' },
  content: { type: String, required: true }
});

module.exports = mongoose.model('ResourceLink', resourceLinkSchema);
