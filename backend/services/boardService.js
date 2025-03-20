const Boards = require('../models/Boards');
const Club = require('../models/Clubs');
const Event = require('../models/Event');
const Post = require('../models/Posts');
const Resource = require('../models/Resource');
const Project = require('../models/Project');
const Opportunity = require('../models/Opportunities');
const Blog = require('../models/Blogs');
const Forum = require('../models/Forums');
const BoardFollow = require('../models/BoardFollow');
const ClubFollow = require('../models/ClubFollow');
const ClubCreationRequest = require('../models/ClubCreationRequest');

class BoardService {
  // Fetch all boards
  async fetchAllBoards() {
    return await Boards.find({});
  }

  // Fetch board by board ID
  async fetchBoardById(boardId) {
    return await Boards.findById(boardId);
  }

  // Delete board and all related data (clubs, events, posts, resources, projects, opportunities, blogs, forums, follows, creation requests)
  async deleteBoard(boardId) {
    // Fetch all clubs under this board
    const clubs = await Club.find({ board_id: boardId });

    // Delete all related data for each club
    for (const club of clubs) {
      await Event.deleteMany({ club_id: club._id });
      await Post.deleteMany({ club_id: club._id });
      await Resource.deleteMany({ club_id: club._id });
      await Project.deleteMany({ club_id: club._id });
      await Opportunity.deleteMany({ club_id: club._id });
      await Blog.deleteMany({ club_id: club._id });
      await Forum.deleteMany({ club_id: club._id });
      await ClubFollow.deleteMany({ club_id: club._id });
    }

    // Delete all clubs under this board
    await Club.deleteMany({ board_id: boardId });

    // Delete all board follows
    await BoardFollow.deleteMany({ board_id: boardId });

    // Delete all club creation requests for this board
    await ClubCreationRequest.deleteMany({ board_id: boardId });

    // Delete the board
    return await Boards.findByIdAndDelete(boardId);
  }

  // Edit board details by board ID
  async editBoardById(boardId, updateData) {
    return await Boards.findByIdAndUpdate(boardId, updateData, { new: true });
  }

  // Create a new board
  async createBoard(boardData) {
    const board = new Boards(boardData);
    return await board.save();
  }

  // Fetch all boards followed by a user
  async fetchBoardsByUserId(userId) {
    const follows = await BoardFollow.find({ user_id: userId }).populate('board_id');
    return follows.map(follow => follow.board_id);
  }

  // Unfollow a board by user_id and board_id
  async unfollowBoard(userId, boardId) {
    return await BoardFollow.findOneAndDelete({ user_id: userId, board_id: boardId });
  }

  // Follow a board by user_id and board_id
  async followBoard(userId, boardId) {
    const follow = new BoardFollow({ user_id: userId, board_id: boardId });
    return await follow.save();
  }
}

module.exports = new BoardService();