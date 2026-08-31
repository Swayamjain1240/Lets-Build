import Report from "../model/reportModel.js";

export const createReport = async (
  reporterId,
  { reportedType, reportedId, reason }
) => {

  if (!["USER", "PROJECT"].includes(reportedType)) {
    const error = new Error("Invalid report type");
    error.statusCode = 400;
    throw error;
  }

  const existingReport =
    reportedType === "USER"
      ? await Report.findOne({
          reporter: reporterId,
          reportedUser: reportedId,
        })
      : await Report.findOne({
          reporter: reporterId,
          reportedProject: reportedId,
        });

  if (existingReport) {
    const error = new Error(
      "You have already reported this item"
    );
    error.statusCode = 400;
    throw error;
  }

  const reportData = {
    reporter: reporterId,
    reason,
  };

  if (reportedType === "USER") {
    reportData.reportedUser = reportedId;
  }

  if (reportedType === "PROJECT") {
    reportData.reportedProject = reportedId;
  }

  return await Report.create(reportData);
};


export const getAllReports = async () => {
  return await Report.find()
    .populate("reporter", "name email")
    .populate("reportedUser", "name email profilePicture")
    .populate("reportedProject", "title owner")
    .sort({ createdAt: -1 });
};


export const updateReportStatus = async (
  reportId,
  status
) => {

  if (
    !["PENDING", "REVIEWED", "RESOLVED"].includes(status)
  ) {
    const error = new Error("Invalid report status");
    error.statusCode = 400;
    throw error;
  }

  const report = await Report.findById(reportId);

  if (!report) {
    const error = new Error("Report not found");
    error.statusCode = 404;
    throw error;
  }

  report.status = status;

  await report.save();

  return report;
};