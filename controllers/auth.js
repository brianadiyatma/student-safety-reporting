const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validator = require("validator");

exports.signup = (req, res, next) => {
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
      activation: "pending",
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

exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "Please provide all the required fields",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      if (user.activation === "pending" || user.activation === "rejected") {
        return res.status(401).json({ error: "User not activated" });
      }
      bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            privilege: user.privilege,
          },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            privilege: user.privilege,
          },
        });
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
