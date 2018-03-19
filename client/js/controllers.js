var CS126Controllers = angular.module("CS126Controllers", []);

/**
  Google auth controller
**/
CS126Controllers.controller("loginController", ["UserFactory", "$location", "$rootScope", "$scope",
function(UserFactory, $location, $rootScope, $scope) {
  $(".g-signin2").css("display", "block");
  if(window.localStorage['user'] !== "null") {
    $(".g-signin2").css("display", "none");
    $location.url('/welcome');
  }

  function onSignIn(user) {
    var profile = user.getBasicProfile();
    UserFactory.username = profile.getName();
    UserFactory.email = profile.getEmail();
    window.localStorage['user'] = profile.getId();
    $rootScope.gapi = gapi;
    $(".g-signin2").css("display", "none");
    $scope.$apply(function() { $location.url("/welcome"); });
  }

  window.onSignIn = onSignIn;
}]);

CS126Controllers.controller('welcomeController', ["$scope", "UserFactory", "StaffFactory", "$rootScope", "$location",
function($scope, UserFactory, StaffFactory, $rootScope, $location) {
  if(window.localStorage['user'] === "null") {
    $location.url("/login");
  }
  $scope.gmail = UserFactory;
  var user = UserFactory.email.split("@");
  StaffFactory.getStaff().then(function(staff) {
    //check if logged in w illinois a/c
    if(user[1] !== "illinois.edu") {
      $(".error").css("display", "block");
    } else if(!staff.includes(user[0])) {
        $(".staffError").css("display", "block");
    } else {

    }
  });

  //logout functionality
  $scope.logout = function() {
    var auth2 = $rootScope.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      $(".data").css("display", "none");
      window.localStorage['user'] = null;
      alert('You have been successfully signed out!');
      $scope.$apply(function() { $location.url("/login"); });
    });
  }
}]);
