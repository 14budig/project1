var db = require('./models');
var manhattanIngredients = [];
var newIngredients = [
  {
    name: 'Whiskey',
    description: 'distilled alcoholic beverage'
  },
  {
    name: 'Vermouth',
    description: 'fortified wine'
  }
];

db.Ingredient.remove({}, function(err){
  console.log("remove ingredients")
  db.Ingredient.create(newIngredients, function(err, ingredient){
  if (err){
    console.log("error " + err);
  }
  console.log("new " + newIngredients);

  db.Ingredient.findOne({name: 'Whiskey'}, function (err, foundIngredient){
    if(err){
      console.log(err);
    }
    console.log('found ingredient ', foundIngredient)
    manhattanIngredients.push(foundIngredient);
    db.Ingredient.findOne({name: 'Vermouth'}, function (err, foundIngredient){
      if(err){
        console.log(err);
      }
      console.log('found ingredient ', foundIngredient)
      manhattanIngredients.push(foundIngredient);
      var newRecipes = {
        name: 'Manhattan',
        ingredients: manhattanIngredients,
        description: 'classic cocktail'
      }

      db.Recipe.remove({}, function(err){
        console.log("remove recipes")
        db.Recipe.create(newRecipes, function(err, recipe){
          if (err){
            console.log("error " + err);
          }
          console.log("new " + newRecipes);
        });
      });
    });
  });
  });


});












