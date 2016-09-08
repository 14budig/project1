$(document).ready(function(){

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
