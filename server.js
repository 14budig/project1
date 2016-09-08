var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

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




// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
