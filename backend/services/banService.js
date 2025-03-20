const BanClub = require('../models/BanClub');
const BanUser = require('../models/BanUser');

class BanService {
  // Ban a club
  static async banClub(banClubData) {
    try {
      const banClub = new BanClub(banClubData);
      return await banClub.save();
    } catch (error) {
      throw new Error(`Failed to ban club: ${error.message}`);
    }
  }

  // Unban a club
  static async unbanClub(banClubId) {
    try {
      return await BanClub.findByIdAndDelete(banClubId);
    } catch (error) {
      throw new Error(`Failed to unban club: ${error.message}`);
    }
  }

  // Fetch all bans for a club
  static async getBansByClub(clubId) {
    try {
      return await BanClub.find({ club_id: clubId }).populate('banned_by_id');
    } catch (error) {
      throw new Error(`Failed to fetch bans for club: ${error.message}`);
    }
  }

  // Check if a club is banned
  static async isClubBanned(clubId) {
    try {
      const ban = await BanClub.findOne({ club_id: clubId });
      return !!ban;
    } catch (error) {
      throw new Error(`Failed to check if club is banned: ${error.message}`);
    }
  }

  // Ban a user
  static async banUser(banUserData) {
    try {
      const banUser = new BanUser(banUserData);
      return await banUser.save();
    } catch (error) {
      throw new Error(`Failed to ban user: ${error.message}`);
    }
  }

  // Unban a user
  static async unbanUser(banUserId) {
    try {
      return await BanUser.findByIdAndDelete(banUserId);
    } catch (error) {
      throw new Error(`Failed to unban user: ${error.message}`);
    }
  }

  // Fetch all bans for a user
  static async getBansByUser(userId) {
    try {
      return await BanUser.find({ user_id: userId }).populate('banned_by_id');
    } catch (error) {
      throw new Error(`Failed to fetch bans for user: ${error.message}`);
    }
  }

  // Check if a user is banned
  static async isUserBanned(userId) {
    try {
      const ban = await BanUser.findOne({ user_id: userId });
      return !!ban;
    } catch (error) {
      throw new Error(`Failed to check if user is banned: ${error.message}`);
    }
  }

  // Fetch all banned clubs
  static async getAllBannedClubs() {
    try {
      return await BanClub.find().populate('club_id').populate('banned_by_id');
    } catch (error) {
      throw new Error(`Failed to fetch all banned clubs: ${error.message}`);
    }
  }

  // Fetch all banned users
  static async getAllBannedUsers() {
    try {
      return await BanUser.find().populate('user_id').populate('banned_by_id');
    } catch (error) {
      throw new Error(`Failed to fetch all banned users: ${error.message}`);
    }
  }
}

module.exports = BanService;