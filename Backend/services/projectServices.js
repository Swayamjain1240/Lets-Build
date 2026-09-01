import Project from "../model/projectModel.js"
import { normalizeAndGetSkillIds } from "../utils/normalizeSkill.js"
import mongoose from "mongoose";

export const createProject = async (ownerId, projectData) => {
  const { title, description, requiredSkills, status } = projectData;

  let rawSkillsList = [];

  if (typeof requiredSkills === 'string') {
    rawSkillsList = requiredSkills.split(',').map((s) => s.trim());
  } else if (Array.isArray(requiredSkills)) {
    rawSkillsList = requiredSkills;
  }

  const normalizedSkillIds = await normalizeAndGetSkillIds(rawSkillsList);

  const project = await Project.create({
    title,
    description,
    owner: ownerId,
    requiredSkills: normalizedSkillIds,
    rawRequiredSkills: rawSkillsList,
    status: status || 'IDEATION',
    teamMembers: [{ user: ownerId, role: 'Owner' }],
  })

  return await Project.findById(project._id).populate("owner", 'name email profilePicture').populate('requiredSkills', 'name displayName');
};

export const getOwnerProjects = async (ownerId) => {
  return await Project.find({ owner: ownerId })
    .populate('requiredSkills', 'name displayName')
    .populate('teamMembers.user', 'name email profilePicture')
    .sort({ createdAt: -1 });
};

export const getProjectById = async (projectId, userId) => {

  if (!mongoose.isValidObjectId(projectId)) {
    const error = new Error(
      "Invalid project ID"
    );

    error.statusCode = 400;
    throw error;
  }

  const project = await Project.findById(projectId)
    .populate('owner', 'name email profilePicture bio')
    .populate('requiredSkills', 'name displayName')
    .populate('teamMembers.user', 'name email profilePicture experience skills');

  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  const isOwner = project.owner._id.toString() === userId.toString();
  const isTeamMember = project.teamMembers.some(
    (member) => member.user._id.toString() === userId.toString()
  );

  if (!isOwner && !isTeamMember) {
    const error = new Error('Access denied: Private project idea details are restricted to team members.');
    error.statusCode = 403;
    throw error;
  }

  return project;
};

export const updateProject = async (projectId, userId, updateData) => {
  const project = await Project.findById(projectId);

  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  if (project.owner.toString() !== userId.toString()) {
    const error = new Error('Not authorized to update this project');
    error.statusCode = 403;
    throw error;
  }

  if (updateData.title) project.title = updateData.title;
  if (updateData.description) project.description = updateData.description;
  if (updateData.status) project.status = updateData.status;

  if (updateData.requiredSkills) {
    let rawSkillsList = [];
    if (typeof updateData.requiredSkills === 'string') {
      rawSkillsList = updateData.requiredSkills.split(',').map((s) => s.trim());
    } else if (Array.isArray(updateData.requiredSkills)) {
      rawSkillsList = updateData.requiredSkills;
    }

    project.rawRequiredSkills = rawSkillsList;
    project.requiredSkills = await normalizeAndGetSkillIds(rawSkillsList);
  }

  await project.save();
  return await Project.findById(projectId)
    .populate('owner', 'name email profilePicture')
    .populate('requiredSkills', 'name displayName');
};