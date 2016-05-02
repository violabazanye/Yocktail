yocktailApp.controller('HomeCtrl', function ($scope,Cocktail, $location) {
    var usersRef = new Firebase("https://yocktail.firebaseio.com/web/data/users");
	var cocktailsRef = new Firebase("https://yocktail.firebaseio.com/web/data/cocktails"); 

	$scope.isSignedIn = Cocktail.isSignedIn();
	$scope.saved = localStorage.getItem('stored_age');
	$scope.stored_age = [];

	$scope.$on('$viewContentLoaded', function(){

		$scope.loadingPopularCocktails = true;
		$scope.loadingNewlyCreatedCocktails = true;

		Cocktail.PopularCocktails.get({numerical_condition:"gt90"},function(data){
			$scope.cocktails=data.result;
			$scope.loadingPopularCocktails = false;
		},function(data){
			$scope.loadingPopularCocktails = false;
			if($scope.status == -1)
			{
				$scope.status = "Please check your internet connection.";  
			}else{
				$scope.status = "There was an error. Try again.";
			}
		});

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

			$scope.loadingNewlyCreatedCocktails = false;
		});

		if (!($scope.isSignedIn)) {
			if($scope.saved === undefined){
				$('#myModal').modal({backdrop: 'static', keyboard: false , show: true});
			}else{
				$scope.checkAge($scope.saved, false);
			}
			
		};
		console.log($scope.saved);
		
	});

	$scope.search = function(query){
		$location.path("/explore/" + query);
	}

	$scope.checkAge = function(num, store){
		var todayDate = new Date(),
        todayYear = todayDate.getFullYear();
        age = todayYear - num; 

	    if(age < 18){
	    	console.log("you're too young!");
	    	$('#myNoModal').modal({backdrop: 'static', keyboard: false , show: true});
	    }else if (store) {
	    	console.log("it's checked!");
	    	$scope.stored_age = (localStorage.getItem('stored_age')!==null) ? JSON.parse($scope.saved) : [ {year: num} ];
			localStorage.setItem('stored_age', JSON.stringify($scope.stored_age));
	    };
	}

});