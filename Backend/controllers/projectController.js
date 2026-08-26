import * as projectService from "../services/projectServices.js"

export const createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400);
      throw new Error('Project title and description are required');
    }

    const project = await projectService.createProject(req.user._id, req.body);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getOwnerProjects(req.user._id);

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectDetails = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const updated = await projectService.updateProject(
      req.params.id,
      req.user._id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};