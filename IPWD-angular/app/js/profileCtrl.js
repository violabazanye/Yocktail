yocktailApp.controller('ProfileCtrl', function ($scope, $firebase, $firebaseAuth, $firebaseArray, $location, $routeParams, Cocktail) {

	var visitingUid = $routeParams.userUid;
	var currentUser = Cocktail.getUser();
	$scope.isSignedInUser = false;

	// creating a Firebase database Reference for users
	var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");  

	var cocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/cocktails"); 
	var cocktails = $firebaseArray(cocktailsRef);

	console.log("cocktails: ");
	console.log(cocktails);

	$scope.userMadeCocktails = [];

	var newIngredients = [];
	$scope.newIngredient = "";
	$scope.newIngredientsString = "";

	this.setUserMadeCocktail = function(uid){
		var userMadeCocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/users/" + uid + "/cocktails");
		var userMadeCocktailsFirebaseArray = $firebaseArray(userMadeCocktailsRef);

		console.log("userMadeCocktailsFirebaseArray $keyAt 0: ");
		console.log(userMadeCocktailsFirebaseArray.$keyAt(0));

		// get the id in userMadeCocktails
		userMadeCocktailsRef.once("value", function(snapshot) {
			console.log(snapshot);
			console.log("snapshot");
			// The callback function will get all the cocktails the user has made
			snapshot.forEach(function(childSnapshot) {
			    // key will be "fred" the first time and "barney" the second time
			    var key = childSnapshot.key();
			    // childData will be the id of the cocktail
			    var childData = childSnapshot.val();
			    console.log("childData");
			    console.log(childData);

			    // use the id to retrieve the data in cocktailsRef and get the whole object back
			    cocktailsRef.child(childData).once("value", function(data) {
			    	console.log("cocktail");
			    	console.log(data.val());

			    	cocktail = data.val();

			    	$scope.userMadeCocktails.push(cocktail);
			    });
			});

			 $scope.userMadeCocktails.reverse();
		});
	}

	this.setUserFavorites = function(uid){

	}

    // check if visitingUid is in routeParams
    if (visitingUid) {
		// visitingUid specified
		// check if it is the profile page of the signed in user
		if(currentUser == ''){
			// no signed in user
			$scope.isSignedInUser = false;
		}else{
	    	// user signed in
	    	if(currentUser.uid == visitingUid){
	    		$scope.isSignedInUser = true;
	    	}else{
	    		$scope.isSignedInUser = false;
	    	}
	    }

	    if ($scope.isSignedInUser) {
	    	// is the profile page of the signed in user 
	    	$scope.user = currentUser;
	    }else{
	    	// not the profile page of the signed in user 
	    	// get data of the profile page of the user with visitingUid
	    	usersRef.child(visitingUid).once("value", function(data){
	    		console.log("ProfileCtrl visiting user data");
	    		console.log(data.val());
	    		if (data.val()) {
	    			var visitingUser = data.val();
	    			visitingUser.uid = visitingUid;
	    			//var visitingUser = { uid: visitingUid, name: visitingUserData.name};
	    			console.log("visitingUser: " + visitingUser);

	    			$scope.user = visitingUser;
	    		}else{
	    			console.log("ProfileCtrl: Data is not valid.");
	    			$location.path('/signin');
	    		}
	    		$scope.$apply();
	        	// $apply() is used to execute an expression in angular from outside of the angular framework. 
	        	// (For example from browser DOM events, setTimeout, XHR or third party libraries).
	        });
	    }

	    // set the user made cocktails
	    this.setUserMadeCocktail(visitingUid);

	    // set the user's favorites
	    this.setUserFavorites(visitingUid);

	}else{
		// no visitingUid specified
		// check if user signed in
		if (currentUser == '') {
			// no user signed in
			// redirect to signin page
			$location.path('/signin');
		}else{
			// user signed in
			// redirect to the profile with uid
			$location.path('/profile/'+currentUser.uid);
		}
	}
	
	$scope.addIngredient = function(ingredient){
			if(ingredient){
				if (newIngredients.length > 0) {
					$scope.newIngredientsString = $scope.newIngredientsString + ", " + ingredient;
				}else{
					$scope.newIngredientsString += ingredient;
				}

				newIngredients.push(ingredient);
				$scope.newIngredient = "";
			}else{
			// do nothing
		}
	}

	$scope.CancelCreateNewCocktail = function(){
		newIngredients = [];
		$scope.newIngredientsString = "";
		$scope.newCocktail = null; 
	}

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
				$scope.$apply(function() {
					$scope.selectImageError = true;
					$scope.selectImageErrorMessage = "Sorry, please select a image.";
				});
			}
		}else{
			console.log("Sorry, please try again.");
			$scope.$apply(function() {
				$scope.selectImageError = true;
				$scope.selectImageErrorMessage = "Sorry, please try again.";
			});
		}
	}

	$scope.imageIsLoaded = function(e){
		$scope.$apply(function() {
			console.log("e.target.result");
			console.log(e.target.result);

			$scope.newCocktail.image = e.target.result;

			console.log("$scope.newCocktail.image");
			console.log($scope.newCocktail.image);
		});
	}

	$scope.CreateNewCocktail = function(){
		var newCocktail = $scope.newCocktail;

		newCocktail.ingredients = newIngredients;
		newCocktail.creator_uid = currentUser.uid; 
		newCocktail.timestamp = Firebase.ServerValue.TIMESTAMP;

		console.log("newCocktail:");
		console.log(newCocktail);

		// add this new cocktail into the cocktail array
		cocktails.$add(newCocktail).then(function(ref){
			var newCocktailId = ref.key();

			// add this new cocktail id into the user's self-made cocktail array
			userMadeCocktailsFirebaseArray.$add(newCocktailId).then(function(ref){
				console.log("The cocktail is successfully added");

				newIngredients = [];
				$scope.newIngredientsString = "";
				$scope.newCocktail = null; 

				$scope.createNewCocktailError = false;
				$scope.createNewCocktailSuccessMessage = "Your cocktail has been created!";
			}, function(error) {
		  	// The Promise was rejected.
		  	console.error(error);
		  	$scope.createNewCocktailError = true;
		  	$scope.createNewCocktailErrorMessage = "Failed to create your cocktail. Please try again.";
		  });
		}, function(error) {
		  	// The Promise was rejected.
		  	console.error(error);
		  	$scope.createNewCocktailError = true;
		  	$scope.createNewCocktailErrorMessage = "Failed to create your cocktail. Please try again.";
		  });
	}

	// $scope.UpdateCocktail = function(id){
	// 	cocktails.$save(id).then(function(ref) {
	// 	   console.log("The cocktail is successfully updated: "+ref.key());
	// 	});
	// }

	$scope.DeleteCocktail = function(id){
		// remove from the cocktail array
		cocktails.$remove(id).then(function(ref){

			// remove from the user's self-made cocktail array
			userMadeCocktailsFirebaseArray.$remove(id).then(function(ref){
				console.log("The cocktail is successfully removed: "+ref.key());
			});

		});
	}

	$scope.CancelCreateNewCocktail = function(){
		if ($scope.createNewCocktailError) {
			// if failed to create a cocktail or the use didn't create a cocktail
			// just dimiss the modal
			// do nothing
		}else{
			// if succeeded in creating a cocktail
			// refresh page on close the page
			$location.path('/profile/'+currentUser.uid);
		}
	}

});