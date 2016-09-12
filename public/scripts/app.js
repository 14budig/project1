
$(document).ready(function(){
  var ingredientList;
  var modSource = $('#recipe-edit-template').html();
  var modTemplate = Handlebars.compile(modSource);

  var source = $('#ingredients-template').html();
  var template = Handlebars.compile(source);

  var source2 = $('#recipes-template').html();
  var template2 = Handlebars.compile(source2);

  var dropSource = $('#ingredients-list').html();
  var dropTemplate = Handlebars.compile(dropSource);

  getAllRecipes();



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
    data.ingredients = ingredients;
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

  $('#remove-dropdown').on('click', function(e){
    e.preventDefault();
    if($('#dropdown-list').children('select').toArray().length > 1){
      $('#dropdown-list').children('select').last().remove();
    }
  })

  $('#recipes').on('click', '.edit', function(e){
    e.preventDefault();
    var id = $(this).closest(".recipe").data('recipeId');
    $('#editRecipesModal').data('recipeId', id);
    $.ajax({
      method: 'GET',
      url: '/api/recipes/' + id,
      success: renderModal
    })
     $('#editRecipesModal').modal();
  })

  $('#recipes').on('click', '.delete', function(e){
    e.preventDefault();
    var id = $(this).closest(".recipe").data('recipeId');
    $.ajax({
      method: 'DELETE',
      url: '/api/recipes/' + id,
      success: function(json){
        $('div[data-recipe-id=' + id + ']').remove();
      }
    })
  })

  $('#recipes').on('click', '.description', function(e){
    e.preventDefault();
    var id = $(this).closest(".recipe").data('recipeId');
    $.ajax({
      method: 'GET',
      url: '/api/recipes/' + id,
      success: renderRecipeDesc
    })
  })

  $('#recipes').on('click', '.displayIngredients', function(e){
    e.preventDefault();
    renderRecipeIng();
  })

  $('#editRecipesModalSubmit').on('click', function(e){
    e.preventDefault();
    var data = {
      name: $('#edit-recipe-name').val(),
      description: $('#edit-recipe-desc').val()
    }
    var metaIngredients = $('#editRecipesModal .ingredient-dropdown');
    var ingredients = [];
    for(var i = 0; i < metaIngredients.length; i++){
      ingredients.push($(metaIngredients[i]).val());
    }
    data.ingredients = ingredients;
    var id = $('#editRecipesModal').data('recipeId');
    $.ajax({
      method: 'PUT',
      url: '/api/recipes/' + id,
      data: data,
      success: handleEdit
    });
  });

$('.modal-body').on('click','#modal-add-dropdown', function(e){
  e.preventDefault();
   var dropdown = dropTemplate({ingredient: ingredientList});
   var listItem = '<li></li>';
 $('#modal-ingredient-list').append(listItem);
 $('#modal-ingredient-list').children().last().html(dropdown);
});

$('.modal-body').on('click','#modal-remove-dropdown', function(e){
  e.preventDefault();
  if($('#modal-ingredient-list').children('li').toArray().length > 1){
    $('#modal-ingredient-list').children('li').last().remove();
  }
});

$('#search-recipes').on('submit', function(e){
  e.preventDefault();
  var query = $(this).serialize();
  console.log(query.length);
  if(query.length <= 5){
    $('#recipes').empty();
    getAllRecipes();
  }
  else{
    $.ajax({
      method: 'GET',
      url:'/api/recipes/search?' + query,
      success: handleSearch
    })
  }
});

// ----------------------------------//
  $.ajax({
    method: 'GET',
    url: '/api/ingredients',
    success: handleIngredients
  })



  function getAllRecipes(){
    $.ajax({
      method: 'GET',
      url: '/api/recipes',
      success: handleRecipes
    })
  }

  function handleIngredients(json){
    ingredientList = json;
    json.forEach(function(ingredient){
      renderIngredient(ingredient);
    });
    renderDropdowns(json);
  }

  function handleRecipes(json){
    if(json.length > 0){
      json.forEach(function(recipe){
        renderRecipe(recipe);
      })
    }
    else{
      $('#recipes').append('<h2>Sorry, your search returned no results</h2>');
    }
    // renderRecipe(json);
  }

  function renderIngredient(ingredient){
    var ingredientHtml = template(ingredient);
    $('#ingredients').append(ingredientHtml);
  }

  function renderDropdowns(ingredients){
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
      var recipeHtml = template2(recipe);
      $('#recipes').append(recipeHtml);
  }

  function renderRecipeDesc(recipe){
      $('#panel-ingredients').addClass('hidden');
      $('#panel-description').removeClass('hidden');
  }

  function renderRecipeIng(recipe){
      $('#panel-ingredients').removeClass('hidden');
      $('#panel-description').addClass('hidden');
  }

  function renderModal(json){
    var modalHtml = modTemplate(json);
    $('#editRecipesModalBody').html(modalHtml);
    var ingredients = $('.modal-ingredient').toArray();
    ingredients.forEach(function(item, index, ingredients){
      var selected = $(item).html();
      var dropdown = dropTemplate({ingredient: ingredientList});
      $(ingredients[index]).html(dropdown);
      var options = $(ingredients[index]).find('select');
      $(options).val(selected).attr('selected', true);
    });
  }

  function handleEdit(json){
    $('#editRecipesModal').modal('hide');
    var $recipe = $('div[data-recipe-id=' + json._id + ']');
    var updatedHtml = template2(json);
    $recipe.html(updatedHtml);
  }

  function handleSearch(data){
    $('#recipes').empty();
    handleRecipes(data);
  }

})
