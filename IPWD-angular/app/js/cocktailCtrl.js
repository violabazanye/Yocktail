yocktailApp.controller('CocktailCtrl', function ($scope,$sce,$routeParams,Cocktail) {

  $scope.cocktail = Cocktail.SingleCocktail.get({id:$routeParams.cocktailId});
  
  /*if($scope.cocktail != undefined){
  	console.log($scope.cocktail);
  }
  
  $scope.url = $sce.trustAsResourceUrl('http://assets.absolutdrinks.com/videos/' + '');
*/

});
