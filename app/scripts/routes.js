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
  .when('/about', {
    templateUrl: 'views/essential/about.html'
  })
  .when('/contact', {
    templateUrl: 'views/essential/contact.html'
  })
  .when('/privacyPolicy', {
    templateUrl: 'views/essential/privacyPolicy.html'
  })
  .when('/termsAndConditions', {
    templateUrl: 'views/essential/termsConditions.html'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);