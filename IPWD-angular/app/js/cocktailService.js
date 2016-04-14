yocktailApp.factory('Cocktail',function ($resource) {
  
  var user;

  var firebaseObj = new Firebase("https://yocktail.firebaseio.com");

  this.CocktailSearch = $resource('http://addb.absolutdrinks.com/drinks/',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});


  return this;

});