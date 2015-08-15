app.config(['$routeProvider', '$locationProvider', '$httpProvider','$provide', function($routeProvider, $locationProvider, $httpProvider, $provide, $location, appConfig) {
$provide.decorator('$sniffer', function($delegate) {
  $delegate.history = false;
  return $delegate;
});
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
    //codeJournal is a seperate angular app because of future plans to seperate the two products
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
  .when('/aboutUneek', {
    templateUrl: 'views/essential/about.html'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true).hashPrefix("!");
}]);