yocktailApp.controller('EditProfileCtrl', function ($scope, $firebaseAuth, $location, $routeParams, Cocktail) {

	var currentUser = Cocktail.getUser();

	// check if user already signed in
	if (currentUser == '') {
		// no user signed in
		$location.path('/signin');
	}else{
		// user signed in
	}

	$scope.editUser = {uid: currentUser.uid, name: currentUser.name, bio: currentUser.bio, birthday: currentUser.birthday, email: currentUser.email};

	// creating a Firebase database Reference for users
    var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");  

	$scope.UpdatBasicInfo = function(e) {

		if (!$scope.updateBasicInfoForm.$invalid) {
            var newName = $scope.editUser.name;
	        var newBio = $scope.editUser.bio;

	        // rest the local user
            var updatedUser = {uid: currentUser.uid, name: newName, bio: newBio, birthday: currentUser.birthday, email: currentUser.email};

			usersRef.child(currentUser.uid).set(updatedUser);  // change in firebase
			Cocktail.setUser(updatedUser);  // change in local

        	$scope.updateBasicInfoFormSuccess = true;
			$scope.updateBasicInfoFormSuccessMessage = "You information is updated!";
            console.log('EditProfileCtrl UpdatBasicInfo failure');
        }else{
        	$scope.updateBasicInfoFormError = true;
			$scope.updateBasicInfoFormErrorMessage = "Name is mandatory.";
            console.log('EditProfileCtrl UpdatBasicInfo failure');
        }
	};

	$scope.ChangeEmail = function(e) {
		
	};

	$scope.ResetPassword = function(e) {
		
	};

});