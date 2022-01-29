const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { signUpController, signInController, logout } = require("../controllers/authController");

const router = Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.post("/logout", verifyToken, logout);

module.exports = router;
