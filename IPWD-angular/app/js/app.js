var yocktailApp = angular.module('yocktail', ['ngRoute','ngResource', 'firebase']);

yocktailApp.config(['$routeProvider', '$sceDelegateProvider',
  function($routeProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://assets.absolutdrinks.com/**'
      ]);
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/explore', {
        templateUrl: 'partials/explore.html',
        controller: 'ExploreCtrl'
      }).
      when('/explore/:search_input', {
        templateUrl: 'partials/explore.html',
        controller: 'ExploreCtrl'
      }).
      when('/community', {
        templateUrl: 'partials/community.html',
        controller: 'CommunityCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
      }).
      when('/cocktail/:cocktailId', {					
	      templateUrl: 'partials/cocktail.html',
        controller: 'CocktailCtrl'
      }).
      when('/signin', {
        templateUrl: 'partials/signin.html',
        controller: 'SigninCtrl'
      }).
      when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      }).
      when('/profile/', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl'
      }).
      when('/profile/:userUid', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl'
      }).
      when('/editProfile/', {
        templateUrl: 'partials/editProfile.html',
        controller: 'EditProfileCtrl'
      }).
      when('/user_cocktail/:ID', {
        templateUrl: 'partials/userCocktail.html',
        controller: 'UserCocktailCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
    
  }]);
