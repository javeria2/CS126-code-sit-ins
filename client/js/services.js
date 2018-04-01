var CS126Services = angular.module('CS126Services', []);

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
    },
    addStaff : function(data) {
      var baseUrl = '/api/staff' + data.netid;
      return $http.post(baseUrl, data)
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
    },
    getStaffById : function(id) {
      return $http.get('/api/staff/' + id)
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
