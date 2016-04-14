yocktailApp.controller('SigninCtrl', function ($scope, $firebaseAuth, $location, Cocktail) {

    var firebaseObj = new Firebase("https://yocktail.firebaseio.com");
    var authObj = $firebaseAuth(firebaseObj);

	$scope.SignIn = function(e) {

	    e.preventDefault();
	    var username = $scope.user.email;
	    var password = $scope.user.password;
	    authObj.$authWithPassword({
	            email: username,
	            password: password
	        })
	        .then(function(user) {
	            //Success callback
	            console.log('Authentication successful');
	            Cocktail.setLoggedIn(true);
	            Cocktail.setUser(scope.user.email);
	            $location.path('/home');
	        }, function(error) {
	            //Failure callback
	            console.log('Authentication failure');
	        });
	}

});