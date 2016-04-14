yocktailApp.controller('SignupCtrl', function ($scope, $firebaseAuth, Cocktail) {

    var firebaseObj = new Firebase("https://yocktail.firebaseio.com");
    var authObj = $firebaseAuth(firebaseObj);

    $scope.SignUp = function(){

   		if (!$scope.regForm.$invalid) {
	        var email = $scope.user.email;
            var password = $scope.user.password;

            if (email && password) {
                authObj.$createUser({ email: $scope.user.email, password: $scope.user.password })
                    .then(function() {
                        // do things if success
                        console.log('User creation success');
                    }, function(error) {
                        // do things if failure
                        console.log(error);
                    });
            }
	    }
    };

});