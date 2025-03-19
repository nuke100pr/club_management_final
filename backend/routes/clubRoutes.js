const express = require('express');
const clubController = require('../controllers/clubController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/clubs', clubController.fetchAllClubs);
router.get('/clubs/board/:board_id', clubController.fetchClubsByBoardId);
router.get('/clubs/:club_id', clubController.fetchClubById);
router.get('/users/:user_id/clubs', clubController.fetchClubsByUserId);

// Protected routes (require authentication)
router.use(authMiddleware);

router.post('/clubs', clubController.createClub);
router.put('/clubs/:club_id', clubController.editClub);
router.delete('/clubs/:club_id', clubController.deleteClub);
router.post('/users/:user_id/follow/club/:club_id', clubController.followClub);
router.delete('/users/:user_id/unfollow/club/:club_id', clubController.unfollowClub);

module.exports = router;