yocktailApp.controller('ExploreCtrl', function ($scope,Cocktail) {

	$scope.$on('$viewContentLoaded', function(){
	    /*if($cookieStore.get("query") != undefined){
	      $scope.search($cookieStore.get("query"));
	    }else{*/
	      $scope.status = "Searching...";
	      Cocktail.CocktailSearch.get(function(data){
	        $scope.cocktails=data.result;
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

});