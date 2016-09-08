var db = require('../models');

function create(req, res){
 db.Ingredient.create(req.body, function(err, ingredient) {
   if (err) { console.log('error', err); }
   console.log(ingredient);
   res.json(ingredient);
 });
}

module.exports = {
  create: create
}
