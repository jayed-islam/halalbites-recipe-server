const express = require("express");
const app = express();
const cors = require("cors");

const productRoutes = require("./routes/product.routes");

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Welcome to React Server!!!");
})

app.use("/api/v1/shop", productRoutes);

module.exports = app;