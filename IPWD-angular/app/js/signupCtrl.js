yocktailApp.controller('SignupCtrl', function ($scope, $firebaseAuth, $firebase, $location, Cocktail, $window) {
    $scope.loading = false;

    $scope.$on('$viewContentLoaded', function(){
        if(Cocktail.getUser() != ''){
            $location.path('/profile');
        }else{
            // do nothing
        }
    });

    // create authentication object
    var firebaseObj = new Firebase("https://yocktail.firebaseio.com/");
    var authObj = $firebaseAuth(firebaseObj);  

    // creating a Firebase database Reference for users
    var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");  

    $scope.SignUp = function(){
        $scope.loading = true;

   		if (!$scope.regForm.$invalid) {
            var name = $scope.user.name;
	        var email = $scope.user.email;
            var birthday = $scope.user.birthday;
            var password = $scope.user.password;
            var confirmedPassword = $scope.user.confirmedPassword;

            if (name && email && birthday && password && confirmedPassword) {
                if (password == confirmedPassword) {
                    // PENDING TO DO: ALSO NEED TO CHECK IF USER'S BIRTHDAY IS VALID

                    // create user in firebase
                    authObj.$createUser({ email: email, password: password })
                            .then(function(userData) {
                                // do things if success

                                // create user with full information for firebase
                                var uid = userData.uid;
                                var newUser = { name: name, email: email, birthday: birthday};
                                //console.log("newUser");
                                //console.log(newUser);
                                usersRef.child(uid).set(newUser);

                                // signup is not enough, need to signed in on firebase
                                // Sign in:
                                authObj.$authWithPassword({
                                    email: email,
                                    password: password
                                })
                                .then(function(userData) {
                                    //Success callback
                                    console.log("SignupCtrl user");
                                    console.log(userData);
                                    console.log('SignupCtrl Authentication successful with uid: ' + userData.uid);

                                    // save the user's full information for local use
                                    var uid = userData.uid;
                                    var newUser2 = { uid: uid, name: name, email: email, birthday: birthday };
                                    //console.log("newUser2");
                                    //console.log(newUser2);
                                    Cocktail.setUser("user", newUser2);

                                    //$location.path('/profile/'+uid);
                                    $scope.loading = false;

                                    $window.location.reload();

                                }, function(error) {
                                    $scope.loading = false;

                                    //Failure callback
                                    $scope.regError = true;
                                    $scope.regErrorMessage = "Sorry, failed to sign in. Please try again.";
                                    console.log('SignupCtrl Authentication failure');
                                });
                            }, function(error) {
                                // do things if failure

                                $scope.loading = false;

                                console.log(error);
                                $scope.regError = true;
                                $scope.regErrorMessage = error.message;
                                console.log('SignupCtrl signup failure with error: ' + error.message);
                            }
                        );
                }else{
                    $scope.loading = false;

                    $scope.regError = true;
                    $scope.regErrorMessage = "The two passwords does not match.";
                }
            }else{
                $scope.loading = false;

                $scope.regError = true;
                $scope.regErrorMessage = "Please fill out all the required information.";
            }
	    }
    };

});