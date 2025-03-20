const Notification = require('../models/Notification');
const NotificationLink = require('../models/NotificationLink');
const NotificationSettings = require('../models/NotificationSettings');

class NotificationService {
  // Create a new notification
  static async createNotification(notificationData) {
    try {
      const notification = new Notification(notificationData);
      return await notification.save();
    } catch (error) {
      throw new Error(`Failed to create notification: ${error.message}`);
    }
  }

  // Fetch all notifications for a user
  static async getNotificationsByUser(userId) {
    try {
      return await Notification.find({ user_id: userId }).populate('link_id');
    } catch (error) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }
  }

  // Fetch a notification by ID
  static async getNotificationById(notificationId) {
    try {
      return await Notification.findById(notificationId).populate('link_id');
    } catch (error) {
      throw new Error(`Failed to fetch notification: ${error.message}`);
    }
  }

  // Update a notification (e.g., mark as read)
  static async updateNotification(notificationId, updatedData) {
    try {
      return await Notification.findByIdAndUpdate(notificationId, updatedData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update notification: ${error.message}`);
    }
  }

  // Delete a notification
  static async deleteNotification(notificationId) {
    try {
      return await Notification.findByIdAndDelete(notificationId);
    } catch (error) {
      throw new Error(`Failed to delete notification: ${error.message}`);
    }
  }

  // Create a notification link
  static async createNotificationLink(linkData) {
    try {
      const link = new NotificationLink(linkData);
      return await link.save();
    } catch (error) {
      throw new Error(`Failed to create notification link: ${error.message}`);
    }
  }

  // Fetch a notification link by ID
  static async getNotificationLinkById(linkId) {
    try {
      return await NotificationLink.findById(linkId);
    } catch (error) {
      throw new Error(`Failed to fetch notification link: ${error.message}`);
    }
  }

  // Update a notification link
  static async updateNotificationLink(linkId, updatedData) {
    try {
      return await NotificationLink.findByIdAndUpdate(linkId, updatedData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update notification link: ${error.message}`);
    }
  }

  // Delete a notification link
  static async deleteNotificationLink(linkId) {
    try {
      return await NotificationLink.findByIdAndDelete(linkId);
    } catch (error) {
      throw new Error(`Failed to delete notification link: ${error.message}`);
    }
  }

  // Fetch notification settings for a user
  static async getNotificationSettings(userId) {
    try {
      return await NotificationSettings.findOne({ user_id: userId });
    } catch (error) {
      throw new Error(`Failed to fetch notification settings: ${error.message}`);
    }
  }

  // Update notification settings for a user
  static async updateNotificationSettings(userId, updatedData) {
    try {
      return await NotificationSettings.findOneAndUpdate({ user_id: userId }, updatedData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update notification settings: ${error.message}`);
    }
  }

  // Create notification settings for a user
  static async createNotificationSettings(settingsData) {
    try {
      const settings = new NotificationSettings(settingsData);
      return await settings.save();
    } catch (error) {
      throw new Error(`Failed to create notification settings: ${error.message}`);
    }
  }

  // Delete notification settings for a user
  static async deleteNotificationSettings(userId) {
    try {
      return await NotificationSettings.findOneAndDelete({ user_id: userId });
    } catch (error) {
      throw new Error(`Failed to delete notification settings: ${error.message}`);
    }
  }
}

module.exports = NotificationService;