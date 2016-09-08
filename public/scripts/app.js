
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


  $.ajax({
    method: 'GET',
    url: '/api/ingredients',
    success: onSuccess
  })

  function onSuccess(json){
    console.log(json)
    render(json);

  }

  function render(ingredient){
    console.log(ingredient[0].name)
    ingredient.forEach(function (drink){
      console.log(drink.name);
      var ingredientHtml = template(drink);
      $('#ingredients').append(ingredientHtml);
    })
  }
})
