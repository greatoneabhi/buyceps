(function() {
  'use strict';

  angular.module('sampleApp')
    .controller('loginController', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window) {
      console.log("loginController");

      var loginCtrl = this;
      loginCtrl.alert = null;

      loginCtrl.submit = function() {
        console.log("login user: ", loginCtrl.login);
        $http.post('/api/authenticate', loginCtrl.login)
          .then(function(response) {
            if (response.data.isAdmin) {
              $window.localStorage.setItem('auth_token', response.data.token);
              $http.defaults.headers.common['x-access-token'] = response.data.token;
              $state.go('admin.users');
            } else {
              console.log("end user logged in success");
              $window.localStorage.setItem('auth_token', response.data.token);
              $http.defaults.headers.common['x-access-token'] = response.data.token;
              $state.go('app.home');
            }
          }).catch(function(err) {
            console.log("console error: ", err.data.message);
            loginCtrl.alert = {
              type: 'danger',
              msg: err.data.message
            };
          });
      };

    }]);
})();