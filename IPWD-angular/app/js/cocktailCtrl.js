yocktailApp.controller('CocktailCtrl', function ($scope,$sce,$routeParams,$location,Cocktail) {

  $scope.cocktail = Cocktail.SingleCocktail.get({id:$routeParams.cocktailId});
  
  /*if($scope.cocktail != undefined){
  	console.log($scope.cocktail);
  }
  
  $scope.url = $sce.trustAsResourceUrl('http://assets.absolutdrinks.com/videos/' + '');
*/

	$scope.$on('$viewContentLoaded', function(){

	      Cocktail.PopularCocktails.get({numerical_condition:"gt90"},function(data){
	        $scope.cocktails=data.result;
	      },function(data){
	        $scope.status = "There was an error. Try again.";
	      });
	   
	});

	$scope.search = function(query){
		$location.path("/explore/" + query);
	}

});
