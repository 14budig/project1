
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
    json.forEach(function(ingredient){
      renderIngredient(ingredient);
    });
    renderDropdowns(json);
  }

  function handleRecipes(json){
    json.forEach(function(recipe){
      renderRecipe(recipe);
    })
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

})
