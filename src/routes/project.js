const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  createProject,
  listProjects,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const router = Router();

router.get('/', verifyToken, listProjects)
router.post('/', verifyToken, createProject);
router.patch('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject)


module.exports = router;
