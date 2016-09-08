$(document).ready(function(){
  $.ajax({
    method: 'GET',
    url: '/api/ingredients',
    success: onSuccess
  })

  function onSuccess(json){
    $('body').append(json);
  }
