const Opportunity = require('../models/Opportunities');
const OpportunityApplication = require('../models/OpportunityApplication');

class OpportunityService {
  // Create a new opportunity
  static async createOpportunity(data) {
    try {
      const opportunity = new Opportunity({
        ...data,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      });
      await opportunity.save();
      return opportunity;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update an opportunity
  static async updateOpportunity(id, data) {
    try {
      const opportunity = await Opportunity.findByIdAndUpdate(
        id,
        { ...data, updated_at: new Date() },
        { new: true }
      );
      if (!opportunity) throw new Error('Opportunity not found');
      return opportunity;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete an opportunity
  static async deleteOpportunity(id) {
    try {
      const opportunity = await Opportunity.findByIdAndDelete(id);
      if (!opportunity) throw new Error('Opportunity not found');
      return { message: 'Opportunity deleted successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get all opportunities
static async getAllOpportunities() {
    try {
      return await Opportunity.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  // Get active opportunities
  static async getActiveOpportunities() {
    try {
      return await Opportunity.find({ status: 'active' });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get inactive opportunities
  static async getInactiveOpportunities() {
    try {
      return await Opportunity.find({ status: 'inactive' });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get opportunities by board_id
  static async getOpportunitiesByBoard(board_id) {
    try {
      return await Opportunity.find({ board_id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get opportunities by club_id
  static async getOpportunitiesByClub(club_id) {
    try {
      return await Opportunity.find({ club_id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get opportunities by event_id
  static async getOpportunitiesByEvent(event_id) {
    try {
      return await Opportunity.find({ event_id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get opportunities by keywords
  static async getOpportunitiesByKeywords(keywords) {
    try {
      return await Opportunity.find({ keywords: { $in: keywords } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get opportunity by ID
  static async getOpportunityById(id) {
    try {
      const opportunity = await Opportunity.findById(id);
      if (!opportunity) throw new Error('Opportunity not found');
      return opportunity;
    } catch (error) {
      throw new Error(error.message);
    }
  }
// Get opportunities applied by an applicant
static async getOpportunitiesByApplicant(applicantId) {
    try {
      const applications = await OpportunityApplication.find({ applicant_id: applicantId }).select('opportunity_id');
      const opportunityIds = applications.map(app => app.opportunity_id);
      return await Opportunity.find({ _id: { $in: opportunityIds } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  // Mark expired opportunities as inactive
  static async markExpiredOpportunities() {
    try {
      const now = new Date();
      await Opportunity.updateMany(
        { expiry_date: { $lt: now }, status: 'active' },
        { status: 'inactive', updated_at: now }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Apply for an opportunity
  static async applyForOpportunity(data) {
    try {
      const application = new OpportunityApplication({
        ...data,
        submitted_at: new Date(),
        updated_at: new Date()
      });
      await application.save();
      return application;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get applications for an opportunity
  static async getApplicationsForOpportunity(opportunityId) {
    try {
      return await OpportunityApplication.find({ opportunity_id: opportunityId });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = OpportunityService;
