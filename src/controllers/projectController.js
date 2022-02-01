const projectModel = require("../models/projectModel");
const { ErrorHandler } = require('../utils/ErrorHandler');

const createProject = async (req, res) => {
  try {
    const project = new projectModel({ ...req.body, administrator: req.userId });
    const data = project.save();
    res.json(data);
  } catch (e) {
    ErrorHandler(res, e);
  }
};

const listProjects = async (req, res) => {
  const user = req.headers["uid"];
  try {
    const projects = await projectModel.find().lean();
    res.json(
      projects.filter(p => p.administrator === user
        || p.collaborators.includes(user))
    );
  } catch (e) {
    ErrorHandler(res, e);
  }
}

const updateProject = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).json({ message: "Error! No project to edit" });

  const project = projectModel.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  try {
    const newProject = await projectModel.replaceOne({ _id: id }, req.body);
    res.status(200).json(newProject);
  } catch (e) {
    ErrorHandler(res, e);
  }
}

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: "Project not found" });

    await projectModel.deleteOne({ _id: id });
    res.status(204).json({ message: "Project deleted successfully" });
  } catch (e) {
    ErrorHandler(res, e);
  }
}


module.exports = {
  createProject,
  listProjects,
  updateProject,
  deleteProject
};
