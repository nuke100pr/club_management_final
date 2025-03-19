const Board = require("../models/Boards");
const Club = require("../models/Clubs");
const BoardFollow = require("../models/BoardFollow");

class BoardService {
  // Fetch all boards
  async fetchAllBoards() {
    return await Board.find({});
  }

  // Fetch board by board ID
  async fetchBoardById(boardId) {
    return await Board.findById(boardId);
  }

  // Fetch all clubs under a board
  async fetchClubsByBoardId(boardId) {
    return await Club.find({ board_id: boardId });
  }

  // Delete board and all clubs under it
  async deleteBoard(boardId) {
    // Delete all clubs under the board
    await Club.deleteMany({ board_id: boardId });
    // Delete the board
    return await Board.findByIdAndDelete(boardId);
  }

  // Edit board details by board ID
  async editBoardById(boardId, updateData) {
    return await Board.findByIdAndUpdate(boardId, updateData, { new: true });
  }

  // Create a new board
  async createBoard(boardData) {
    const board = new Board(boardData);
    return await board.save();
  }

  // Fetch all boards followed by a user
  async fetchBoardsByUserId(userId) {
    const follows = await BoardFollow.find({ user_id: userId }).populate(
      "board_id"
    );
    return follows.map((follow) => follow.board_id);
  }

  // Unfollow a board by user_id and board_id
  async unfollowBoard(userId, boardId) {
    return await BoardFollow.findOneAndDelete({
      user_id: userId,
      board_id: boardId,
    });
  }

  // Follow a board by user_id and board_id
  async followBoard(userId, boardId) {
    const follow = new BoardFollow({ user_id: userId, board_id: boardId });
    return await follow.save();
  }
}

module.exports = new BoardService();
