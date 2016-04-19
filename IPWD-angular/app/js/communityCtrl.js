yocktailApp.controller('CommunityCtrl', function ($scope,Cocktail) {
  
  $scope.$on('$viewContentLoaded', function(){

	      Cocktail.Top10Cocktails.get({numerical_condition:"gt90"},function(data){
	        $scope.cocktails=data.result;
	      },function(data){
	        $scope.status = "There was an error. Try again.";
	      });
	   
	});
  
});