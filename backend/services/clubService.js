const Club = require('../models/Clubs');
const Event = require('../models/Event');
const Post = require('../models/Posts');
const Resource = require('../models/Resource');
const Project = require('../models/Project');
const Opportunity = require('../models/Opportunities');
const Blog = require('../models/Blogs');
const Forum = require('../models/Forums');
const ClubFollow = require('../models/ClubFollow');

class ClubService {
  // Fetch all clubs
  async fetchAllClubs() {
    return await Club.find({});
  }

  // Fetch clubs by board ID
  async fetchClubsByBoardId(boardId) {
    return await Club.find({ board_id: boardId });
  }

  // Fetch club by club ID
  async fetchClubById(clubId) {
    return await Club.findById(clubId);
  }

  // Delete club and all related data (events, posts, resources, projects, opportunities, blogs, forums)
  async deleteClub(clubId) {
    // Delete all related data
    await Event.deleteMany({ club_id: clubId });
    await Post.deleteMany({ club_id: clubId });
    await Resource.deleteMany({ club_id: clubId });
    await Project.deleteMany({ club_id: clubId });
    await Opportunity.deleteMany({ club_id: clubId });
    await Blog.deleteMany({ club_id: clubId });
    await Forum.deleteMany({ club_id: clubId });
    // Delete the club
    return await Club.findByIdAndDelete(clubId);
  }

  // Edit club details by club ID
  async editClubById(clubId, updateData) {
    return await Club.findByIdAndUpdate(clubId, updateData, { new: true });
  }

  // Create a new club
  async createClub(clubData) {
    const club = new Club(clubData);
    return await club.save();
  }

  // Fetch all clubs followed by a user
  async fetchClubsByUserId(userId) {
    const follows = await ClubFollow.find({ user_id: userId }).populate('club_id');
    return follows.map(follow => follow.club_id);
  }

  // Unfollow a club by user_id and club_id
  async unfollowClub(userId, clubId) {
    return await ClubFollow.findOneAndDelete({ user_id: userId, club_id: clubId });
  }

  // Follow a club by user_id and club_id
  async followClub(userId, clubId) {
    const follow = new ClubFollow({ user_id: userId, club_id: clubId });
    return await follow.save();
  }
}

module.exports = new ClubService();