var db = require('../models');

function create(req, res){
  var name = req.body.name;
  var desc = req.body.description;
  var newRecipe = new db.Recipe({
    name: name,
    description: desc
  });
  var ingList = req.body.ingredients;
  db.Ingredient.find({
    name: {$in: ingList}
  }, function (err, ingredients){
    newRecipe.ingredients = ingredients;
    newRecipe.save(function(err, recipe){
      if(err){
        res.status(500).send(err);
      }
      res.json(recipe);
    })
  });


}

module.exports = {
  create: create
}
