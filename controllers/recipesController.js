var db = require('../models');

function create(req, res){
  var name = req.body.name;
  var desc = req.body.description;
  var ingList = req.body.split(',').map(function(item) { return item.trim(); } );
  var ingredients = ingList.map(function(item){
    db.Ingredient.findOne({name: item},function(err, foundIngredient){
      if(err){
          res.send(err);
      }
      return foundIngredient;
    });
    var newRecipe = db.Recipe.create({
      name: name,
      description: desc,
      ingredients: ingredients
    }, function(err, recipe) {
      if (err) { console.log('error', err); }
      console.log(recipe);
      res.json(recipe);
    });

  });
}

module.exports = {
  create: create
}
