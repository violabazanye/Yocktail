yocktailApp.controller('CommunityCtrl', function ($scope, $firebase, $firebaseArray, Cocktail) {

    var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");

	var cocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/cocktails"); 
	//var cocktails = $firebaseArray(cocktailsRef);

	$scope.communityCocktails = [];
	$scope.loadingCommunityCocktails = true;

	cocktailsRef.once("value", function(snapshot) {

		snapshot.forEach(function(data) {
			var cocktail = data.val();
			console.log("cocktail");
			console.log(cocktail);

			cocktail.key = data.key();

			var creatorUid = cocktail.creator_uid;
			console.log("creatorUid :"+creatorUid);

			usersRef.child(creatorUid).once("value", function(data){
				cocktail.creator = data.val();

				console.log("cocktail.creator :");
				console.log(cocktail.creator);

				$scope.communityCocktails.push(cocktail);
				$scope.$apply();
			});
		});


		$scope.loadingCommunityCocktails = false;
	});

	// $scope.$on('$viewContentLoaded', function(){

	// 	Cocktail.Top10Cocktails.get({numerical_condition:"gt90"},function(data){
	// 		$scope.cocktails=data.result;
	// 	},function(data){
	// 		$scope.status = "There was an error. Try again.";
	// 	});

	// 	The callback function will get all the cocktails the user has made

	// });

});