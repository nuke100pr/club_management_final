const Project = require('../models/Project');
const ProjectMembers = require('../models/ProjectMembers');

class ProjectService {
  // Create a new project
  static async createProject(projectData) {
    try {
      const project = new Project(projectData);
      return await project.save();
    } catch (error) {
      throw new Error(`Failed to create project: ${error.message}`);
    }
  }

  // Update a project
  static async updateProject(projectId, updatedData) {
    try {
      return await Project.findByIdAndUpdate(projectId, updatedData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update project: ${error.message}`);
    }
  }

  // Delete a project
  static async deleteProject(projectId) {
    try {
      return await Project.findByIdAndDelete(projectId);
    } catch (error) {
      throw new Error(`Failed to delete project: ${error.message}`);
    }
  }

  // Get a project by ID
  static async getProjectById(projectId) {
    try {
      return await Project.findById(projectId).populate('club_id').populate('board_id');
    } catch (error) {
      throw new Error(`Failed to fetch project: ${error.message}`);
    }
  }

  // Get all projects (LIFO order by default)
  static async getAllProjects(query = {}) {
    try {
      return await Project.find(query).sort({ created_on: -1 }).populate('club_id').populate('board_id');
    } catch (error) {
      throw new Error(`Failed to fetch projects: ${error.message}`);
    }
  }

  // Get projects by club ID
  static async getProjectsByClub(clubId) {
    try {
      return await Project.find({ club_id: clubId }).sort({ created_on: -1 }).populate('club_id').populate('board_id');
    } catch (error) {
      throw new Error(`Failed to fetch projects by club: ${error.message}`);
    }
  }

  // Get projects by board ID
  static async getProjectsByBoard(boardId) {
    try {
      return await Project.find({ board_id: boardId }).sort({ created_on: -1 }).populate('club_id').populate('board_id');
    } catch (error) {
      throw new Error(`Failed to fetch projects by board: ${error.message}`);
    }
  }

  // Search projects by keyword (title or description)
  static async searchProjects(keyword) {
    try {
      return await Project.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      }).sort({ created_on: -1 }).populate('club_id').populate('board_id');
    } catch (error) {
      throw new Error(`Failed to search projects: ${error.message}`);
    }
  }

  // Add a collaborator to a project
  static async addProjectMember(projectId, userId) {
    try {
      const projectMember = new ProjectMembers({
        project_id: projectId,
        user_id: userId,
        added_on: new Date().toISOString(),
      });
      return await projectMember.save();
    } catch (error) {
      throw new Error(`Failed to add project member: ${error.message}`);
    }
  }

  // Remove a collaborator from a project
  static async removeProjectMember(projectMemberId) {
    try {
      return await ProjectMembers.findByIdAndDelete(projectMemberId);
    } catch (error) {
      throw new Error(`Failed to remove project member: ${error.message}`);
    }
  }

  // Get all collaborators for a project
  static async getProjectMembers(projectId) {
    try {
      return await ProjectMembers.find({ project_id: projectId }).populate('user_id');
    } catch (error) {
      throw new Error(`Failed to fetch project members: ${error.message}`);
    }
  }

  // Link external resources (e.g., Google Drive, GitHub) to a project
  static async linkExternalResource(projectId, resourceType, resourceLink) {
    try {
      const project = await Project.findById(projectId);
      if (!project.external_resources) {
        project.external_resources = [];
      }
      project.external_resources.push({ type: resourceType, link: resourceLink });
      return await project.save();
    } catch (error) {
      throw new Error(`Failed to link external resource: ${error.message}`);
    }
  }

  // Remove an external resource from a project
  static async removeExternalResource(projectId, resourceIndex) {
    try {
      const project = await Project.findById(projectId);
      if (project.external_resources && project.external_resources.length > resourceIndex) {
        project.external_resources.splice(resourceIndex, 1);
        return await project.save();
      } else {
        throw new Error('Resource index out of bounds');
      }
    } catch (error) {
      throw new Error(`Failed to remove external resource: ${error.message}`);
    }
  }

  // Get all external resources for a project
  static async getExternalResources(projectId) {
    try {
      const project = await Project.findById(projectId);
      return project.external_resources || [];
    } catch (error) {
      throw new Error(`Failed to fetch external resources: ${error.message}`);
    }
  }

  static async getProjectsByUser(userId) {
    try {
      // Fetch projects where the user is a collaborator
      const collaboratorProjects = await ProjectMembers.find({ user_id: userId }).populate('project_id');

      // Fetch projects where the user is the owner (if ownership is tracked in the Project schema)
      const ownedProjects = await Project.find({ owner: userId });

      // Combine and return the results
      const projects = [
        ...collaboratorProjects.map((cp) => cp.project_id),
        ...ownedProjects,
      ];

      return projects;
    } catch (error) {
      throw new Error(`Failed to fetch projects by user: ${error.message}`);
    }
  }

}

module.exports = ProjectService;