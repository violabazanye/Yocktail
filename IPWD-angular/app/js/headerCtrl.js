yocktailApp.controller('HeaderCtrl', function ($scope, Cocktail) {
	
	$scope.user = Cocktail.getUser();
	console.log("HeaderCtrl $scope.user:" + $scope.user);

	$scope.$watch(Cocktail.getUser, function(newVal, oldVal){
      $scope.user = newVal;
    });

    $scope.logout = function() {
    }
});