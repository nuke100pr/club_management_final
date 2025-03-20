const Blogs = require('../models/Blogs');

class BlogService {
  // Create a new blog
  static async createBlog(blogData) {
    try {
      const blog = new Blogs(blogData);
      return await blog.save();
    } catch (error) {
      throw new Error(`Failed to create blog: ${error.message}`);
    }
  }

  // Update a blog
  static async updateBlog(blogId, updatedData) {
    try {
      return await Blogs.findByIdAndUpdate(blogId, updatedData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update blog: ${error.message}`);
    }
  }

  // Delete a blog
  static async deleteBlog(blogId) {
    try {
      return await Blogs.findByIdAndDelete(blogId);
    } catch (error) {
      throw new Error(`Failed to delete blog: ${error.message}`);
    }
  }

  // Get a blog by ID (increments read count)
  static async getBlogById(blogId) {
    try {
      const blog = await Blogs.findById(blogId).populate('published_by', 'name email_id');
      if (!blog) {
        throw new Error('Blog not found');
      }

      // Increment read count
      blog.read_count = (blog.read_count || 0) + 1;
      await blog.save();

      return blog;
    } catch (error) {
      throw new Error(`Failed to fetch blog: ${error.message}`);
    }
  }

  // Get all blogs (sorted by published date in descending order)
  static async getAllBlogs() {
    try {
      return await Blogs.find().sort({ published_at: -1 }).populate('published_by', 'name email_id');
    } catch (error) {
      throw new Error(`Failed to fetch blogs: ${error.message}`);
    }
  }

  // Get blogs by publisher (user ID)
  static async getBlogsByPublisher(publisherId) {
    try {
      return await Blogs.find({ published_by: publisherId }).sort({ published_at: -1 }).populate('published_by', 'name email_id');
    } catch (error) {
      throw new Error(`Failed to fetch blogs by publisher: ${error.message}`);
    }
  }

  // Search blogs by keyword (title, introduction, main_content, conclusion, or keywords)
  static async searchBlogs(keyword) {
    try {
      return await Blogs.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { introduction: { $regex: keyword, $options: 'i' } },
          { conclusion: { $regex: keyword, $options: 'i' } },
          { keywords: { $regex: keyword, $options: 'i' } },
        ],
      }).sort({ published_at: -1 }).populate('published_by', 'name email_id');
    } catch (error) {
      throw new Error(`Failed to search blogs: ${error.message}`);
    }
  }

}

module.exports = BlogService;