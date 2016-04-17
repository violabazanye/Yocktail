yocktailApp.controller('ProfileCtrl', function ($scope, $firebaseAuth, $location, Cocktail) {

	$scope.$on('$viewContentLoaded', function(){
        if(Cocktail.getUser() == ''){
            $location.path('/signin');
        }else{
            // do nothing
        }
    });

    $scope.user = Cocktail.getUser();

});