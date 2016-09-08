
$(document).ready(function(){
  var ingredientList;

  $('#newIngredientForm').on('submit', function(e){
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
  $('#newRecipeForm').on('submit', function(e){
    e.preventDefault();
    var data = {
      name: $('#recipe-name').val(),
      description: $('#recipe-desc').val()
    }
    var metaIngredients = $('.ingredient-dropdown');
    var ingredients = [];
    for(var i = 0; i < metaIngredients.length; i++){
      ingredients.push($(metaIngredients[0]).val());
    }
    console.log(ingredients);
    data.ingredients = ingredients;
    console.log(data);
    $.ajax({
      method: 'POST',
      url: '/api/recipes',
      data: data,
      success: addRecipe
    });
  });
  $('#add-dropdown').on('click', function(e){
    e.preventDefault();
    renderDropdowns(ingredientList);
  });

  var source = $('#ingredients-template').html();
  var template = Handlebars.compile(source);

  var source2 = $('#recipes-template').html();
  var template2 = Handlebars.compile(source2);

  var dropSource = $('#ingredients-list').html();
  var dropTemplate = Handlebars.compile(dropSource);


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
    ingredientList = json;
    console.log(json);
    renderIngredient(json);
    renderDropdowns(json);
  }

  function handleRecipes(json){
    console.log(json);
    json.forEach(function(item){
      renderRecipe(item);
    })
    // renderRecipe(json);
  }

  function renderIngredient(ingredient){
    console.log(ingredient[0].name)
    ingredient.forEach(function (drink){
      console.log(drink.name);
      var ingredientHtml = template(drink);
      $('#ingredients').append(ingredientHtml);
    })
  }
  function renderDropdowns(ingredients){
    console.log(ingredients);
    var dropdownHtml = dropTemplate({ingredient: ingredients});
      $('#dropdown-list').append(dropdownHtml);
  }

  function addRecipe(recipe){
    renderRecipe(recipe);
    $('#newRecipeForm').trigger('reset');
    $('#dropdown-list').empty();
    renderDropdowns(ingredientList);
  }

  function renderRecipe(recipe){
    //console.log(recipe[0].name)
    // recipe.forEach(function (recipe){
    //   console.log(recipe);
      var recipeHtml = template2(recipe);
      $('#recipes').append(recipeHtml);
    // })
  }
})
