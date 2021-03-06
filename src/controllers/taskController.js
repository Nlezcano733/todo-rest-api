const taskModel = require("../models/taskModel");

const createTask = async (req, res) => {
  try {
    const task = new taskModel(req.body);
    const data = await task.save();
    res.json(data);
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ message: "Error in request" });
  }
};

const listTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find().lean();

    res.json(tasks);
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ message: "Error in request" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await taskModel.deleteOne({ _id: req.params.id });
    res.status(204).json({ message: "Task deleted successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ message: "Error in request" });
  }
};

const updateTask = async (req, res) => {
  const idUser = req.params.id;
  try {
    const task = taskModel.findById(idUser);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await taskModel.replaceOne({ _id: idUser }, req.body);
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ message: "Error in request" });
  }
};

/**
 * TODO:
 *    EDIT task:
 *      ADD assign_to
 *      DELETE assign_to
 */

module.exports = {
  createTask,
  listTasks,
  deleteTask,
  updateTask,
};
