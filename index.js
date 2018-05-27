const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Set up express app
const app = express();

// Connect to mongoDb
mongoose.connect("mongodb://localhost/reciperevenue");
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// Initialize routes
app.use("/api", require("./routes/api"));

// Error handling middleware
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(422).send({ error: err.message });
});

// Listen for requests
app.listen(process.env.port || 5000, function() {
  console.log("App is listen for requests...");
});
