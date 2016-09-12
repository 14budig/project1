# Booze Bandit

Stores ingredients and recipes using ingredients. 

## Information

See the published project at [https://booze-bandit.herokuapp.com/](https://booze-bandit.herokuapp.com/)

## Technologies Used

<li> jQuery </li>
<li> HTML </li>
<li> CSS </li>
<li> Handlebars </li>
<li> Bootstrap </li>
<li> Node </li>
<li> Express </li>
<li> MongoDB </li>
<li> Mongoose </li>

## Code I'm Proud Of

```javascript
  var ingredients = $('.modal-ingredient').toArray();
    ingredients.forEach(function(item, index, ingredients){
      var selected = $(item).html();
      var dropdown = dropTemplate({ingredient: ingredientList});
      $(ingredients[index]).html(dropdown);
      var options = $(ingredients[index]).find('select');
      $(options).val(selected).attr('selected', true);
    });
```
```javascript
    $('.panel-ingredients[data-recipeIng-id=' + id + ']').addClass('hidden');
    $('.panel-description[data-recipeDesc-id=' + id + ']').removeClass('hidden');
```
