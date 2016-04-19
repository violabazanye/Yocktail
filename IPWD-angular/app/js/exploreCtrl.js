yocktailApp.controller('ExploreCtrl', function ($scope,Cocktail) {

	$scope.$on('$viewContentLoaded', function(){
	    /*if($cookieStore.get("query") != undefined){
	      $scope.search($cookieStore.get("query"));
	    }else{*/
	      $scope.status = "Searching...";
	      Cocktail.CocktailSearch.get(function(data){
	        $scope.cocktails=data.result;
			//console.log($scope.cocktails);
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
	     	if (data.result.length != 0) {
		    		$scope.status = "Showing " + query + " drinks";
		    	}else{
		    		$scope.status = "There aren't any drinks that match your entry.";
		    	}	    	
	   	},function(data){
	     	$scope.status = "There was an error. Try again.";
	   	});
	}

	$scope.occasions = function(category,value){
		$scope.status = "Searching...";
		if (value != undefined) {
			Cocktail.OccasionSearch.get({ingredient:value, occasion_id:category},function(data){
		    	$scope.cocktails=data.result;
		    	if (data.result.length != 0) {
		    		$scope.status = "Showing " + value + " - " + category + " drinks";
		    	}else{
		    		$scope.status = "There aren't any drinks that match your entry.";
		    	}		     	
		   	},function(data){
		     	$scope.status = "There was an error. Try again.";
		   	});
		}else{
			Cocktail.OccasionSearch_two.get({occasion_id:category},function(data){
		    	$scope.cocktails=data.result;
		     	if (data.result.length != 0) {
		    		$scope.status = "Showing " + category + " drinks";
		    	}else{
		    		$scope.status = "There aren't any drinks that match your entry.";
		    	}
		   	},function(data){
		     	$scope.status = "There was an error. Try again.";
		   	});
		};
	   	
	}

});