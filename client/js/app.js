var app = angular.module("CS126", ["CS126Controllers", "ngRoute", "CS126Services"]);

app.config(["$routeProvider", function ($routeProvider) {
  // Setting up routes for various views
   $routeProvider.
   when('/login', {
     templateUrl: 'partials/login.html',
     controller: 'loginController'
   }).
   when('/welcome', {
    templateUrl: 'partials/welcome.html',
    controller: 'welcomeController',
    resolve: {
      loggedin: checkLoggedIn
    }
   }).
   otherwise({
     redirectTo: '/login'
   });
}]);

function checkLoggedIn($http, $location, $q) {
    var deferred = $q.defer();
    var user;
    if(window.localStorage['user']) user = window.localStorage['user'];

    if(user == "null") {
      window.localStorage['user'] = null;
      deferred.reject();
      $location.url('/login');
    } else {
      deferred.resolve();
    }
    return deferred.promise;
}
