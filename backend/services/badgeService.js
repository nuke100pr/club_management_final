const Badge = require('../models/Badge');
const BadgeType = require('../models/BadgeType');

class BadgeService {
  // Create a new badge type
  static async createBadgeType(badgeTypeData) {
    try {
      const badgeType = new BadgeType(badgeTypeData);
      return await badgeType.save();
    } catch (error) {
      throw new Error(`Failed to create badge type: ${error.message}`);
    }
  }

  // Get all badge types
  static async getAllBadgeTypes() {
    try {
      return await BadgeType.find();
    } catch (error) {
      throw new Error(`Failed to fetch badge types: ${error.message}`);
    }
  }

  // Get a badge type by ID
  static async getBadgeTypeById(badgeTypeId) {
    try {
      return await BadgeType.findById(badgeTypeId);
    } catch (error) {
      throw new Error(`Failed to fetch badge type: ${error.message}`);
    }
  }

  // Update a badge type
  static async updateBadgeType(badgeTypeId, updatedData) {
    try {
      return await BadgeType.findByIdAndUpdate(badgeTypeId, updatedData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update badge type: ${error.message}`);
    }
  }

  // Delete a badge type
  static async deleteBadgeType(badgeTypeId) {
    try {
      return await BadgeType.findByIdAndDelete(badgeTypeId);
    } catch (error) {
      throw new Error(`Failed to delete badge type: ${error.message}`);
    }
  }

  // Award a badge to a user
  static async awardBadge(badgeData) {
    try {
      const badge = new Badge(badgeData);
      return await badge.save();
    } catch (error) {
      throw new Error(`Failed to award badge: ${error.message}`);
    }
  }

  // Get all badges for a user
  static async getBadgesByUser(userId) {
    try {
      return await Badge.find({ user_id: userId }).populate('badge_type_id');
    } catch (error) {
      throw new Error(`Failed to fetch badges for user: ${error.message}`);
    }
  }

  // Get volunteer badges for a user
  static async getVolunteerBadgesByUser(userId) {
    try {
      return await Badge.find({ user_id: userId, badge_type_id: 'volunteer' }).populate('badge_type_id');
    } catch (error) {
      throw new Error(`Failed to fetch volunteer badges for user: ${error.message}`);
    }
  }

  // Get coordinator badges for a user
  static async getCoordinatorBadgesByUser(userId) {
    try {
      return await Badge.find({ user_id: userId, badge_type_id: 'coordinator' }).populate('badge_type_id');
    } catch (error) {
      throw new Error(`Failed to fetch coordinator badges for user: ${error.message}`);
    }
  }

  // Get attendee badges for a user
  static async getAttendeeBadgesByUser(userId) {
    try {
      return await Badge.find({ user_id: userId, badge_type_id: 'attendee' }).populate('badge_type_id');
    } catch (error) {
      throw new Error(`Failed to fetch attendee badges for user: ${error.message}`);
    }
  }

  // Get all badges for a club
  static async getBadgesByClub(clubId) {
    try {
      return await Badge.find({ club_id: clubId }).populate('badge_type_id').populate('user_id');
    } catch (error) {
      throw new Error(`Failed to fetch badges for club: ${error.message}`);
    }
  }

  // Get all badges for a board
  static async getBadgesByBoard(boardId) {
    try {
      return await Badge.find({ board_id: boardId }).populate('badge_type_id').populate('user_id');
    } catch (error) {
      throw new Error(`Failed to fetch badges for board: ${error.message}`);
    }
  }

  // Get all badges of a specific type
  static async getBadgesByType(badgeTypeId) {
    try {
      return await Badge.find({ badge_type_id: badgeTypeId }).populate('user_id');
    } catch (error) {
      throw new Error(`Failed to fetch badges by type: ${error.message}`);
    }
  }

  // Update a badge (e.g., mark tenure completion)
  static async updateBadge(badgeId, updatedData) {
    try {
      return await Badge.findByIdAndUpdate(badgeId, updatedData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update badge: ${error.message}`);
    }
  }

  // Delete a badge
  static async deleteBadge(badgeId) {
    try {
      return await Badge.findByIdAndDelete(badgeId);
    } catch (error) {
      throw new Error(`Failed to delete badge: ${error.message}`);
    }
  }
}

module.exports = BadgeService;