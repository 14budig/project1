
$(document).ready(function(){
  var ingredientList;

  $('#newIngredientForm').on('submit', function(e){
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/api/ingredients',
      data: data,
      success: addIngredient
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
      ingredients.push($(metaIngredients[i]).val());
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

  $('#recipes').on('click', '.edit', function(e){
    e.preventDefault();
    var id = $(this).closest(".recipe").data('recipeId');
    $('#editRecipesModal').data('recipeId, id');
    console.log(id);
    $.ajax({
      method: 'GET',
      url: '/api/recipes/' + id,
      success: function(json){
        var modalHtml = modTemplate(json);
        //console.log(modalHtml);
        $('#editRecipesModalBody').html(modalHtml);
      }
    })
     $('#editRecipesModal').modal();
  })

  $('#recipes').on('click', '.delete', function(e){
    e.preventDefault();
    var id = $(this).closest(".recipe").data('recipeId');
    console.log("delete ", id);
    $.ajax({
      method: 'DELETE',
      url: '/api/recipes/' + id,
      success: function(json){
        $('div[data-recipe-id=' + id + ']').remove();
      }
    })

  })

  var modSource = $('#recipe-edit-template').html();
  var modTemplate = Handlebars.compile(modSource);

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
    //console.log(json);
    json.forEach(function(ingredient){
      renderIngredient(ingredient);
    });
    renderDropdowns(json);
  }

  function handleRecipes(json){
    //console.log(json);
    json.forEach(function(recipe){
      renderRecipe(recipe);
    })
    // renderRecipe(json);
  }

  function renderIngredient(ingredient){
    //console.log(ingredient.name)

    var ingredientHtml = template(ingredient);
    $('#ingredients').append(ingredientHtml);
  }
  function renderDropdowns(ingredients){
    //console.log(ingredients);
    var dropdownHtml = dropTemplate({ingredient: ingredients});
      $('#dropdown-list').append(dropdownHtml);
  }

  function addRecipe(recipe){
    renderRecipe(recipe);
    $('#newRecipeForm').trigger('reset');
    $('#dropdown-list').empty();
    renderDropdowns(ingredientList);
  }

  function addIngredient(ingredient){
    $('#newIngredientForm').trigger('reset');
    renderIngredient(ingredient);
    ingredientList.push(ingredient);
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
