const { default: mongoose } = require("mongoose");
const Recipe = require("../models/Recipe");
const User = require("../models/User");

const createRecipeIntoDB = async (recipeData) => {
  const result = await Recipe.create(recipeData);
  return result;
};

const getSingleRecipeIntoDB = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  return recipe;
};

const getAllRecipesFromDB = async (
  pageNumber,
  pageSize,
  category,
  country,
  search
) => {
  const skipCount = (pageNumber - 1) * pageSize;
  let query = Recipe.find();

  //category filter
  if (category) {
    query = query.where("category").equals(category);
  }

  //country filter
  if (country) {
    query = query.where("country").equals(country);
  }

  //search system
  if (search) {
    query = query.where("recipeName").regex(new RegExp(search, "i"));
  }

  const recipes = await query.skip(skipCount).limit(pageSize).select({
    recipeName: 1,
    country: 1,
    creatorEmail: 1,
    recipeImage: 1,
    purchased_by: 1,
  });

  return recipes;
};

const addReactionToRecipeIntoDB = async (recipeId, userId) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new Error("Recipe not found");
  }

  if (recipe.reactions.includes(userId)) {
    recipe.reactions = recipe.reactions.filter(
      (reaction) => reaction !== userId
    );
  } else {
    recipe.reactions.push(userId);
  }

  await recipe.save();
  return recipe;
};

const getSimilarRecipesIntoDB = async (category) => {
  const similarRecipes = await Recipe.find({ category: category }).limit(4);
  return similarRecipes;
};

const reduceCoinsFromUser = async (userId, amount) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.coin < amount) {
      throw new Error("Insufficient coins");
    }

    user.coin -= amount;
    await user.save();
  } catch (error) {
    throw error;
  }
};

const addCoinForCreator = async (recipeId, amount) => {
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw new Error("Recipe not found");
    }

    const creatorEmail = recipe.creatorEmail;
    const creator = await User.findOne({ email: creatorEmail });

    if (!creator) {
      throw new Error("Creator not found");
    }

    creator.coin += amount;
    await creator.save();
  } catch (error) {
    throw error;
  }
};

const updateRecipeDetails = async (recipeId, userId) => {
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw new Error("Recipe not found");
    }

    recipe.purchased_by.push(userId);

    recipe.watchCount++;

    await recipe.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRecipeIntoDB,
  getAllRecipesFromDB,
  addReactionToRecipeIntoDB,
  getSimilarRecipesIntoDB,
  reduceCoinsFromUser,
  updateRecipeDetails,
  addCoinForCreator,
  getSingleRecipeIntoDB,
};
