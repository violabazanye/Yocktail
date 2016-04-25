yocktailApp.controller('EditProfileCtrl', function ($scope, $firebaseAuth, $location, $routeParams, Cocktail) {

	var currentUser = Cocktail.getUser();
	$scope.user = currentUser;
	$scope.imageString = "";
	$scope.hasProfileImage = false;
	$scope.hasLoadedImage = false;
	$scope.editUser = {uid: currentUser.uid, name: currentUser.name, bio: currentUser.bio, birthday: currentUser.birthday, email: currentUser.email};

	// check if user already signed in
	if (currentUser == '') {
		// no user signed in
		$location.path('/signin');
	}else{
		// user signed in
		if(currentUser.profile_image){
			console.log("set profile image");

			$scope.imageString = currentUser.profile_image;
			$scope.hasProfileImage = true;
		}else{
			console.log("the user does have a profile_image, use mockup image instead");

			$scope.imageString = "";
			$scope.hasProfileImage = false;
		}
	}

	// creating a Firebase database Reference for users
	var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");  

	// create authentication object
	var firebaseObj = new Firebase("https://yocktail.firebaseio.com");
	var authObj = $firebaseAuth(firebaseObj);

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
					//currentUser.profile_image = imageData;
					Cocktail.setUser("profile_image", imageData);

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
				//currentUser.profile_image = "";
				Cocktail.setUser("profile_image", "");

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
					$scope.updateBasicInfoFormSuccessMessage = "Your information is updated!";
					console.log('EditProfileCtrl UpdatBasicInfo success');
				}else{
					// update in firebase
					if (newName != currentUser.name) {
						usersRef.child(currentUser.uid).child("name").set(newName, function(error){
							if(!error){
								// currentUser.name = newName;
								Cocktail.setUser("name", newName);

								$scope.$apply(function(){
									$scope.updateBasicInfoFormError = false;
									$scope.updateBasicInfoFormSuccessMessage = "Your information is updated!";
									console.log('EditProfileCtrl UpdatBasicInfo success');
								});
							}else{
								$scope.$apply(function(){
									$scope.updateBasicInfoFormError = true;
									$scope.updateBasicInfoFormErrorMessage = "Failed to update your name information. Please try again.";
									console.log('EditProfileCtrl UpdatBasicInfo success');
								});
							}
						});
					}else{
						$scope.updateBasicInfoFormError = false;
						$scope.updateBasicInfoFormSuccessMessage = "Your information is updated!";
						console.log('EditProfileCtrl UpdatBasicInfo success');
					}
					
					if (newBio != currentUser.bio) {
						usersRef.child(currentUser.uid).child("bio").set(newBio, function(error){
							if(!error){
								currentUser.bio = newBio;
								Cocktail.setUser("bio", newBio);

								$scope.$apply(function(){
									$scope.updateBasicInfoFormError = false;
									$scope.updateBasicInfoFormSuccessMessage = "Your information is updated!";
									console.log('EditProfileCtrl UpdatBasicInfo success');
								});
							}else{
								$scope.$apply(function(){
									$scope.updateBasicInfoFormError = true;
									$scope.updateBasicInfoFormErrorMessage = "Failed to update your bio information. Please try again.";
									console.log('EditProfileCtrl UpdatBasicInfo success');
								});
							}
						});
					}else{
						$scope.updateBasicInfoFormError = false;
						$scope.updateBasicInfoFormSuccessMessage = "Your information is updated!";
						console.log('EditProfileCtrl UpdatBasicInfo success');
					}
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
					$scope.changeEmailFormSuccessMessage = "Your email remains the same.";
					console.log('EditProfileCtrl ChangeEmail success');
				}else{
					// update email
					authObj.$changeEmail({
						oldEmail: currentUser.email,
						newEmail: newEmail,
						password: password
					}).then(function() {
						// update in firebase
						//var updatedUser = {name: currentUser.name, bio: currentUser.bio, birthday: currentUser.birthday, email: newEmail};
						usersRef.child(currentUser.uid).child("email").set(newEmail, function(error){
							if(!error){
								//currentUser.email = newEmail;
								Cocktail.setUser("email", newEmail);

								$scope.$apply(function(){
									$scope.changeEmailFormError = false;
									$scope.changeEmailFormSuccessMessage = "Your email has been changed successfully"; // why not showing?
									console.log('EditProfileCtrl ChangeEmail success');
								});
							}else{
								$scope.$apply(function(){
									$scope.changeEmailFormError = true;
									$scope.changeEmailFormErrorMessage = error.message;
									console.log("EditProfileCtrl ChangeEmail failure Error: " + error);
								});
							}
						});

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
						$scope.changePasswordFormSuccessMessage = "Your password has been changed successfully";
						console.log('EditProfileCtrl Password changed successfully!');
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