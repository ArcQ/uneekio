'use strict';

/**
 * @ngdoc function
 * @name uneekioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uneekioApp
 */
app.controller('AppCtrl', function ($scope,$timeout,$http,appConfig,loadStatus) {
  $scope.loadStatus = loadStatus;
  
  $scope.defaultPath = appConfig.data.default_path;
  $scope.subDirectory = appConfig.data.sub_directory;
  $scope.apiPath = appConfig.data.default_api;

  $scope.saveEmail = function(){
      if($scope.subEmail.length>2){

        $scope.loadStatus.start();
        var emailData = {
                          "email": $scope.subEmail,
                        };

        $http.post($scope.apiPath + 'uneekio/email/', emailData)
          .success(function(data,status,headers,config){
            setTimeout(function () {
                $scope.$apply(function() {
                  $scope.loadStatus.success("Thanks for Subscribing!");

                })
            }, 1000);
            setTimeout(function () {
                $scope.$apply(function() {
                  $scope.loadStatus.isShow = false;
                })
            }, 4000);
          })
          .error(function(data,status,headers,config){
            alert("Our service is currently down, we're looking into it and will get it back up soon!");
          }
        );

      }
      else{

        alert("Please enter your email in the space provided!");

      }
      
    }

}).run(function($rootScope, $location, $routeParams, $window){
    $rootScope.$on('$routeChangeSuccess', function() {
        var output=$location.path()+"?";
        angular.forEach($routeParams,function(value,key){
            output+=key+"="+value+"&";
        })
        output=output.substr(0,output.length-1);
        console.log(output);
        $window._gaq.push(['_trackPageView', output]);
    });
});
