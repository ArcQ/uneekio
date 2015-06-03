'use strict';

/**
 * @ngdoc function
 * @name uneekioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uneekioApp
 */
app.controller('CodeMainCtrl', function ($scope,$timeout,$location,$http,appConfig) {
    //initiate post
    $scope.defaultPath = appConfig.data.default_path;
    $scope.subDirectory = appConfig.data.sub_directory;

    $scope.post = {
      image: 'images/blogPosts/tempFull/5FVJ2PSHJS.jpg',title:'3 Compelling Reasons to Start Questioning Convention',description:'A memento from a recent grad'
    }; 

    $http.get('http://localhost:8000/uneekio/blogPost/')
    .success(function(data,status,headers,config){
      console.log(data);
    })
    .error(function(data,status,headers,config){
      console.log(data);
    });

    // $http.post('localhost:8000/uneekio/blogPost/',{})
    // .success(function(data,status,headers,config){
    //   console.log(data);
    // })
    // .error(function(data,status,headers,config){
    //   console.log(data);
    // });

  });
