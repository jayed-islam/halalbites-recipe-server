const Recipe = require("../models/Recipe");
const { recipeService } = require("../services/recipe.service");
const { createRecipe } = require("../services/recipeService");

const createRecipe = async (req, res) => {
  const recipeData = req.body;

  try {
    const existingRecipe = await Recipe.findOne({
      recipeName: recipeData.recipeName,
    });
    if (existingRecipe) {
      return res.status(400).json({
        success: false,
        message: "Recipe with same name already exists",
      });
    }

    const result = await recipeService.createRecipeIntoDB(recipeData);

    res.status(201).json({
      success: true,
      message: "Recipe created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await recipeService.getSingleRecipeIntoDB(recipeId);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Recipe retrieved successfully",
      data: recipe,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getAllRecipes = async (req, res) => {
  const { pageNumber, pageSize, category, country, search } = req.query;
  const pageNumberInt = parseInt(pageNumber) || 1;
  const pageSizeInt = parseInt(pageSize) || 11;

  try {
    const recipes = await recipeService.getAllRecipesFromDB(
      pageNumberInt,
      pageSizeInt,
      category,
      country,
      search
    );

    res.status(200).json({
      success: true,
      message: "Recipes retrieved successfully!",
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const addReactionToRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const { userId, reactionType } = req.body;

  try {
    const updatedRecipe = await recipeService.addReactionToRecipeIntoDB(
      recipeId,
      userId,
      reactionType
    );
    return res.json({
      success: true,
      message: "Reacted this Recipe",
      data: updatedRecipe,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getSuggestedRecipes = async (req, res) => {
  const { categoryId, country } = req.query;

  try {
    const result = await recipeService.getSimilarRecipesIntoDB(
      categoryId,
      country
    );
    res.status(200).json({
      success: true,
      message: "Similar recipes fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const confirmRecipeTransaction = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    await userService.deductCoins(userId, 10);

    await recipeService.addCoinForCreator(recipeId, 1);

    await recipeService.updateRecipeDetails(recipeId, userId);

    res
      .status(200)
      .json({ success: true, message: "Transaction confirmed successfully!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error confirming transaction",
      error: error.message,
    });
  }
};

export const recipeController = {
  createRecipe,
  getAllRecipes,
  addReactionToRecipe,
  getSuggestedRecipes,
  confirmRecipeTransaction,
  getSingleRecipe,
};