var yocktailApp = angular.module('yocktail', ['ngRoute','ngResource']);

yocktailApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'
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
      otherwise({
        redirectTo: '/home'
      });
  }]);