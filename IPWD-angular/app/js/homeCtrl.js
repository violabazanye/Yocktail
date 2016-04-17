yocktailApp.controller('HomeCtrl', function ($scope,Cocktail) {

	$scope.$on('$viewContentLoaded', function(){

	      Cocktail.PopularCocktails.get({numerical_condition:"gt90"},function(data){
	        $scope.cocktails=data.result;
			console.log($scope.cocktails);
	      },function(data){
	        $scope.status = "There was an error. Try again.";
	      });
	   
	});


});