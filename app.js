const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

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
