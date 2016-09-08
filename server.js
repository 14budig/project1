var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

var controllers = require('./controllers');

var db = require('./models');

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/ingredients', function ingredientIndex(req, res){
  db.Ingredient.find({}, function index(err, ingredient){
    if(err){
      console.log('index error ' + err);
    }
    res.json(ingredient);
  })
})

app.get('/api/recipes', function recipeIndex(req, res){
  db.Recipe.find({}, function index(err, recipe){
    if(err){
      console.log('index error ' + err);
    }
  })
  .populate('ingredients').exec(function(err, recipes){
    res.json(recipes);
  })
})

app.post('/api/ingredients', controllers.ingredients.create);
app.post('/api/recipes', controllers.recipes.create)

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
