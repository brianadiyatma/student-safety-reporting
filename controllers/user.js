const Report = require("../models/Report");

exports.submitReport = (req, res) => {
  const {
    accident,
    time,
    occurance,
    aircraftType,
    personOnBoard,
    cause,
    details,
    callsign,
  } = req.body;
  if (
    !accident ||
    !time ||
    !occurance ||
    !aircraftType ||
    !personOnBoard ||
    !cause ||
    !details ||
    !callsign
  ) {
    return res.status(400).json({
      message: "Please fill in all the fields",
    });
  }

  const newReport = new Report({
    accident,
    time,
    occurance,
    aircraftType,
    personOnBoard,
    cause,
    details,
    callsign,
    user: req.user._id,
  });
  newReport.save((err, report) => {
    if (err) {
      res.status(500).json({
        message: "Error submitting report",
        error: err,
      });
    } else {
      res.status(201).json({
        message: "Report submitted",
        report,
      });
    }
  });
};

exports.getReports = (req, res) => {
  //get report with pagination
  const pageSize = +req.query.pagesize || 20;
  const currentPage = +req.query.page || 0;

  Report.find({ approval: true })
    .skip(currentPage * pageSize)
    .limit(pageSize)
    .then((documents) => {
      Report.countDocuments()
        .then((count) => {
          res.status(200).json({
            message: "Reports fetched successfully",
            reports: documents,
            maxReports: count,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error fetching reports",
            error: err,
          });
        });
    });
};
exports.getReportsbyUser = (req, res) => {
  //get report with pagination
  const pageSize = +req.query.pagesize || 20;
  const currentPage = +req.query.page || 0;

  Report.find({ user: req.user._id })
    .skip(currentPage * pageSize)
    .limit(pageSize)
    .then((documents) => {
      Report.countDocuments()
        .then((count) => {
          res.status(200).json({
            message: "Reports fetched successfully",
            reports: documents,
            maxReports: count,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error fetching reports",
            error: err,
          });
        });
    });
};
