const Project = require("../models/Projects");

const getAllProjects = async (req, res) => {
  try {
    // Fetch all projects from the database
    const projects = await Project.find();

    // Send the projects as a JSON response
    res.status(200).json(projects);
  } catch (error) {
    // Handle errors
    console.error("Error fetching projects:", error);
    res.status(500).json({ success: false, error: "Error fetching projects" });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Edit a project by ID
const editProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, tasks, members } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, image, tasks, members },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete a project by ID
const deleteProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getProjectById,
  editProjectById,
  deleteProjectById,
  getAllProjects,
};
