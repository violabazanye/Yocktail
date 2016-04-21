yocktailApp.controller('CocktailCtrl', function ($scope,$routeParams,$location,Cocktail) {

  	$scope.cocktail = Cocktail.SingleCocktail.get({id:$routeParams.cocktailId}, function(cocktail) {
    	console.log(cocktail.result[0].name);
    	console.log($scope.cocktail.result[0].name); // will print the same
    	$scope.url = $scope.getUrl($scope.cocktail.result[0].id);
	});

	$scope.getUrl = function (givenId) {
		//console.log($scope.cocktail);
	    return '//assets.absolutdrinks.com/videos/'+ givenId +'.mp4'
	}

	$scope.$on('$viewContentLoaded', function(){

	      Cocktail.PopularCocktails.get({numerical_condition:"gt90"},function(data){
	        $scope.cocktails=data.result;
	      },function(data){
	        $scope.status = "There was an error. Try again.";
	      });
	   
	});

	$scope.search = function(query){
		$location.path("/explore/" + query);
	}


});

