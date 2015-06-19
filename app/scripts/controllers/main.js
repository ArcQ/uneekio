'use strict';

/**
 * @ngdoc function
 * @name uneekioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uneekioApp
 */
app.controller('MainCtrl', function ($scope,$timeout,$http,appConfig) {

    $scope.basePath = appConfig.data.default_path;
    $scope.apiPath = appConfig.data.default_api;

    console.log($scope.apiPath)
    initController(); 
    //Init Controller
    function initController(){

       $http.get($scope.apiPath + 'uneekio/blogPost/')
        .success(function(data,status,headers,config){
          $scope.blogPosts = data;
          console.log($scope.blogPosts);
          // Slider Functionality
          // Create a slider dictionary
          $scope.slides = [];
          for(var i in $scope.blogPosts){
            $scope.slides[i] ={};
            $scope.slides[i].image = 'images/blogPosts/'+$scope.blogPosts[i].blogId+'/featured_img.jpg';
            $scope.slides[i].title = $scope.blogPosts[i].title.replace(/_/g,' ');
            $scope.slides[i].description = $scope.blogPosts[i].description;
            $scope.slides[i].url = $scope.basePath + 'blogPost?title='+$scope.blogPosts[i].title;

          }
          $scope.posts = [];
          for(var i in $scope.blogPosts){
            $scope.posts[i] ={};
            $scope.posts[i].image = 'images/blogPosts/'+$scope.blogPosts[i].blogId+'/small_img.jpg';
            $scope.posts[i].title = $scope.blogPosts[i].title.replace(/_/g,' ');
            $scope.posts[i].description = $scope.blogPosts[i].description;
            $scope.posts[i].url = $scope.basePath + 'blogPost?title='+$scope.blogPosts[i].title;

            $scope.posts[i].tags = [];

            for(var j in $scope.blogPosts[i].tag){
              $scope.posts[i].tags[j] = $scope.blogPosts[i].tag[j];
            }

          }
        })
        .error(function(data,status,headers,config){
          console.log(data);
        });

    }

    $scope.setCurrentSlideIndex = function(index){
    	$scope.currentIndex = index;
    	$timeout.cancel(bannerTimeout);
    	bannerTimeout = $timeout($scope.nextSlide, timeoutDuration);
    };

    $scope.isCurrentSlideIndex = function(index){
    	return $scope.currentIndex === index;
    };

    $scope.prevSlide = function(){
    	$scope.currentIndex = ($scope.currentIndex < $scope.slides.length -1) ? ++ $scope.currentIndex :0;
    	$timeout.cancel(bannerTimeout);
    	bannerTimeout = $timeout($scope.nextSlide, timeoutDuration);
    }

    $scope.nextSlide = function(){
    	$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length -1;
    	$timeout.cancel(bannerTimeout);
    	bannerTimeout = $timeout($scope.nextSlide, timeoutDuration);
    }

    // Initiate the memory variable of the slider
    $scope.currentIndex = 0;
    var timeoutDuration = 7000;
    var bannerTimeout = $timeout($scope.nextSlide, timeoutDuration);

    // Posts Functionality
    $scope.tagFilter = "Outside The Box";

    //stickynav
    $scope.isBlogNavFixed = false;


  }).directive("stickyNav", function stickyNav($window){  
  function stickyNavLink(scope, element){
    var w = angular.element($window),
        de = document.documentElement,
        box = element[0].getBoundingClientRect(),
        offset = box.top + window.pageYOffset - de.clientTop,
        left = box.left + window.pageXOffset - de.clientLeft,
        top = 0;

    function toggleStickyNav(){
      if(!element.hasClass('controls-fixed') && $window.pageYOffset > top + offset){
        element.addClass('controls-fixed');
        scope.$apply(function(){
          scope.$parent.isBlogNavFixed = true;
        });

      } 
      else if(element.hasClass('controls-fixed') && $window.pageYOffset <= top + offset){
        element.removeClass('controls-fixed');
        scope.$apply(function(){
          scope.$parent.isBlogNavFixed = false;
        });

      }
    }

    w.bind('resize', function stickyNavResize(){
      element.removeClass('controls-fixed');
      box = element[0].getBoundingClientRect(),
      offset = box.top + window.pageYOffset - de.clientTop,
      left = box.left + window.pageXOffset - de.clientLeft,
      toggleStickyNav();
    });
    w.bind('scroll', toggleStickyNav);
  }

  return {
    scope: {},
    restrict: 'A',
    link: stickyNavLink
  };
}).animation('.slide', function($window){
  	return {
  		addClass: function(element, className, done){
	  			if (className == 'ng-hide') {
	  				console.log($window.innerWidth);
	  				var width = $window.innerWidth;
	  				TweenMax.to(element, 0.8 , {autoAlpha: 0, onComplete: done});
	  			}
	  			else{
	  				done();
	  			}
  			},
  		removeClass: function (element, className, done){
  			if (className == 'ng-hide'){
  				element.removeClass('ng-hide');
  				var width = $window.innerWidth;
  				TweenMax.set(element, {autoAlpha: 0});
  				TweenMax.to(element,0.8, {autoAlpha:1, onComplete:done});
  			}
  			else{
  				done();
  			}
  		}
  	};
  })
  ;
