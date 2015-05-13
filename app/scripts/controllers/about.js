'use strict';

/**
 * @ngdoc function
 * @name uneekioApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the uneekioApp
 */
angular.module('uneekioApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
