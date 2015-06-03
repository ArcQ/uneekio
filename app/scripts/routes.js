app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider, $location, appConfig) {
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
    controller : function(appConfig){
        window.location.href = appConfig.data.default_path +'codeJournal/';
    }, 
    template : "<div></div>"
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