var yocktailApp = angular.module('yocktail', ['ngRoute','ngResource', 'firebase']);

yocktailApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/explore', {
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
      when('/edit_profile/', {
        templateUrl: 'partials/edit_profile.html',
        controller: 'EditProfileCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);