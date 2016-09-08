var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

var controllers = require('./controllers');

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


app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/ingredients', function ingredient(req, res){
  res.json(newIngredients);
})




// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
