const Privilege = require('../models/Privilege');
const PrivilegeType = require('../models/PrivilegeType');

class PrivilegeService {
  // Create a new privilege type
  static async createPrivilegeType(privilegeTypeData) {
    try {
      const privilegeType = new PrivilegeType(privilegeTypeData);
      return await privilegeType.save();
    } catch (error) {
      throw new Error(`Failed to create privilege type: ${error.message}`);
    }
  }

  // Fetch all privilege types
  static async getAllPrivilegeTypes() {
    try {
      return await PrivilegeType.find();
    } catch (error) {
      throw new Error(`Failed to fetch privilege types: ${error.message}`);
    }
  }

  // Fetch a privilege type by ID
  static async getPrivilegeTypeById(privilegeTypeId) {
    try {
      return await PrivilegeType.findById(privilegeTypeId);
    } catch (error) {
      throw new Error(`Failed to fetch privilege type: ${error.message}`);
    }
  }

  // Update a privilege type
  static async updatePrivilegeType(privilegeTypeId, updatedData) {
    try {
      return await PrivilegeType.findByIdAndUpdate(privilegeTypeId, updatedData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update privilege type: ${error.message}`);
    }
  }

  // Delete a privilege type
  static async deletePrivilegeType(privilegeTypeId) {
    try {
      return await PrivilegeType.findByIdAndDelete(privilegeTypeId);
    } catch (error) {
      throw new Error(`Failed to delete privilege type: ${error.message}`);
    }
  }

  // Create a new privilege
  static async createPrivilege(privilegeData) {
    try {
      const privilege = new Privilege(privilegeData);
      return await privilege.save();
    } catch (error) {
      throw new Error(`Failed to create privilege: ${error.message}`);
    }
  }

  // Fetch all privileges for a user
  static async getPrivilegesByUser(userId) {
    try {
      return await Privilege.find({ user_id: userId }).populate('privilege_type_id').populate('club_id');
    } catch (error) {
      throw new Error(`Failed to fetch privileges for user: ${error.message}`);
    }
  }

  // Fetch all privileges for a club
  static async getPrivilegesByClub(clubId) {
    try {
      return await Privilege.find({ club_id: clubId }).populate('privilege_type_id').populate('user_id');
    } catch (error) {
      throw new Error(`Failed to fetch privileges for club: ${error.message}`);
    }
  }

  // Fetch a privilege by ID
  static async getPrivilegeById(privilegeId) {
    try {
      return await Privilege.findById(privilegeId).populate('privilege_type_id').populate('club_id').populate('user_id');
    } catch (error) {
      throw new Error(`Failed to fetch privilege: ${error.message}`);
    }
  }

  // Update a privilege
  static async updatePrivilege(privilegeId, updatedData) {
    try {
      return await Privilege.findByIdAndUpdate(privilegeId, updatedData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update privilege: ${error.message}`);
    }
  }

  // Delete a privilege
  static async deletePrivilege(privilegeId) {
    try {
      return await Privilege.findByIdAndDelete(privilegeId);
    } catch (error) {
      throw new Error(`Failed to delete privilege: ${error.message}`);
    }
  }

  // Check if a user has a specific privilege for a club
  static async hasPrivilege(userId, clubId, privilegeTypeId) {
    try {
      const privilege = await Privilege.findOne({ user_id: userId, club_id: clubId, privilege_type_id: privilegeTypeId });
      return !!privilege;
    } catch (error) {
      throw new Error(`Failed to check privilege: ${error.message}`);
    }
  }

  // Get all privileges for a user and club
  static async getUserPrivilegesForClub(userId, clubId) {
    try {
      return await Privilege.find({ user_id: userId, club_id: clubId }).populate('privilege_type_id');
    } catch (error) {
      throw new Error(`Failed to fetch user privileges for club: ${error.message}`);
    }
  }
}

module.exports = PrivilegeService;