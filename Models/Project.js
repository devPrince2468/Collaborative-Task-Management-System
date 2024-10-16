const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
