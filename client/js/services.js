var CS126Services = angular.module('CS126Services', []);

CS126Services.factory('UserFactory', function() {
  return {
    username: "",
    email: ""
  };
});

CS126Services.factory('StaffFactory', function($http, $q) {
  return {
    getStaff : function() {
      return $http.get('/staff')
        .then(function(response) {
            if (typeof response.data === 'object') {
                return response.data;
            } else {
                // invalid response
                return $q.reject(response.data);
            }
        }, function(response) {
            // something went wrong
            return $q.reject(response.data);
        });
    }
  }
});
