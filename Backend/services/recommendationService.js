import axios from "axios";
import mongoose from "mongoose";
import User from "../model/userModel.js";
import Project from "../model/projectModel.js";
import Recruitment from "../model/recruitmentModel.js";

const AI_SERVICE_URL =
  process.env.PYTHON_AI_URL || "http://localhost:8000";


export const getRecommendedProjectsForUser = async (userId) => {
  const user = await User.findById(userId)
    .populate("skills", "name displayName");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const userSkills =
    user.skills.length > 0
      ? user.skills.map((skill) => ({
        name: skill.name,
        displayName: skill.displayName,
      }))
      : user.rawSkills.map((skill) => ({
        name: skill,
        displayName: skill,
      }));


  const recruitments = await Recruitment.find({
    isOpen: true,
  })
    .populate("project", "title status owner")
    .populate("requiredSkills", "name displayName");


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

      skills: rec.requiredSkills.map((skill) => ({
        name: skill.name,
        displayName: skill.displayName,
      })),
    })),
  };


  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/recommend/projects`,
      payload
    );

    const recommendations =
      response.data.recommendations || [];


    const recruitmentMap = new Map(
      recruitments.map((rec) => [
        rec._id.toString(),
        rec,
      ])
    );


    const hydratedRecommendations = recommendations
      .map((recommendation) => {
        const recruitment = recruitmentMap.get(
          recommendation.id
        );

        if (!recruitment) {
          return null;
        }

        return {
          recruitment,
          matchScore: recommendation.score,
        };
      })
      .filter(Boolean);


    return hydratedRecommendations;

  } catch (error) {
    console.error(
      "AI Service Connection Error:",
      error.response?.data || error.message
    );

    return recruitments.map((rec) => ({
      recruitment: rec,
      matchScore: 0,
    }));
  }
};



export const getRecommendedDevelopersForProject = async (
  projectId,
  ownerId
) => {

  if (!mongoose.isValidObjectId(projectId)) {
    const error = new Error(
      "Invalid project ID"
    );

    error.statusCode = 400;
    throw error;
  }
  
  const project = await Project.findById(projectId)
    .populate("requiredSkills", "name displayName");


  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }


  if (project.owner.toString() !== ownerId.toString()) {
    const error = new Error(
      "Not authorized to access recommendations for this project"
    );

    error.statusCode = 403;
    throw error;
  }


  const projectSkills =
    project.requiredSkills.length > 0
      ? project.requiredSkills.map((skill) => ({
        name: skill.name,
        displayName: skill.displayName,
      }))
      : project.rawRequiredSkills.map((skill) => ({
        name: skill,
        displayName: skill,
      }));


  const developers = await User.find({
    isOnboarded: true,
    _id: { $ne: ownerId },
  }).populate("skills", "name displayName");


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

      skills:
        dev.skills.length > 0
          ? dev.skills.map((skill) => ({
            name: skill.name,
            displayName: skill.displayName,
          }))
          : dev.rawSkills.map((skill) => ({
            name: skill,
            displayName: skill,
          })),
    })),
  };


  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/recommend/developers`,
      payload
    );

    const recommendations =
      response.data.recommendations || [];


    const developerMap = new Map(
      developers.map((developer) => [
        developer._id.toString(),
        developer,
      ])
    );


    const hydratedRecommendations = recommendations
      .map((recommendation) => {
        const developer = developerMap.get(
          recommendation.id
        );

        if (!developer) {
          return null;
        }

        return {
          developer,
          matchScore: recommendation.score,
        };
      })
      .filter(Boolean);


    return hydratedRecommendations;

  } catch (error) {
    console.error(
      "AI Service Connection Error:",
      error.response?.data || error.message
    );

    return developers.map((developer) => ({
      developer,
      matchScore: 0,
    }));
  }
};