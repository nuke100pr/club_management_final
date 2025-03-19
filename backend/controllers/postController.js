const postService = require('../services/postService');

const createPost = async (req, res) => {

  console.log(req.user);
  try {
    const { title, content, club_id, board_id ,user_id} = req.body;
    const files = req.files || [];
    const userId = user_id; // Assuming auth middleware sets req.user

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newPost = await postService.createPost(title, content, files, userId, club_id, board_id);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, club_id, board_id } = req.query;
    
    // Build query based on provided filters
    const query = {};
    if (club_id) query.club_id = club_id;
    if (board_id) query.board_id = board_id;
    
    const result = await postService.getPosts(query, parseInt(page), parseInt(limit));
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assuming auth middleware sets req.user
    
    const result = await postService.likePost(id, userId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error liking post:', error);
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (error.message === 'You have already liked this post') {
      return res.status(400).json({ message: 'You have already liked this post' });
    }
    res.status(500).json({ message: 'Failed to like post' });
  }
};

const unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assuming auth middleware sets req.user
    
    const result = await postService.unlikePost(id, userId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error unliking post:', error);
    if (error.message === 'You have not liked this post') {
      return res.status(400).json({ message: 'You have not liked this post' });
    }
    res.status(500).json({ message: 'Failed to unlike post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assuming auth middleware sets req.user
    
    const result = await postService.deletePost(id, userId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting post:', error);
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (error.message.includes('Unauthorized')) {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to delete post' });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  likePost,
  unlikePost,
  deletePost
};

