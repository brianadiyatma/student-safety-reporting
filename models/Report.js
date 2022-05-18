const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema({
  accident: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  occurance: {
    type: String,
    required: true,
  },
  aircraftType: {
    type: String,
    required: true,
  },
  personOnBoard: {
    type: String,
    required: true,
  },
  cause: {
    type: String,
    required: true,
  },
  callsign: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  adminFeedBack: {
    type: String,
    required: false,
  },
  approval: {
    type: String,
    required: true,
    default: "pending",
  },
  score: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Report", Report);
