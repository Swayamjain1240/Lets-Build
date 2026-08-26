import axios from "axios";
import User from "../model/userModel.js"
import Project from "../model/projectModel.js";
import Recruitment from "../model/recruitmentModel.js";

const AI_SERVICE_URL = process.env.PYTHON_AI_URL || 'http://localhost:8000';

export const getRecommendedProjectsForUser = async (userId) => {
  const user = await User.findById(userId).populate('skills', 'normalizedName displayName');

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }


  const userSkills = user.skills.length > 0 
    ? user.skills.map((s) => s.normalizedName)
    : user.rawSkills;

  const recruitments = await Recruitment.find({ isOpen: true })
    .populate('project', 'title status owner')
    .populate('requiredSkills', 'normalizedName displayName');

  if (recruitments.length === 0) {
    return [];
  }


  const payload = {
    user: {
      id: user._id.toString(),
      skills: userSkills,
    },
    candidates: recruitments.map((rec) => ({
      id: rec._id.toString(),
      title: rec.title,
      skills: rec.requiredSkills.map((s) => s.normalizedName),
    })),
  };

  try {

    const response = await axios.post(`${AI_SERVICE_URL}/recommend/projects`, payload);
    const recommendations = response.data.recommendations; 


    const recruitmentMap = new Map(recruitments.map((r) => [r._id.toString(), r]));

    const hydratedRecommendations = recommendations
      .map((rec) => {
        const item = recruitmentMap.get(rec.id);
        if (!item) return null;
        return {
          recruitment: item,
          matchScore: rec.score,
        };
      })
      .filter(Boolean);

    return hydratedRecommendations;
  } catch (error) {
    console.error('AI Service Connection Error:', error.message);

    return recruitments.map((rec) => ({
      recruitment: rec,
      matchScore: 0,
    }));
  }
};

export const getRecommendedDevelopersForProject = async (projectId, ownerId) => {
  const project = await Project.findById(projectId).populate('requiredSkills', 'normalizedName displayName');

  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  if (project.owner.toString() !== ownerId.toString()) {
    const error = new Error('Not authorized to access recommendations for this project');
    error.statusCode = 403;
    throw error;
  }

  const projectSkills = project.requiredSkills.length > 0
    ? project.requiredSkills.map((s) => s.normalizedName)
    : project.rawRequiredSkills;

  
  const developers = await User.find({
    isOnboarded: true,
    _id: { $ne: ownerId },
  }).populate('skills', 'normalizedName displayName');

  if (developers.length === 0) {
    return [];
  }

  const payload = {
    project: {
      id: project._id.toString(),
      skills: projectSkills,
    },
    candidates: developers.map((dev) => ({
      id: dev._id.toString(),
      name: dev.name,
      skills: dev.skills.map((s) => s.normalizedName),
    })),
  };

  try {
    const response = await axios.post(`${AI_SERVICE_URL}/recommend/developers`, payload);
    const recommendations = response.data.recommendations; // Array of { id, score }

    const devMap = new Map(developers.map((d) => [d._id.toString(), d]));

    const hydratedRecommendations = recommendations
      .map((rec) => {
        const dev = devMap.get(rec.id);
        if (!dev) return null;
        return {
          developer: dev,
          matchScore: rec.score,
        };
      })
      .filter(Boolean);

    return hydratedRecommendations;
  } catch (error) {
    console.error('AI Service Connection Error:', error.message);

    return developers.map((dev) => ({
      developer: dev,
      matchScore: 0,
    }));
  }
};