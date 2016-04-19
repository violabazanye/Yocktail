yocktailApp.controller('HeaderCtrl', function ($scope, Cocktail, $location, $window) {
	
	$scope.user = Cocktail.getUser();

	console.log("HeaderCtrl $scope.user:");
	console.log($scope.user.name);

    $scope.isSignedIn = Cocktail.isSignedIn();

	// $scope.$watch(Cocktail.getUser(), function(newVal, oldVal){
 //        $scope.user = newVal;
 //    });

 //    $scope.$watch(Cocktail.isSignedIn(), function(newVal, oldVal){
 //        $scope.isSignedIn = newVal;
 //    });

    $scope.logout = function() {
    	Cocktail.logoutUser();
        $window.location.reload();

    	//$location.path('/home');
    	console.log("HeaderCtrl: already logged out");
        
    }
});