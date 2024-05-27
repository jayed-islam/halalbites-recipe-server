const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const dotenv = require("dotenv");

const userRoutes = require("./routes/user.routes");
const recipeRoutes = require("./routes/recipe.routes");
const stripe = require("stripe")(process.env.STRIPE_KEY);

// console.log("stripe", process.env.STRIPE_KEY);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to HalalBites Server!!!");
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);

app.post("/create-payment-intent", async (req, res) => {
  const trnData = req.body;

  const amount = trnData.price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = app;
