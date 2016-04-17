yocktailApp.controller('CocktailCtrl', function ($scope,$routeParams,Cocktail) {

  $scope.cocktail = Cocktail.SingleCocktail.get({id:$routeParams.cocktailId});
  console.log($scope.cocktail);
  
  $scope.$on('$viewContentLoaded', function(){

	      Cocktail.PopularCocktails.get({numerical_condition:"lt80"},function(data){
	        $scope.cocktails=data.result;
			console.log($scope.cocktails);
	      },function(data){
	        $scope.status = "There was an error. Try again.";
	      });
	   
	});

});