yocktailApp.controller('SigninCtrl', function ($scope, $firebaseAuth, $location, Cocktail) {

    var firebaseObj = new Firebase("https://yocktail.firebaseio.com");
    var authObj = $firebaseAuth(firebaseObj);

	$scope.SignIn = function(e) {

	    e.preventDefault();
	    var email = $scope.user.email;
	    var password = $scope.user.password;

	    // signed in on firebase
	    authObj.$authWithPassword({
	            email: email,
	            password: password
	        })
	        .then(function(userData) {
	            //Success callback
	            console.log("user");
	            console.log(userData);
	            console.log('SigninCtrl Authentication successful' + userData.uid);
	            
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