const express = require("express");
const { userController } = require("../controllers/user.controller");
const { recipeController } = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/create", recipeController.createRecipe);

router.get("/:recipeId", recipeController.getSingleRecipe);

router.post("/get-all", recipeController.getAllRecipes);

router.get("/suggestions", recipeController.getSuggestedRecipes);

router.post("/:recipeId/reactions", recipeController.addReactionToRecipe);

router.post("/confirm", recipeController.confirmRecipeTransaction);

module.exports = router;
