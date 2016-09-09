var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project-1");

module.exports.Ingredient = require("./ingredients.js");
module.exports.Recipe = require("./recipes.js");
