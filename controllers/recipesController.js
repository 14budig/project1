var db = require('../models');

function create(req, res){
  var name = req.body.name;
  var desc = req.body.description;
  var ingList = req.body.ingredients.split(',').map(function(item) { return item.trim(); } );
  // var ingredients = ingList.map(function(item){
  //   db.Ingredient.findOne({name: item},function(err, foundIngredient){
  //     if(err){
  //         res.send(err);
  //     }
  //     return foundIngredient;
  //   });


  });
}

module.exports = {
  create: create
}
