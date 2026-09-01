import * as reportService from "../services/reportService.js"

export const createReport = async (req, res, next) => {
  try {
    const { reportedType, reportedId, reason } = req.body;
    const report = await reportService.createReport(req.user._id, {
      reportedType,
      reportedId,
      reason,
    });

    if (!reportedType || !reportedId || !reason) {
      const error = new Error(
        "reportedType, reportedId and reason are required"
      );

      error.statusCode = 400;
      throw error;
    }

    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReports = async (req, res, next) => {
  try {
    const reports = await reportService.getAllReports();

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReportStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const report = await reportService.updateReportStatus(id, status);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};