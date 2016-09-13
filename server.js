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



app.get('/api/recipes', controllers.recipes.index);

app.get('/api/ingredients', controllers.ingredients.index);
app.get('/api/recipes/search', controllers.recipes.findAll);

app.get('/api/recipes/:recipeId', controllers.recipes.show);

app.post('/api/ingredients', controllers.ingredients.create);
app.post('/api/recipes', controllers.recipes.create)

app.put('/api/recipes/:recipeId', controllers.recipes.update)
app.delete('/api/recipes/:recipeId', controllers.recipes.destroy)

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
