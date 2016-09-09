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

function show(req, res){
  db.Recipe.findOne({_id: req.params.recipeId}).populate('ingredients').exec(function(err, recipe){
    if(err) {
      res.status(500).send(err);
    }
    res.json(recipe);
  });
}

function update(req, res){
  db.Ingredient.find({name: {$in: req.body.ingredients}}, function(err, ingList){
    db.Recipe.findOneAndUpdate({_id: req.params.recipeId}, {$set: {
      name: req.body.name,
      description: req.body.description,
      ingredients: ingList
    }}, {new: true}).populate("ingredients").exec(function(error, newRecipe){
      if(error){
        res.status(500).send(err);
      }
      res.json(newRecipe);
    });
  });
}

function destroy(req, res){
  db.Recipe.findOneAndRemove({_id: req.params.recipeId}, function(err, deleteRecipe){
    if(err) {
      res.status(500).send(err);
    }
    res.json(deleteRecipe);
  });
}

function findAll(req, res){
  db.Recipe.find({name: req.query.name}).populate('ingredients').exec(function(err, recipes){
    console.log(req.query.name);
    if(err) {
      res.status(500).send(err);
    }
    res.json(recipes);
  });
}

module.exports = {
  findAll: findAll,
  create: create,
  update: update,
  show: show,
  destroy: destroy
}
