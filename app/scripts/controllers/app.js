'use strict';

/**
 * @ngdoc function
 * @name uneekioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uneekioApp
 */
app.controller('AppCtrl', function ($scope,$timeout,$http,appConfig) {
  $scope.defaultPath = appConfig.data.default_path;
  $scope.subDirectory = appConfig.data.sub_directory;


});