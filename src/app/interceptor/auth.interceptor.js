(function () {
  'use strict';

  angular
    .module('hmapFront')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage', 'BaseConfig'];

  //var backUrls = [
  //  "/api",
  //  "/oauth/token",
  //  "/metrics"
  //];

  function authInterceptor($rootScope, $q, $location, $localStorage, $sessionStorage, BaseConfig) {
    var service = {
      request: request
    };

    return service;

    function request(config) {
      /*jshint camelcase: false */
      config.headers = config.headers || {};
      config.url = config.url || {};


      for (var i = 0; i < BaseConfig.authenticatedUrls.length; i++) {
        if (config.url.substr(0,BaseConfig.authenticatedUrls[i].length)==BaseConfig.authenticatedUrls[i]) {

          var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
          if (token && token.expires_at && token.expires_at > new Date().getTime()) {
            config.headers.Authorization = 'Bearer ' + token.access_token;
            config.headers["Content-Type"]='application/json;charset=UTF-8';
            //config.headers["Content-Type"] = 'application/x-www-form-urlencoded';
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            console.log(config);
          }
        }
      }


      return config;
    }
  }
})();
