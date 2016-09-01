(function () {
  'use strict';

  angular
    .module('hmapFront')
    .factory('AuthServerProvider', AuthServerProvider);

  AuthServerProvider.$inject = ['$http', '$localStorage'];

  function AuthServerProvider($http, $localStorage) {
    var service = {
      getToken: getToken,
      hasValidToken: hasValidToken,
      login: login,
      logout: logout
    };

    return service;

    function getToken() {
      var token = $localStorage.authenticationToken;
      return token;
    }

    function hasValidToken() {
      var token = this.getToken();
      return !!token;
    }

    function login(credentials) {
      //var data = 'userName=' + encodeURIComponent(credentials.username) +
      //  '&password=' + encodeURIComponent(credentials.password) +
      //  '&verifiCode=' + credentials.verifiCode;

      var data = 'client_id=client&client_secret=secret&grant_type=password'+'&username=' + encodeURIComponent(credentials.username) +
        '&password=' + encodeURIComponent(credentials.password);

      //var data ='&username=' + encodeURIComponent(credentials.username) +
      //  '&password=' + encodeURIComponent(credentials.password)+ '&verifiCode=' + encodeURIComponent(credentials.verifiCode);
      return $http.post('/oauth/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        //withCredentials:true
      }).success(function (response) {
        var expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + response.expires_in);
        response.expires_at = expiredAt.getTime();
        $localStorage.authenticationToken = response;

        console.log("authenticationToken:" + $localStorage.authenticationToken);
        return response;
      });
    }

    function logout () {
      $http.post('/api/logout').then(function() {
        delete $localStorage.authenticationToken;
      });
    }
  }
})();
