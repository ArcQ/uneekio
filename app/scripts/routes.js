app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider, appConfig) {
$routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/blogPost', {
    templateUrl: 'views/blogPost.html',
    controller: 'BlogPostCtrl'
  })
  .when('/codeJournal', {
    templateUrl: 'views/codeMain.html',
    controller: 'codeMainCtrl'
  })
  .when('/codeJournal/post', {
    templateUrl: 'views/codePost.html',
    controller: 'codePostCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);