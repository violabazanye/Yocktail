yocktailApp.controller('CocktailCtrl', function ($scope,$sce,$routeParams,Cocktail) {

  $scope.cocktail = Cocktail.SingleCocktail.get({id:$routeParams.cocktailId});
  
  console.log($scope.cocktail.length);

  //$scope.url = $sce.trustAsResourceUrl('http://assets.absolutdrinks.com/drinks/' + $scope.cocktail.videos[1].video);

});
