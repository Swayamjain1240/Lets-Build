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

export const getUserProjects = async (userId) => {
  const projects = await Project.find({
    $or: [
      {
        owner: userId,
      },
      {
        "teamMembers.user": userId,
      },
    ],
  })
    .populate(
      "owner",
      "name email profilePicture"
    )
    .populate(
      "requiredSkills",
      "name displayName"
    )
    .populate(
      "teamMembers.user",
      "name email profilePicture"
    )
    .sort({
      updatedAt: -1,
    });

  return projects.map((project) => {
    const projectObject =
      project.toObject();

    const isOwner =
      project.owner?._id
        ?.toString() ===
      userId.toString();

    if (!isOwner) {
      delete projectObject.teamMembers;
    }

    projectObject.accessRole =
      isOwner
        ? "OWNER"
        : "COLLABORATOR";

    return projectObject;
  });
};

export const getProjectById = async (
  projectId,
  userId
) => {
  if (
    !mongoose.isValidObjectId(
      projectId
    )
  ) {
    const error = new Error(
      "Invalid project ID"
    );

    error.statusCode = 400;
    throw error;
  }

  const project =
    await Project.findById(
      projectId
    )
      .populate(
        "owner",
        "name email profilePicture bio"
      )
      .populate(
        "requiredSkills",
        "name displayName"
      )
      .populate(
        "teamMembers.user",
        "name email profilePicture experience skills"
      );

  if (!project) {
    const error = new Error(
      "Project not found"
    );

    error.statusCode = 404;
    throw error;
  }

  const isOwner =
    project.owner?._id
      ?.toString() ===
    userId.toString();

  const isTeamMember =
    project.teamMembers.some(
      (member) =>
        member.user?._id
          ?.toString() ===
        userId.toString()
    );

  if (
    !isOwner &&
    !isTeamMember
  ) {
    const error = new Error(
      "Access denied: Private project details are restricted to project members."
    );

    error.statusCode = 403;
    throw error;
  }

  const projectObject =
    project.toObject();

  projectObject.accessRole =
    isOwner
      ? "OWNER"
      : "COLLABORATOR";

  if (!isOwner) {
    delete projectObject.teamMembers;
  }

  return projectObject;
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

export const removeProjectMember = async (
    projectId,
    memberId,
    userId
) => {
    if (
        !mongoose.isValidObjectId(
            projectId
        ) ||
        !mongoose.isValidObjectId(
            memberId
        )
    ) {
        const error = new Error(
            "Invalid project or member ID"
        );

        error.statusCode = 400;
        throw error;
    }

    const project =
        await Project.findById(
            projectId
        );

    if (!project) {
        const error = new Error(
            "Project not found"
        );

        error.statusCode = 404;
        throw error;
    }

    // Only project owner can remove members
    if (
        project.owner.toString() !==
        userId.toString()
    ) {
        const error = new Error(
            "Only the project owner can remove team members"
        );

        error.statusCode = 403;
        throw error;
    }

    // Owner cannot remove himself
    if (
        project.owner.toString() ===
        memberId.toString()
    ) {
        const error = new Error(
            "Project owner cannot be removed"
        );

        error.statusCode = 400;
        throw error;
    }

    const memberExists =
        project.teamMembers.some(
            (member) =>
                member.user.toString() ===
                memberId.toString()
        );

    if (!memberExists) {
        const error = new Error(
            "Team member not found"
        );

        error.statusCode = 404;
        throw error;
    }

    project.teamMembers =
        project.teamMembers.filter(
            (member) =>
                member.user.toString() !==
                memberId.toString()
        );

    await project.save();

    return await Project.findById(
        projectId
    )
        .populate(
            "owner",
            "name email profilePicture"
        )
        .populate(
            "requiredSkills",
            "name displayName"
        )
        .populate(
            "teamMembers.user",
            "name email profilePicture experience skills"
        );
};

export const deleteProject = async (
    projectId,
    userId
) => {
    if (
        !mongoose.isValidObjectId(
            projectId
        )
    ) {
        const error = new Error(
            "Invalid project ID"
        );

        error.statusCode = 400;
        throw error;
    }

    const project =
        await Project.findById(
            projectId
        );

    if (!project) {
        const error = new Error(
            "Project not found"
        );

        error.statusCode = 404;
        throw error;
    }

    // Only owner can delete project
    if (
        project.owner.toString() !==
        userId.toString()
    ) {
        const error = new Error(
            "Only the project owner can delete this project"
        );

        error.statusCode = 403;
        throw error;
    }

    await Project.findByIdAndDelete(
        projectId
    );

    return true;
};