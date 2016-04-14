yocktailApp.controller('HeaderCtrl', function ($scope, Cocktail) {

	$scope.loggedIn = Cocktail.getLoggedIn();
	console.log("$scope.loggedIn:" + $scope.loggedIn);
	
	$scope.user = Cocktail.getUser();
	console.log("$scope.user:" + $scope.user);
});