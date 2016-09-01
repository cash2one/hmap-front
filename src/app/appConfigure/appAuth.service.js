/**
 * Created by xincai.zhang on 2016/8/12.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('AppAuthService', AppAuthService);

  AppAuthService.$inject = ['$resource', '$http'];

  function AppAuthService($resource, $http) {
    var service = {
      findAppAuth: findAppAuth,
      updateAppAuth: updateAppAuth,
      addAppAuth: addAppAuth,
      generateUUID:generateUUID
    };
    return service;

    function findAppAuth(hmsAppAuth,page,pagesize) {
      console.log("service  hmsAppAuth#########:" + angular.toJson(hmsAppAuth));
      var resourceUrl = '/api/appauth/query?page='+page+'&pagesize='+pagesize;
      var data = {};
      for(var p in hmsAppAuth){
         if(hmsAppAuth[p]){
           data[p]=hmsAppAuth[p];
         }
      }
      return $http.post(resourceUrl, data, {
      }).then(function (response) {
        console.log("000000" + angular.toJson(response.data));
        return response.data;
      })
    }

    function addAppAuth(hmsAppAuth) {
      var resourceUrl = "/api/hmsappauth/insert";
      console.log("insert hmsAppAuth:" + angular.toJson(hmsAppAuth));
      return $http.post(resourceUrl, hmsAppAuth, {
      }).then(function (response) {
        return response.data;

      });
    }

    function updateAppAuth(hmsAppAuth) {
      var resourceUrl = '/api/hmsappauth/update';
      var data = hmsAppAuth;
      console.log("service  hmsAppAuth:" + angular.toJson(hmsAppAuth));
      return $http.post(resourceUrl, data, {
      }).then(function (response) {
        return response.data;
      });
    };

    function generateUUID() { //生成新的UUID
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    };

  }
})();
