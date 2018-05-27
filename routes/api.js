const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");

// Get a list of recipes from the database
router.get("/recipes", (req, res, next) => {
  Recipe.find().then(recipe => {
    res.send(recipe);
  });
});

// Post recipe to the database
router.post("/recipes", (req, res, next) => {
  Recipe.create(req.body) // This returns a promise while it is processing
    .then(recipe => {
      res.send(recipe);
    })
    .catch(next);
});

// Update recipe from the database
router.put("/recipes/:id", (req, res, next) => {
  res.send({ type: "PUT" });
});

// Delete recipe from the database
router.delete("/recipes/:id", (req, res, next) => {
  res.send({ type: "DELETE" });
});

module.exports = router;
