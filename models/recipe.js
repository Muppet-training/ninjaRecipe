const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Recipe Schema & model
const RecipeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  price: {
    type: Number,
    required: [true, "Name field is required"]
  },
  internal: {
    type: Boolean,
    default: false
  }
});

// The model will represent the name of the database collection
const Recipe = mongoose.model("recipe", RecipeSchema);

module.exports = Recipe;
