const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  introduction: { type: String, required: true },
  main_content: { type: String, required: true },
  conclusion: { type: String, required: true },
  author_info: { type: String, required: true },
  published_at: { type: Date, required: true },
  published_by: { type: String, required: true, ref: 'User' },
  keywords: [{ type: String }],
  image: { type: String, ref: 'File' },
  images: [{ type: String, ref: 'File' }]
});

module.exports = mongoose.model('Blogs', blogsSchema);
