const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { createTask, listTasks, deleteTask, updateTask } = require("../controllers/taskController");

const router = Router();

router.get("/", verifyToken, listTasks);
router.post("/", verifyToken, createTask);
router.delete("/:id", verifyToken, deleteTask);
router.patch("/:id", verifyToken, updateTask);

module.exports = router;
