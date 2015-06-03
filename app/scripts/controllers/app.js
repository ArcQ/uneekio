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


}).run(function($rootScope, $location, $routeParams, $window){
    $rootScope.$on('$routeChangeSuccess', function() {
        var output=$location.path()+"?";
        angular.forEach($routeParams,function(value,key){
            output+=key+"="+value+"&";
        })
        output=output.substr(0,output.length-1);
        $window._gaq.push(['_trackPageView', output]);
    });
});
