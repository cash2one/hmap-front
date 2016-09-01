(function() {
    'use strict';

    angular
        .module('hmapFront')
        .factory('Auth', Auth);

    Auth.$inject = ['$rootScope', '$state', '$sessionStorage', '$q', 'Principal',  'AuthServerProvider'];

    function Auth ($rootScope, $state, $sessionStorage, $q, Principal,AuthServerProvider) {
        var service = {
          authorize: authorize,
          login: login,
          logout:logout

            //activateAccount: activateAccount,
            //authorize: authorize,
            //changePassword: changePassword,
            //createAccount: createAccount,
            //getPreviousState: getPreviousState,
            //logout: logout,
            //resetPasswordFinish: resetPasswordFinish,
            //resetPasswordInit: resetPasswordInit,
            //resetPreviousState: resetPreviousState,
            //storePreviousState: storePreviousState,
            //updateAccount: updateAccount
        };

        return service;


        function login (credentials, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            AuthServerProvider.login(credentials)
                .then(loginThen)
                .catch(function (err) {
                this.logout();
                console.log("err");
                console.log(err);
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

            function loginThen (data) {
                deferred.resolve(data);
                return cb();
            }

            return deferred.promise;
        }

      function logout () {
        AuthServerProvider.logout();
        Principal.authenticate(null);
      }

      function authorize (force) {
        var authReturn = Principal.identity(force).then(authThen);

        return authReturn;

        function authThen () {
          var isAuthenticated = Principal.isAuthenticated();
          if(isAuthenticated)
          {
            console.log("go main");
          }
          else{
            console.log("redirect to login");
            $state.go('login');
          }
        }
      }
    }
})();
