yocktailApp.controller('ProfileCtrl', function ($scope, $firebase, $firebaseAuth, $firebaseArray, $location, $routeParams, Cocktail) {

	var visitingUid = $routeParams.userUid;
	var currentUser = Cocktail.getUser();
	var isSameUser = false;
	$scope.isSignedIn = Cocktail.isSignedIn();

	// creating a Firebase database Reference for users
	var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");  
    // check if visitingUid is in routeParams
    if (visitingUid) {
		// visitingUid specified
		// check if it is the profile page of the signed in user
		if(currentUser == ''){
			// no signed in user
			// do nothing
		}else{
	    	// user signed in
	    	if(currentUser.uid == visitingUid){
	    		isSameUser = true;
	    	}else{
	    		// do nothing
	    	}
	    }

	    if (isSameUser) {
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


	var cocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/cocktails"); 
	var cocktails = $firebaseArray(cocktailsRef);

	var userMadeCocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/users/" + currentUser.uid + "/cocktails");
	var userMadeCocktails = $firebaseArray(userMadeCocktailsRef);

	$scope.CreateNewCocktail = function(){
		var newCocktail = $scope.newCocktail;

		newCocktail.creator_uid = currentUser.uid; 
		newCocktail.timestamp = Firebase.ServerValue.TIMESTAMP;

		// add this new cocktail into the cocktail array
		cocktails.$add(newCocktail).then(function(ref){
			var newCocktailId = ref.key();

			// add this new cocktail id into the user's self-made cocktail array
			userMadeCocktails.$add(newCocktailId).then(function(ref){
				console.log("The cocktail is successfully added");
			});
		});
	}

	$scope.UpdateCocktail = function(id){
		cocktails.$save(id).then(function(ref) {
		   console.log("The cocktail is successfully updated: "+ref.key());
		});
	}

	$scope.DeleteCocktail = function(id){
		// remove from the cocktail array
		cocktails.$remove(id).then(function(ref){

			// remove from the user's self-made cocktail array
			userMadeCocktails.$remove(id).then(function(ref){
				console.log("The cocktail is successfully removed: "+ref.key());
			});

		});
	}

});