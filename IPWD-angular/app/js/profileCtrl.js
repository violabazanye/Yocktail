yocktailApp.controller('ProfileCtrl', function ($scope, $firebaseAuth, $location, $routeParams, Cocktail) {

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

});