yocktailApp.controller('ExploreCtrl', function ($scope,Cocktail) {

	$scope.$on('$viewContentLoaded', function(){
	    /*if($cookieStore.get("query") != undefined){
	      $scope.search($cookieStore.get("query"));
	    }else{*/
	      $scope.status = "Searching...";
	      Cocktail.CocktailSearch.get(function(data){
	        $scope.cocktails=data.result;
			console.log($scope.cocktails);
	        $scope.status = "Showing " + data.result.length + " results";
	      },function(data){
	        $scope.status = "There was an error. Try again.";
	      });
	    //}
	});

	$scope.search = function(query) {
	    //$cookieStore.put("query", query);
	  	$scope.status = "Searching...";
	   	Cocktail.CocktailQuerySearch.get({input:query},function(data){
	    	$scope.cocktails=data.result;
	     	$scope.status = "Showing " + data.result.length + " results";
	   	},function(data){
	     	$scope.status = "There was an error. Try again.";
	   	});
	}

	$scope.occasions = function(category){
		$scope.status = "Searching...";
	   	Cocktail.OccasionSearch.get({occasion_id:category},function(data){
	    	$scope.cocktails=data.result;
	     	$scope.status = "Showing " + category + " drinks";
	   	},function(data){
	     	$scope.status = "There was an error. Try again.";
	   	});
	}

});