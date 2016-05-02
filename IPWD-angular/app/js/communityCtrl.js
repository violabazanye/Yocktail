yocktailApp.controller('CommunityCtrl', function ($scope, $firebase, $firebaseArray, Cocktail) {

    var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");
	var cocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/cocktails"); 

	$scope.$on('$viewContentLoaded', function(){

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

	});

});