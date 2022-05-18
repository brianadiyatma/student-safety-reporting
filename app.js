const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const path = require("path");
const User = require("./models/User");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("*", (req, res, next) => {
//   req.user = {};
//   req.user._id = "627b9271219f76da80da1d04";
//   next();
// });

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(express.static("admin/build"));
  app.use((req, res, next) => {
    User.findOne({ privilege: "admin" })
      .then((user) => {
        if (!user) {
          const newUser = new User({
            name: "Admin",
            email: "admin@admin.com",
            password:
              "$2b$12$pAeTgCfVwdvXvIp.62OSoe9YHDvhLND29ed8Req5N5vdgABgtGGAi",
            privilege: "admin",
            activation: "activated",
          });
          newUser.save();
        }
      })
      .then(() => {
        next();
      });
  });

  app.get("/admin", (req, res) => {
    res.sendFile(path.resolve(__dirname, "admin", "build", "index.html"));
  });
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
