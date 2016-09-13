var db = require('../models');

function index(req, res){
  db.Ingredient.find({}, function index(err, ingredient){
    if(err){
      console.log('index error ' + err);
    }
    res.json(ingredient);
  })
}

function create(req, res){
 db.Ingredient.create(req.body, function(err, ingredient) {
   if (err) { console.log('error', err); }
   console.log(ingredient);
   res.json(ingredient);
 });
}



module.exports = {
  index: index,
  create: create
}
