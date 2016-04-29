yocktailApp.controller('UserCocktailCtrl', function ($scope,$routeParams,$firebaseArray,$location,Cocktail) {

	$scope.isSignedIn = Cocktail.isSignedIn();
	$scope.loadingUserCocktails = true;
	
	var userCocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/cocktails");
	var userCocktails = $firebaseArray(userCocktailsRef);

	var currentUser = Cocktail.getUser();
	var favoriteUserCocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/users/" + currentUser.uid + "/favorites/");
	var favoriteUserCocktails = $firebaseArray(favoriteUserCocktailsRef);

	
	userCocktails.$loaded().then(function(x) {
	    $scope.userCocktail = userCocktails.$getRecord($routeParams.ID);
	    $scope.loadingUserCocktails = true;
	    $scope.userCocktail.id = $routeParams.ID;
	  }).catch(function(error) {
	    console.log("Error:", error);
	  });

	$scope.$on('$viewContentLoaded', function(){

	      Cocktail.PopularCocktails.get({numerical_condition:"gt90"},function(data){
	        $scope.cocktails=data.result;
	      },function(data){
	        $scope.status = "There was an error. Try again.";
	      });
	      
	      favoriteUserCocktails.$loaded(function(data){
	      	$scope.checkIfDrinkIsInFavorites($scope.userCocktail.id);
	      });
	      	   
	});

	$scope.search = function(query){
		$location.path("/explore/" + query);
	}


	$scope.checkIfDrinkIsInFavorites = function(ID){
		favoriteUserCocktails.$loaded(function(data){
			for (var i = 0; i < favoriteUserCocktails.length; i++) {
				console.log("favoriteUserCocktails " + i + ": ");
				console.log(favoriteUserCocktails[i]);

				var favoriteCocktail = favoriteUserCocktails[i];

				if (favoriteCocktail.id === ID) {
					console.log("item exists");
					$scope.clicked = true;
				}else{
					console.log("item doesn't exist");
					$scope.clicked = false;
				}
				
			};
		}); 
		
	}

	$scope.addFavorite = function(drinkID){
		console.log("addFavorite: "+drinkID);
		// add this new cocktail into the favorite array
		var newFavortite = {source: "yocktail", id: drinkID};
		
		favoriteUserCocktails.$add(newFavortite).then(function(ref){
			var newCocktailId = ref.key();
			console.log("Success!");
			$scope.clicked = true;
		});
	}

	$scope.removeFavorite = function(drinkID){
		console.log("removeFavorite: "+drinkID);
		// remove from the favorite array
		$scope.clicked = false;
		for (var i = 0; i < favoriteUserCocktails.length; i++) {

			var favoriteCocktail = favoriteUserCocktails[i];

			if (favoriteCocktail.id === drinkID) {
				favoriteUserCocktails.$remove(i).then(function(ref){
					console.log('item removed, yaay!');
				});
			};
			
		};
	}
});