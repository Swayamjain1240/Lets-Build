import Report from "../model/reportModel.js"

export const createReport = async (reporterId, { reportedType, reportedId, reason, description }) => {

  const existingReport = await Report.findOne({
    reporter: reporterId,
    reportedType,
    reportedId,
  });

  if (existingReport) {
    const error = new Error('You have already reported this item');
    error.statusCode = 400;
    throw error;
  }

  return await Report.create({
    reporter: reporterId,
    reportedType,
    reportedId,
    reason,
    description,
  });
};

export const getAllReports = async () => {
  return await Report.find()
    .populate('reporter', 'name email')
    .sort({ createdAt: -1 });
};

export const updateReportStatus = async (reportId, status) => {
  const report = await Report.findById(reportId);

  if (!report) {
    const error = new Error('Report not found');
    error.statusCode = 404;
    throw error;
  }

  report.status = status;
  await report.save();
  return report;
};