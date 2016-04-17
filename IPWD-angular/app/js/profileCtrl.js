yocktailApp.controller('ProfileCtrl', function ($scope, $firebaseAuth, $location, $routeParams, Cocktail) {

	var visitingUid = $routeParams.userUid;
	var currentUser = Cocktail.getUser();

	if (visitingUid) {
		// visitingUid specified
	}else{
		// no visitingUid specified
		// check if user signed in
		if (currentUser == '') {
			// no user signed in
			$location.path('/signin');
		}else{
			// user signed in
			$location.path('/profile/'+currentUser.uid);
		}
	}

	var isSameUser = false;

	// creating a Firebase database Reference for users
    var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");  

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
        	//console.log(data.val());
        	var visitingUserData = data.val();
            var visitingUser = { uid: visitingUid, name: visitingUserData.name};
			console.log("visitingUser: " + visitingUser);

            $scope.user = visitingUser;
            $scope.$apply();
	    });
    }

});