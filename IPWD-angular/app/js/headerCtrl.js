yocktailApp.controller('HeaderCtrl', function ($scope, Cocktail, $location) {
	
	$scope.user = Cocktail.getUser();
	console.log("HeaderCtrl $scope.user:");
	console.log($scope.user);

	$scope.$watch(Cocktail.getUser(), function(newVal, oldVal){
      $scope.user = newVal;
    });

    $scope.logout = function() {
    	Cocktail.logoutUser();
    	$location.path('/home');
    	console.log("HeaderCtrl: already logged out");
    }
});