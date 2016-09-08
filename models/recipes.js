var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ingredient = require('./ingredients');

var RecipeSchema = new Schema({
  name: String,
  ingredients:[{
    type: Schema.Types.ObjectId,
    ref: 'Ingredient'
  }],
  description: String
});

var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
