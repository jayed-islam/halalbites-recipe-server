const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projects.controller");

router.get("/", projectController.getAllProjects);

// Route to get a single project by ID
router.get("/getone/:id", projectController.getProjectById);

// Route to edit a project by ID
router.put("/edit/:id", projectController.editProjectById);

// Route to delete a project by ID
router.delete("/delete/:id", projectController.deleteProjectById);

module.exports = router;
