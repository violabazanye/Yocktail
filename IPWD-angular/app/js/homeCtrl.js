yocktailApp.controller('HomeCtrl', function ($scope,Cocktail) {

	$scope.$on('$viewContentLoaded', function(){

	      Cocktail.PopularCocktails.get({numerical_condition:"gt90"},function(data){
	        $scope.cocktails=data.result;
	      },function(data){
	        $scope.status = "There was an error. Try again.";
	      });
	   
	});

	$scope.go = function ( path ) {
  		$location.path( path );
	};

});