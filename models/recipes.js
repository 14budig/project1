var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ingredient = require('./ingredients');

var RecipeSchema = new Schema({
  name: String,
  ingredients:[],
  description: String
});
