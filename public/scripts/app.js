
$(document).ready(function(){

  $('#newIngredientForm').on('submit', function(e){
    //Uncaught SyntaxError: Unexpected identifier
    //why?
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/api/ingredients',
      data: data,
      success: function(json){
        console.log(json);
      }
    });
  });

  var source = $('#ingredients-template').html();
  var template = Handlebars.compile(source);

  var source2 = $('#recipes-template').html();
  var template2 = Handlebars.compile(source2);


  $.ajax({
    method: 'GET',
    url: '/api/ingredients',
    success: handleIngredients
  })

  $.ajax({
    method: 'GET',
    url: '/api/recipes',
    success: handleRecipes
  })

  function handleIngredients(json){
    console.log(json);
    renderIngredient(json);
  }

  function handleRecipes(json){
    console.log(json);
    renderRecipe(json);
  }

  function renderIngredient(ingredient){
    console.log(ingredient[0].name)
    ingredient.forEach(function (drink){
      console.log(drink.name);
      var ingredientHtml = template(drink);
      $('#ingredients').append(ingredientHtml);
    })
  }

  function renderRecipe(recipe){
    //console.log(recipe[0].name)
    recipe.forEach(function (recipe){
      console.log(recipe);
      var recipeHtml = template2(recipe);
      $('#recipes').append(recipeHtml);
    })
  }
})
