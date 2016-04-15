yocktailApp.controller('CocktailCtrl', function ($scope,$routeParams,Cocktail) {


  $scope.cocktail = Cocktail.SingleCocktail.get({id:$routeParams.cocktailId});

});