const express = require("express");
const { registerUser, loginUser, currentUser, loginAdmin } = require("../controllers/user.controller");
const authenticateJWT = require("../middleware/jwtTokenVerify");
const router = express.Router();



router.get("/admin", loginAdmin);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", authenticateJWT, currentUser);


module.exports = router;