var CS126Controllers = angular.module("CS126Controllers", []);

/**
  Google auth controller
**/
CS126Controllers.controller("loginController", ["$location", "$rootScope", "$scope",
function($location, $rootScope, $scope) {
  $(".g-signin2").css("display", "block");
  if(window.localStorage['user'] !== "null") {
    $(".g-signin2").css("display", "none");
    $location.url('/welcome');
  }

  function onSignIn(user) {
    var profile = user.getBasicProfile();
    window.localStorage['user'] = JSON.stringify({username: profile.getName(), email: profile.getEmail()});
    $(".g-signin2").css("display", "none");
    $scope.$apply(function() { $location.url("/welcome"); });
  }

  window.onSignIn = onSignIn;
}]);

CS126Controllers.controller('welcomeController', ["$scope", "StaffFactory", "$rootScope", "$location",
function($scope, StaffFactory, $rootScope, $location) {
  if(window.localStorage['user'] === "null") {
    $location.url("/login");
  }

  //logout functionality //TODO: put this on a navbar controller
  $scope.logout = function() {
    if (gapi.auth2) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      $(".data").css("display", "none");
      window.localStorage['user'] = null;
      alert('You have been successfully signed out!');
      $scope.$apply(function() { $location.url("/login"); });
    });
    } else {
      gapi.load('auth2', function () {
        var auth2 = gapi.auth2.init({
          client_id: '37283068779-tb1thdngrh4b09ucoeph7fa9pjtepulp.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });
        auth2.then(function() {
          auth2.signOut().then(function() {
            $(".data").css("display", "none");
            window.localStorage['user'] = null;
            alert('You have been successfully signed out!');
            $scope.$apply(function() { $location.url("/login"); });
          });
        });
      });
    }
  }

  var profile = JSON.parse(window.localStorage['user']);
  $scope.gmail = profile;
  var user = profile.email.split("@");
  //check if logged in w illinois a/c
  if(user[1] !== "illinois.edu") {
    $(".error").css("display", "block");
  } else {
    StaffFactory.getStaff().then(function(staff) {
      if(!staff.includes(user[0])) {
        $(".staffError").css("display", "block");
      } else {
        StaffFactory.getStaffById(user[0]).then(function(staff) {
          if(staff.data.length === 0) {
            $(".add-user").css("display", "block");
          } else {
            $(".valid").css("display", "block");
          }
        });
      }
    });
  }

}]);
