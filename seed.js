var db = require('./models');
var manhattanIngredients = [];
var oldFashionedIngredients = [];
var daiquiriIngredients = [];
var martiniIngredients = [];
var sidecarIngredients = [];
var jackRoseIngredients = [];
var newIngredients = [
  {
    name: 'Rum',
    description: 'distilled alcoholic beverage made from sugarcane byproducts'
  },
  {
    name: 'Whiskey',
    description: 'distilled alcoholic beverage made from fermented grain mash'
  },
  {
    name: 'Vermouth',
    description: 'fortified wine'
  },
  {
    name: 'Gin',
    description: 'spirit which derives its predominant flavor from juniper berries'
  },
  {
    name: 'Maraschino',
    description: 'liqueur made from the distillation of Marasca cherries'
  },
  {
    name: 'Cognac',
    description: 'variety of brandy'
  },
  {
    name: 'Triple Sec',
    description: 'orange-flavored liqueur'
  },
  {
    name: 'Applejack',
    description: 'apple-flavored alcoholic beverage'
  },
  {
    name: 'Grenadine',
    description: 'non-alcoholic bar syrup'
  },
  {
    name: 'Lime Juice'
  },
  {
    name: 'Lemon Juice'
  },
  {
    name: 'Simple Syrup'
  },
  {
    name: 'Bitters'
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
    oldFashionedIngredients.push(foundIngredient);
    db.Ingredient.findOne({name: 'Vermouth'}, function (err, foundIngredient){
      if(err){
        console.log(err);
      }
      console.log('found ingredient ', foundIngredient)
      manhattanIngredients.push(foundIngredient);
      martiniIngredients.push(foundIngredient);
      db.Ingredient.findOne({name: 'Gin'}, function (err, foundIngredient){
        if(err){
          console.log(err);
        }
        martiniIngredients.push(foundIngredient);
        db.Ingredient.findOne({name: 'Rum'}, function (err, foundIngredient){
          if(err){
            console.log(err);
          }
          daiquiriIngredients.push(foundIngredient);
          db.Ingredient.findOne({name: 'Cognac'}, function (err, foundIngredient){
            if(err){
              console.log(err);
            }
            sidecarIngredients.push(foundIngredient);
            db.Ingredient.findOne({name: 'Triple Sec'}, function (err, foundIngredient){
              if(err){
                console.log(err);
              }
              sidecarIngredients.push(foundIngredient);
              db.Ingredient.findOne({name: 'Lime Juice'}, function (err, foundIngredient){
                if(err){
                  console.log(err);
                }
                daiquiriIngredients.push(foundIngredient);
                db.Ingredient.findOne({name: 'Simple Syrup'}, function (err, foundIngredient){
                  if(err){
                    console.log(err);
                  }
                  daiquiriIngredients.push(foundIngredient);
                  oldFashionedIngredients.push(foundIngredient);
                  db.Ingredient.findOne({name: 'Bitters'}, function (err, foundIngredient){
                    if(err){
                      console.log(err);
                    }
                    manhattanIngredients.push(foundIngredient);
                    oldFashionedIngredients.push(foundIngredient);
                    db.Ingredient.findOne({name: 'Lemon Juice'}, function (err, foundIngredient){
                      if(err){
                        console.log(err);
                      }
                      sidecarIngredients.push(foundIngredient);
                      jackRoseIngredients.push(foundIngredient);
                      db.Ingredient.findOne({name: 'Applejack'}, function (err, foundIngredient){
                        if(err){
                          console.log(err);
                        }
                        jackRoseIngredients.push(foundIngredient);
                        db.Ingredient.findOne({name: 'Grenadine'}, function (err, foundIngredient){
                          if(err){
                            console.log(err);
                          }
                          jackRoseIngredients.push(foundIngredient);
                          var newRecipes = [
                          {
                            name: 'Manhattan',
                            ingredients: manhattanIngredients,
                            description: 'classic cocktail'
                          },
                          {
                            name: 'Old Fashioned',
                            ingredients: oldFashionedIngredients,
                            description: 'classic cocktail'
                          },
                          {
                            name: 'Daiquiri',
                            ingredients: daiquiriIngredients,
                            description: 'classic cocktail'
                          },
                          {
                            name: 'Martini',
                            ingredients: martiniIngredients,
                            description: 'classic cocktail'
                          },
                          {
                            name: 'Sidecar',
                            ingredients: sidecarIngredients,
                            description: 'classic cocktail'
                          },
                          {
                            name: 'Jack Rose',
                            ingredients: jackRoseIngredients,
                            description: 'classic cocktail'
                          }
                          ]

                          db.Recipe.remove({}, function(err){
                            console.log("remove recipes")
                            db.Recipe.create(newRecipes, function(err, recipe){
                              if (err){
                                console.log("error " + err);
                              }
                              console.log("new " + newRecipes);
                              process.exit();
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
  });
});












