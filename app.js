const express = require("express");
const app = express();
const cors = require("cors");

const projectRoutes = require("./routes/projects.routes");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Project Server!!!");
});

app.use("/api/v1/project", projectRoutes);

module.exports = app;
