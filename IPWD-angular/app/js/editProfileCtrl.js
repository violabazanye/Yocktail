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

	$scope.imageString = "";
	$scope.hasProfileImage = false;
	$scope.hasLoadedImage = false;

	usersRef.child(currentUser.uid).once("value", function(data){
		console.log("EditProfileCtrl signin user data");
		console.log(data.val());
		var signinUserData = data.val();
		if(signinUserData.profile_image){
			console.log("set profile image");
			$scope.$apply(function() {
				$scope.imageString = signinUserData.profile_image;
				$scope.hasProfileImage = true;
			});
		}else{
			console.log("the user does's have a profile_image, use mockup image instead");
			
			$scope.$apply(function() {
				$scope.imageString = "";
				$scope.hasProfileImage = false;
			});
		}
	});

	console.log("$scope.imageString: "+$scope.imageString);

	$scope.imageSelect = function(event){
		var files = event.target.files; //FileList object
		console.log("files");
		console.log(files);

		file = files[0];

		if(file){
			if(file.type.match('image.*')){
				console.log("in files");
				var fireReader = new FileReader();
				fireReader.onload = $scope.imageIsLoaded; 
				fireReader.readAsDataURL(file);
			}else{
				console.log("Sorry, please select a image.");
				$scope.uploadImageError = true;
				$scope.uploadImageErrorMessage = "Sorry, please select a image.";
			}
		}else{
			console.log("Sorry, please try again.");
			$scope.uploadImageError = true;
			$scope.uploadImageErrorMessage = "Sorry, please try again.";
		}
	}

	$scope.imageIsLoaded = function(e){
		$scope.$apply(function() {
			console.log("e.target.result");
			console.log(e.target.result);
			$scope.imageString = e.target.result;
			console.log("$scope.imageSrc");
			console.log($scope.imageString);
			$scope.hasLoadedImage = true;
		});
	}

	$scope.UpdateProfileImage = function(){
		var imageData = $scope.imageString;

		if(imageData && $scope.hasLoadedImage){

			$scope.hasLoadedImage = false;

			usersRef.child(currentUser.uid).child("profile_image").set(imageData, function(error){
				if(!error){
					console.log("imageData uploaded success");
					$scope.$apply(function() {
						$scope.uploadImageError = false;
						$scope.uploadImageSuccessMessage = "Your profile image has been updated.";
						$scope.hasProfileImage = true;
					});
				}else{
					$scope.$apply(function() {
						$scope.uploadImageError = true;
						$scope.uploadImageErrorMessage = "Failed to update your profile image. Please try again.";
					});
				}
			});
		}else{
			$scope.uploadImageError = true;
			$scope.uploadImageErrorMessage = "Please choose a image to upload.";
		}
	};

	$scope.DeleteProfileImage = function(){
		usersRef.child(currentUser.uid).child("profile_image").set("", function(error){
			if(!error){
				console.log("imageData deleted success");
				$scope.$apply(function() {
					$scope.imageString = "";
					$scope.hasProfileImage = false;
					$scope.uploadImageError = false;
					$scope.uploadImageSuccessMessage = "Your profile image has been deleted.";
				});
			}else{
				console.log("imageData deleted failure "+ error.message);
				$scope.$apply(function() {
					$scope.uploadImageError = true;
					$scope.uploadImageErrorMessage = "Your profile image has been deleted.";
				});
			}
		});
	}


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