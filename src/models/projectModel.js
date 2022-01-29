const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    project_name: { type: String, required: true },
    administrator: { type: String, required: true, unique: true },
    collaborators: { type: [String], default: [] },
    status: { type: String, default: "not_started" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Projects", projectSchema);
