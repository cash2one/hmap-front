/**
 * Created by zhouzy on 2016/8/15 0015.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .factory('urlInterceptor', urlInterceptor);

  urlInterceptor.$inject = ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage', 'BaseConfig'];

  //var backUrls = [
  //  "/api",
  //  "/oauth/token",
  //  "/metrics"
  //];

  function urlInterceptor($rootScope, $q, $location, $localStorage, $sessionStorage, BaseConfig) {
    var service = {
      request: request
    };

    return service;

    function request(config) {
      /*jshint camelcase: false */
      config.url = config.url || {};

      for (var i = 0; i < BaseConfig.backUrls.length; i++) {
        if (config.url.substr(0,BaseConfig.backUrls[i].length)==BaseConfig.backUrls[i]) {
          config.url = BaseConfig.url + config.url;
        }
      }
      return config;
    }
  }
})();
