const express = require("express");

const {
  createRecipe,
  getAllRecipes,
  addReactionToRecipe,
  getSuggestedRecipes,
  confirmRecipeTransaction,
  getSingleRecipe,
} = require("../controllers/recipe.controller");
const authenticateJWT = require("../middleware/jwtTokenVerify");

const router = express.Router();

router.post("/create", createRecipe);

router.get("/get-all-recipes", getAllRecipes);

router.get("/get-one/:recipeId", authenticateJWT, getSingleRecipe);

router.get("/suggestions", getSuggestedRecipes);

router.post("/:recipeId/reactions", addReactionToRecipe);

router.post("/confirm", confirmRecipeTransaction);

// router.post("/create-payment-intent", paymentMake);

module.exports = router;
