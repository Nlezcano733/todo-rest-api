const projectModel = require("../models/projectModel");

const createProject = async (req, res) => {
  try {
    const project = new projectModel(req.body);
    const data = project.save();
    res.json(data);
  } catch (e) {
    res.status(400).json({ message: "Error in request" });
  }
};

/**
 * TODO:
 *    EDIT project
 *       ADD collaborators
 *       DELETE collaborators
 *    DELETE project
 *    LIST projects
 */

module.exports = {
  createProject,
};
