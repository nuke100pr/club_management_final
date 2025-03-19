const clubService = require('../services/clubService');

class ClubController {
  // Fetch all clubs
  async fetchAllClubs(req, res) {
    try {
      const clubs = await clubService.fetchAllClubs();
      res.status(200).json(clubs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Fetch clubs by board ID
  async fetchClubsByBoardId(req, res) {
    try {
      const { board_id } = req.params;
      const clubs = await clubService.fetchClubsByBoardId(board_id);
      res.status(200).json(clubs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Fetch club by club ID
  async fetchClubById(req, res) {
    try {
      const { club_id } = req.params;
      const club = await clubService.fetchClubById(club_id);
      res.status(200).json(club);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete club and all related data
  async deleteClub(req, res) {
    try {
      const { club_id } = req.params;
      await clubService.deleteClub(club_id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Edit club details by club ID
  async editClub(req, res) {
    try {
      const { club_id } = req.params;
      const updateData = req.body;
      const updatedClub = await clubService.editClubById(club_id, updateData);
      res.status(200).json(updatedClub);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new club
  async createClub(req, res) {
    try {
      const clubData = req.body;
      const newClub = await clubService.createClub(clubData);
      res.status(201).json(newClub);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Fetch all clubs followed by a user
  async fetchClubsByUserId(req, res) {
    try {
      const { user_id } = req.params;
      const clubs = await clubService.fetchClubsByUserId(user_id);
      res.status(200).json(clubs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Unfollow a club by user_id and club_id
  async unfollowClub(req, res) {
    try {
      const { user_id, club_id } = req.params;
      await clubService.unfollowClub(user_id, club_id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Follow a club by user_id and club_id
  async followClub(req, res) {
    try {
      const { user_id, club_id } = req.params;
      const follow = await clubService.followClub(user_id, club_id);
      res.status(201).json(follow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClubController();