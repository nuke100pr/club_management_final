const express = require('express');
const postController = require('../controllers/postController');
const multer = require('multer');


const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

// Create post
router.post('/posts', upload.array('files', 10), postController.createPost);

// Get all posts (with filtering options)
router.get('/posts', postController.getPosts);

// Get single post by ID
router.get('/posts/:id', postController.getPostById);

// Like a post
router.post('/posts/:id/like',  postController.likePost);

// Unlike a post
router.delete('/posts/:id/like',postController.unlikePost);

// Delete a post
router.delete('/posts/:id',  postController.deletePost);

module.exports = router;