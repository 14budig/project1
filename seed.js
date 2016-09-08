var db = require('./models');

var newIngredients = [
  {
    name: Whiskey,
    description: distilled alcoholic beverage
  },
  {
    name: Vermouth,
    description: fortified wine
  }
];








db.Ingredient.remove({}, function(err){
  console.log("remove")
});

db.Ingredient.create(newIngredient, function(err, ingredient){
  if (err){
    console.log("error " + err);
  }
  console.log("new " + newIngredient);
});
