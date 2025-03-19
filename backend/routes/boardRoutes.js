const express = require("express");
const boardController = require("../controllers/boardController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/boards", boardController.fetchAllBoards);
router.get("/boards/:board_id", boardController.fetchBoardById);
router.get("/boards/:board_id/clubs", boardController.fetchClubsByBoardId);
router.get("/users/:user_id/boards", boardController.fetchBoardsByUserId);

// Protected routes (require authentication)
router.use(authMiddleware);

router.post("/boards", boardController.createBoard);
router.put("/boards/:board_id", boardController.editBoard);
router.delete("/boards/:board_id", boardController.deleteBoard);
router.post(
  "/users/:user_id/follow/board/:board_id",
  boardController.followBoard
);
router.delete(
  "/users/:user_id/unfollow/board/:board_id",
  boardController.unfollowBoard
);

module.exports = router;
