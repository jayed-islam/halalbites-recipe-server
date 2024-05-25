const express = require("express");
const { userController } = require("../controllers/user.controller");
const authenticateJWT = require("../middleware/jwtTokenVerify");
const router = express.Router();

router.post("/create", userController.createUser);
router.get("/me", authenticateJWT, userController.getCurrentUser);

module.exports = router;
