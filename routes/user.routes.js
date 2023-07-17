const express = require("express");
const { registerUser, loginUser, currentUser, loginAdmin, updateUserDataByEmail, getUserByEmail } = require("../controllers/user.controller");
const authenticateJWT = require("../middleware/jwtTokenVerify");
const router = express.Router();



router.patch("/update-user", updateUserDataByEmail);
router.post("/register", registerUser);
router.get("/admin", loginAdmin);
router.get("/get-me", getUserByEmail);
router.post("/login", loginUser);
router.get("/current", authenticateJWT, currentUser);


module.exports = router;