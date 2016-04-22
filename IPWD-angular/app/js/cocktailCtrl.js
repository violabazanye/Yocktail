yocktailApp.controller('CocktailCtrl', function ($scope,$routeParams,$firebaseArray,$location,Cocktail) {
	
	var currentUser = Cocktail.getUser();
	var favoriteCocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/users/" + currentUser.uid + "/favorites/absolutDrinks");
	var favoriteCocktails = $firebaseArray(favoriteCocktailsRef);
  	
  	$scope.cocktail = Cocktail.SingleCocktail.get({id:$routeParams.cocktailId}, function(cocktail) {
    	console.log(cocktail.result[0].name);
    	console.log($scope.cocktail.result[0].name); // will print the same
    	$scope.url = $scope.getUrl($scope.cocktail.result[0].id);
	});

	$scope.getUrl = function (givenId) {
		return 'https://assets.absolutdrinks.com/videos/'+ givenId +'.mp4'
	}

	$scope.$on('$viewContentLoaded', function(){

	      Cocktail.PopularCocktails.get({numerical_condition:"gt90"},function(data){
	        $scope.cocktails=data.result;
	      },function(data){
	        $scope.status = "There was an error. Try again.";
	      });
	      
	      $scope.checkIfDrinkIsInFavorites($routeParams.cocktailId);
	      	   
	});

	$scope.search = function(query){
		$location.path("/explore/" + query);
	}

	$scope.checkIfDrinkIsInFavorites = function(ID){
		favoriteCocktails.$loaded(function(data){
			
			for (var i = 0; i < favoriteCocktails.length; i++) {
				if (favoriteCocktails[i].$value === ID) {
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
		// add this new cocktail into the favorite array

		favoriteCocktails.$add(drinkID).then(function(ref){
			var newCocktailId = ref.key();
			console.log("Success!");
			$scope.clicked = true;
			
		});
	}

	$scope.removeFavorite = function(drinkID){
		// remove from the favorite array
		$scope.clicked = false;
		for (var i = 0; i < favoriteCocktails.length; i++) {
			if (favoriteCocktails[i].$value === drinkID) {
				favoriteCocktails.$remove(i).then(function(ref){
					console.log('item removed, yaay!');
				});
			};
			
		};
	}


});

