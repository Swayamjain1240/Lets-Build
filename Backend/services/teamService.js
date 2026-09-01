import Project from "../model/projectModel.js"
import mongoose from "mongoose";

export const getProjectTeam = async (projectId, userId) => {

  if (!mongoose.isValidObjectId(projectId)) {
    const error = new Error("Invalid project ID");
    error.statusCode = 400;
    throw error;
  }

  const project = await Project.findById(projectId)
    .populate('teamMembers.user', 'name email profilePicture bio experience skills githubUrl linkedinUrl');

  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  const isMember = project.teamMembers.some(
    (member) => member.user._id.toString() === userId.toString()
  );

  if (!isMember) {
    const error = new Error('Access denied: You are not a member of this project team.');
    error.statusCode = 403;
    throw error;
  }

  return project.teamMembers;
};

export const removeTeamMember = async (
  projectId,
  ownerId,
  memberUserId
) => {

  const project = await Project.findById(projectId);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    project.owner.toString() !== ownerId.toString()
  ) {
    const error = new Error(
      "Only project owners can remove team members"
    );

    error.statusCode = 403;
    throw error;
  }

  if (
    ownerId.toString() === memberUserId.toString()
  ) {
    const error = new Error(
      "Project owner cannot remove themselves"
    );

    error.statusCode = 400;
    throw error;
  }


  const memberExists = project.teamMembers.some(
    (member) =>
      member.user.toString() ===
      memberUserId.toString()
  );

  if (!memberExists) {
    const error = new Error(
      "User is not a member of this project"
    );

    error.statusCode = 404;
    throw error;
  }


  project.teamMembers = project.teamMembers.filter(
    (member) =>
      member.user.toString() !==
      memberUserId.toString()
  );

  await project.save();

  return project.teamMembers;
};