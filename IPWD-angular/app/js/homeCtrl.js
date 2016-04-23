yocktailApp.controller('HomeCtrl', function ($scope,Cocktail, $location) {

	$scope.isSignedIn = Cocktail.isSignedIn();
	$scope.oldEnough = true;

	$scope.$on('$viewContentLoaded', function(){

		Cocktail.PopularCocktails.get({numerical_condition:"gt90"},function(data){
			$scope.cocktails=data.result;
		},function(data){
			$scope.status = "There was an error. Try again.";
		});

		if (!($scope.isSignedIn)) {
			$('#myModal').modal('show');
		};
		
	});

	$scope.search = function(query){
		$location.path("/explore/" + query);
	}

	$scope.checkAge = function(num){
		var todayDate = new Date(),
        todayYear = todayDate.getFullYear();
        age = todayYear - num; 

	    if(age < 18){
	    	$scope.oldEnough = false;
	    	console.log("you're too young!");
	    	$location.path("/goodbye/");
	    }
	}

    var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");
	var cocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/cocktails"); 

	$scope.userMadeCocktails = [];

	cocktailsRef.limitToLast(4).once("value", function(snapshot) {

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

				$scope.userMadeCocktails.push(cocktail);
				$scope.$apply();
			});
		});
	});
});