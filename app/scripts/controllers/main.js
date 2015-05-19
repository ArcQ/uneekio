'use strict';

/**
 * @ngdoc function
 * @name uneekioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uneekioApp
 */
app.controller('MainCtrl', function ($scope,$timeout) {
  	// Slider Functionality
  	// Create a slider dictionary
    $scope.slides = [
    	{image: 'images/blogPosts/temp/5FVJ2PSHJS.jpg',title:'10 Reasons Why This Title Works',description:''},
    	{image: 'images/blogPosts/temp/EKVFZ0A22C.jpg',title:'Fake Title of a Lifetime',description:'Journey and discover the great points of life and the fakeness of this title.'}
    ]; 

    $scope.posts = [
    	{image: 'images/blogPosts/temp/5FVJ2PSHJS.jpg',title:'10 Reasons Why This Title Works',description:''},
    	{image: 'images/blogPosts/temp/EKVFZ0A22C.jpg',title:'Fake Title of a Lifetime',description:'Journey and discover the great points of life and the fakeness of this title.'}
    ]; 

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
    $scope.posts = [{},{}]

  })
  .animation('.slide', function($window){
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
