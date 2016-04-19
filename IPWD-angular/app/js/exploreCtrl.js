yocktailApp.controller('ExploreCtrl', function ($scope,$routeParams,Cocktail) {

	var external_search = $routeParams.search_input;


	$scope.$on('$viewContentLoaded', function(){
	    $scope.status = "Searching...";
	    if (external_search) {
	    	$scope.query = external_search;
	    	$scope.search(external_search);
	    }else{
	    	Cocktail.CocktailSearch.get(function(data){
	        $scope.cocktails=data.result;
			//console.log($scope.cocktails);
	        $scope.status = "Showing " + data.result.length + " random cocktails you may like...";
	      },function(data){
	        $scope.status = "There was an error. Try again.";
	      });
	    }
	      
	});

	$scope.search = function(query) {
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