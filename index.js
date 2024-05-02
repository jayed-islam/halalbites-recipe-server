const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const app = require("./app");
require("dotenv").config();

const dbUrl = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.msatzvk.mongodb.net/ProectManager`;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB React_Training".red.bold);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
