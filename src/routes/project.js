const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { createProject } = require("../controllers/projectController");

const router = Router();

router.post("/", verifyToken, createProject);

module.exports = router;
