const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    creatorEmail: {
      type: String,
      required: true,
    },
    embedVideoId: {
      type: String,
      required: true,
      trim: true,
    },
    purchased_by: {
      type: [String],
      default: [],
    },
    recipeDetails: {
      type: String,
      required: true,
    },
    recipeImage: {
      type: String,
      required: true,
    },
    watchCount: {
      type: Number,
      default: 0,
    },
    reactions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
