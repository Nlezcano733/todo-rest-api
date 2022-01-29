const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task_name: { type: String, required: true },
    status: { type: String, default: "not_started" },
    assign_to: { type: [String], default: [] },
    project: { type: String, required: true, unique: true },
    description: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Tasks", taskSchema);
