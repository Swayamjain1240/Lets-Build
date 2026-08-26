import * as teamService from "../services/teamService.js"

export const getTeam = async (req, res, next) => {
  try {
    const team = await teamService.getProjectTeam(req.params.projectId, req.user._id);

    res.status(200).json({
      success: true,
      count: team.length,
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (req, res, next) => {
  try {
    const updatedTeam = await teamService.removeTeamMember(
      req.params.projectId,
      req.user._id,
      req.params.userId
    );

    res.status(200).json({
      success: true,
      message: 'Team member removed successfully',
      data: updatedTeam,
    });
  } catch (error) {
    next(error);
  }
};