yocktailApp.controller('EditProfileCtrl', function ($scope, $firebaseAuth, $location, $routeParams, Cocktail) {

	var currentUser = Cocktail.getUser();
	$scope.user = currentUser;

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

	// create authentication object
	var firebaseObj = new Firebase("https://yocktail.firebaseio.com");
	var authObj = $firebaseAuth(firebaseObj);

	$scope.UpdatBasicInfo = function() {
		if (!$scope.updateBasicInfoForm.$invalid) {
			var newName = $scope.editUser.name;
			var newBio = $scope.editUser.bio;

			if(newName){
				if(newName == currentUser.name && newBio == currentUser.bio){
					// no change, not update
					$scope.updateBasicInfoFormError = false;
					$scope.updateBasicInfoFormSuccessMessage = "You information remains the same.";
					console.log('EditProfileCtrl UpdatBasicInfo success');
				}else{
					// update in firebase
					var updatedUser = {name: newName, bio: newBio, birthday: currentUser.birthday, email: currentUser.email};
					usersRef.child(currentUser.uid).set(updatedUser);

					// update in local
					var updatedUser2 = {uid: currentUser.uid, name: newName, bio: newBio, birthday: currentUser.birthday, email: currentUser.email};
					Cocktail.setUser(updatedUser2);

					$scope.updateBasicInfoFormError = false;
					$scope.updateBasicInfoFormSuccessMessage = "You information is updated!";
					console.log('EditProfileCtrl UpdatBasicInfo success');

					$location.path("/edit_profile");
				}
			}else{
				$scope.updateBasicInfoFormError = true;
				$scope.updateBasicInfoFormErrorMessage = "Name is mandatory.";
				console.log('EditProfileCtrl UpdatBasicInfo failure');
			}
		}else{
			$scope.updateBasicInfoFormError = true;
			$scope.updateBasicInfoFormErrorMessage = "Plese fill out the form.";
			console.log('EditProfileCtrl UpdatBasicInfo failure');
		}
	};

	$scope.ChangeEmail = function() {
		if (!$scope.changeEmailForm.$invalid) {
			var newEmail = $scope.editUser.email;
			var password = $scope.editUser.password;

			if (newEmail && password) {
				if (newEmail == currentUser.email) {
					// no change, not update
					$scope.changeEmailFormError = false;
					$scope.changeEmailFormSuccessMessage = "You email remains the same.";
					console.log('EditProfileCtrl ChangeEmail success');
				}else{
					// update email
					authObj.$changeEmail({
						oldEmail: currentUser.email,
						newEmail: newEmail,
						password: password
					}).then(function() {
						// update in firebase
						var updatedUser = {name: currentUser.name, bio: currentUser.bio, birthday: currentUser.birthday, email: newEmail};
						usersRef.child(currentUser.uid).set(updatedUser);

						// update in local
						var updatedUser2 = {uid: currentUser.uid, name: currentUser.name, bio: currentUser.bio, birthday: currentUser.birthday, email: newEmail};
						Cocktail.setUser(updatedUser2);

						$scope.changeEmailFormError = false;
						$scope.changeEmailFormSuccessMessage = "You email has been changed successfully"; // why not showing?
						console.log('EditProfileCtrl ChangeEmail success');

						$location.path("/edit_profile");

						//$scope.$apply();

					}).catch(function(error) {
						$scope.changeEmailFormError = true;
						$scope.changeEmailFormErrorMessage = error.message;
						console.log("EditProfileCtrl ChangeEmail failure Error: " + error);
					});
				}
			}else{
				$scope.changeEmailFormError = true;
				$scope.changeEmailFormErrorMessage = "Plese fill all the fields.";
				console.log('EditProfileCtrl ChangeEmail failure');
			}
		}else{
			$scope.changeEmailFormError = true;
			$scope.changeEmailFormErrorMessage = "Plese fill out  all the fields.";
			console.log('EditProfileCtrl UpdatBasicInfo failure');
		}
	};

	$scope.ChangePassword = function() {
		if (!$scope.changePasswordForm.$invalid) {
			var currentPassword = $scope.editUser.currentPassword;
			var newPassword = $scope.editUser.newPassword;
			var confirmedNewPassword = $scope.editUser.confirmedNewPassword;

			if(currentPassword && newPassword && confirmedNewPassword){
				if(newPassword == confirmedNewPassword){
					authObj.$changePassword({
						email: currentUser.email,
						oldPassword: currentPassword,
						newPassword: newPassword
					}).then(function() {
						$scope.changePasswordFormError = false;
						$scope.changePasswordFormSuccessMessage = "You password has been changed successfully";
						console.log('EditProfileCtrl Password changed successfully!');

						$location.path("/edit_profile");

					}).catch(function(error) {
						console.error("Error: ", error);
						$scope.changePasswordFormError = true;
						$scope.changePasswordFormErrorMessage = error.message;
					});
				}else{
					$scope.changePasswordFormError = true;
					$scope.changePasswordFormErrorMessage = "The two passwords are not the same.";
				}
			}else{
				$scope.changePasswordFormError = true;
				$scope.changePasswordFormErrorMessage = "Please fill out all the fields.";
			}
		}else{
			$scope.changePasswordFormError = true;
			$scope.changePasswordFormErrorMessage = "Please fill out all the fields.";
		}
	};

});