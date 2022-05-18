const Report = require("../models/Report");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.approve = (req, res) => {
  const { id, adminFeedback, approval, score } = req.body;

  Report.findById(id)
    .then((report) => {
      report.approval = approval;
      report.adminFeedBack = adminFeedback;
      report.score = score;
      report.save();
    })
    .then(() => {
      res.status(200).json({
        message: "Report approved",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
        message: "Error approving report",
      });
    });
};

exports.getAllReport = (req, res) => {
  //get report with pagination
  const pageSize = +req.query.pagesize || 20;
  const currentPage = +req.query.page || 0;

  Report.find()
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

exports.activateUser = (req, res) => {
  const { id, activation } = req.body;
  if (id === undefined || activation === undefined) {
    res.status(400).json({
      message: "Missing parameters",
    });
  }

  User.findById(id)
    .then((user) => {
      user.activation = activation;
      user.save();
    })
    .then(() => {
      res.status(200).json({
        message: "User activated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
        message: "Error activating user",
      });
    });
};

exports.addAdmin = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Please provide a valid email",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: "Please provide a password of at least 6 characters",
    });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const newUser = new User({
      name,
      email,
      password,
      activation: "activated",
      privilege: "admin",
    });
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        newUser.password = hashedPassword;
        return newUser.save();
      })
      .then((user) => {
        res.status(201).json({
          message: "User created successfully",
          user,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error creating user",
        });
      });
  });
};

exports.deleteAdmin = (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    return res.status(400).json({
      message: "Missing parameters",
    });
  }
  User.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({
        message: "User deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
        message: "Error deleting user",
      });
    });
};

exports.getAllUser = (req, res) => {
  const pageSize = +req.query.pagesize || 20;
  const currentPage = +req.query.page || 0;
  User.find({ privilege: "user" })
    .skip(currentPage * pageSize)
    .limit(pageSize)
    .then((documents) => {
      User.countDocuments().then((count) => {
        res.status(200).json({
          message: "Users fetched successfully",
          users: documents,
          maxUsers: count,
        });
      });
    });
};

exports.getAllAdmin = (req, res) => {
  const pageSize = +req.query.pagesize || 20;
  const currentPage = +req.query.page || 0;
  User.find({ privilege: "admin" })
    .skip(currentPage * pageSize)
    .limit(pageSize)
    .then((documents) => {
      User.countDocuments().then((count) => {
        res.status(200).json({
          message: "Users fetched successfully",
          users: documents,
          maxUsers: count,
        });
      });
    });
};
