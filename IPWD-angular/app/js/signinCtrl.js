yocktailApp.controller('SigninCtrl', function ($scope, $firebaseAuth, $location, Cocktail, $window) {

	$scope.$on('$viewContentLoaded', function(){
		if(Cocktail.getUser() != ''){
			$location.path('/profile');
		}else{
			// do nothing
		}
	});

    // create authentication object
    var firebaseObj = new Firebase("https://yocktail.firebaseio.com");
    var authObj = $firebaseAuth(firebaseObj);

    // creating a Firebase database Reference for users
    var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");  

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
	            console.log("SigninCtrl user");
	            console.log(userData);
	            console.log('SigninCtrl Authentication successful with uid: ' + userData.uid);

	            // get the user's info from firebase
	            var uid = userData.uid;
	            usersRef.child(uid).once("value", function(data){
	            	console.log("SigninCtrl signin user data");
	            	console.log(data.val());
	            	var signinUser = data.val();
	            	signinUser.uid = uid;
                    //var signinUser = { uid: uid, name: signinUserData.name, bio: signinUserData.bio, email: signinUserData.email, birthday: signinUserData.birthday };
                    Cocktail.setUser("user", signinUser);

                    console.log("user:" + Cocktail.getUser());

                    // $location.path('/profile/'+uid);
                    $window.location.reload();
                    //$scope.$apply();
	            });
	        }, function(error) {
	            //Failure callback
	            $scope.regError = true;
				$scope.regErrorMessage = "Sorry, failed to sign in. Please try again.";
	            console.log('SigninCtrl Authentication failure');
	        });
	};

});