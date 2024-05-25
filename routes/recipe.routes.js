const express = require("express");

const {
  createRecipe,
  getAllRecipes,
  addReactionToRecipe,
  getSuggestedRecipes,
  confirmRecipeTransaction,
  getSingleRecipe,
} = require("../controllers/recipe.controller");

const router = express.Router();

router.post("/create", createRecipe);

router.get("/:recipeId", getSingleRecipe);

router.post("/get-all", getAllRecipes);

router.get("/suggestions", getSuggestedRecipes);

router.post("/:recipeId/reactions", addReactionToRecipe);

router.post("/confirm", confirmRecipeTransaction);

module.exports = router;
