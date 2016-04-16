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
	            console.log("user");
	            console.log(user);
	            console.log('SigninCtrl Authentication successful');
	            Cocktail.setUser(username);
				console.log("user:" + Cocktail.getUser());

	            $location.path('/profile');
	        }, function(error) {
	            //Failure callback
	            $scope.regError = true;
				$scope.regErrorMessage = "Sorry, failed to sign in. Please try again.";
	            console.log('SigninCtrl Authentication failure');
	        });
	}

});