'use strict';

/**
 * @ngdoc overview
 * @name uneekioApp
 * @description
 * # uneekioApp
 *
 * Main module of the application.
 */
var app = angular
  .module('uneekioApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

  app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/blogPost', {
        templateUrl: 'views/blogPost.html',
        controller: 'BlogPostCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  }]);
