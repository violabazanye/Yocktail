yocktailApp.controller('SigninCtrl', function ($scope, $firebaseAuth, Cocktail) {

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
	        }, function(error) {
	            //Failure callback
	            console.log('Authentication failure');
	        });
	}

});