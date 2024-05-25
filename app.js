const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const recipeRoutes = require("./routes/recipe.routes");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to HalalBites Server!!!");
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);

module.exports = app;
