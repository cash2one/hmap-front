(function() {
    'use strict';

    angular
        .module('hmapFront')
        .factory('Auth', Auth);

    Auth.$inject = ['$rootScope', '$state', '$sessionStorage', '$q','$uibModalStack', 'Principal',  'AuthServerProvider','Authority'];

    function Auth ($rootScope, $state, $sessionStorage, $q,$uibModalStack, Principal,AuthServerProvider,Authority) {
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
                //console.log("err");
                //console.log(err);
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

            function loginThen (data) {
              Principal.identity(true).then(function(account) {
                deferred.resolve(data);
              });
                return cb();
            }

            return deferred.promise;
        }

      function logout () {
        AuthServerProvider.logout();
        Principal.authenticate(null);
      }

      function authorize (force) {
        var url=$rootScope.toState.parent+$rootScope.toState.url;
        var authReturn = Principal.identity(force).then(authThen);
        console.log("url:"+url);
        if(url!='app/accessdenied'&&url!='app/login'){
          var authorityReturn = Principal.authorization(url).then(authorityThen);
        }

        return authReturn;

        function authThen (data) {
          var isAuthenticated = Principal.isAuthenticated();
          //console.log("isAuthenticated");
          //console.log(data);
          //console.log(isAuthenticated);

          if(isAuthenticated)
          {
            //storeuser into stograge
            $sessionStorage.user = data.rows[0];

          }
          else{
            //console.log("redirect to login");
            $state.go('login');
          }
        }


        function authorityThen(data){
          if(!data){
            //$uibModalStack.dismissAll();
            //$state.go('accessdenied');
            //$state.go('accessdenied');

            //$state.go('login');
          }
        }
      }
    }
})();
