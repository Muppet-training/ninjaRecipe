const express = require("express");

//Set up express app
const app = express();

app.get("/api", (req, res, next) => {
  console.log("Get Reuest");
  res.send({ name: "Yoshi" });
});

// Listen for requests
app.listen(process.env.port || 5000, function() {
  console.log("App is listen for requests...");
});
