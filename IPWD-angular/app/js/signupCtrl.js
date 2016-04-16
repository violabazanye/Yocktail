yocktailApp.controller('SignupCtrl', function ($scope, $firebaseAuth, $location, Cocktail) {

    var firebaseObj = new Firebase("https://yocktail.firebaseio.com");
    var authObj = $firebaseAuth(firebaseObj);

    $scope.SignUp = function(){

   		if (!$scope.regForm.$invalid) {
            var name = $scope.user.name;
	        var email = $scope.user.email;
            var birthday = $scope.user.birthday;
            var password = $scope.user.password;
            var confirmedPassword = $scope.user.confirmedPassword;

            if (name && email && birthday && password && confirmedPassword) {
                if (password == confirmedPassword) {

                    // create user in firebase
                    authObj.$createUser({ name: name, email: email, birthday: birthday, password: password })
                            .then(function() {
                                    // do things if success
                                    Cocktail.setUser(email);
                                    console.log('SignupCtrl User creation success');
                                    $location.path('/profile');
                                }, function(error) {
                                    // do things if failure
                                    console.log(error);
                                    $scope.regError = true;
                                    $scope.regErrorMessage = error.message;
                                    console.log('SignupCtrl signup failure with error: ' + error.message);
                                }
                            );
                }else{
                    $scope.regError = true;
                    $scope.regErrorMessage = "The two passwords does not match.";
                }
            }else{
                $scope.regError = true;
                $scope.regErrorMessage = "Please fill out all the required information.";
            }
	    }
    };

});