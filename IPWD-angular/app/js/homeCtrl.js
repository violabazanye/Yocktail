yocktailApp.controller('HomeCtrl', function ($scope,Cocktail, $location) {

	$scope.$on('$viewContentLoaded', function(){

		Cocktail.PopularCocktails.get({numerical_condition:"gt90"},function(data){
			$scope.cocktails=data.result;
		},function(data){
			$scope.status = "There was an error. Try again.";
		});
		
	});

	$scope.isSignedIn = Cocktail.isSignedIn();

	$scope.search = function(query){
		$location.path("/explore/" + query);
	}
});