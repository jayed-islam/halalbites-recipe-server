const express = require("express");
const app = express();
const cors = require("cors");

const productRoutes = require("./routes/product.routes");
const userRoute = require("./routes/user.routes");

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Welcome to React Server!!!");
})

app.use("/api/v1/shop", productRoutes);
app.use("/api/v1/user", userRoute);

module.exports = app;