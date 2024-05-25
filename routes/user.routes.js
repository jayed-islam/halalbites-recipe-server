const express = require("express");
const {
  createUser,
  getCurrentUser,
} = require("../controllers/user.controller");
const authenticateJWT = require("../middleware/jwtTokenVerify");
const router = express.Router();

router.post("/create", createUser);
router.get("/me", authenticateJWT, getCurrentUser);

module.exports = router;
