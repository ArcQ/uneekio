'use strict';

/**
 * @ngdoc function
 * @name uneekioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uneekioApp
 */
app.controller('BlogPostCtrl', function ($scope,$timeout,$location,$http,appConfig) {
    //initiate post
    var blogTitle = $location.search().title;
    //NEED if id doesn't exist, need to redirect to 404
    $scope.basePath = appConfig.data.default_path;
    $scope.apiPath = appConfig.data.default_api;

    $http.get($scope.apiPath + 'uneekio/blogPost/'+blogTitle)
    .success(function(data,status,headers,config){
        console.log(data);
        $scope.post = {};
        $scope.post.image = 'images/blogPosts/'+data.blogId+'/post_img.jpg';
        $scope.post.title = data.title.replace(/_/g,' ');
        $scope.post.description = data.description;
        $scope.post.url = $scope.basePath + 'blogPost?='+data._id;
        $scope.post.blogId = data.blogId;
        $scope.post.contentUrl = 'blogPosts/'+data.blogId+'.html';
    })
    .error(function(data,status,headers,config){
      console.log(data);
    });

    

  });
