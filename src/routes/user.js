const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { getProfile } = require("../controllers/authController");

const router = Router();

router.get("/", verifyToken, getProfile);

module.exports = router;
