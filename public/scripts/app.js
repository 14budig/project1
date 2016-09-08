$(document).ready({
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
});
