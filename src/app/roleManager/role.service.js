/**
 * Created by xincai.zhang on 2016/8/12.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('RoleService', RoleService);

  RoleService.$inject = ['$resource', '$http'];

  function RoleService($resource, $http) {
    var service = {
      findRoles: findRoles,
      updateRoles: updateRoles,
      addRole: addRole
    };
    return service;

    function findRoles(role) {
      console.log("service  role:" + angular.toJson(role));
      var resourceUrl = '/api/sys/role/query';
      var data = {};
      for(var p in role){
        if(role[p]){
          data[p]=role[p];
        }
      }
      console.log("data is:",angular.toJson(data));
      return $http.post(resourceUrl, data, {
      }).then(function (response) {
        console.log("000000" + angular.toJson(response.data));
        return response.data;
      })
    }


    function updateRoles(role) {
      var resourceUrl = '/api/role/update';
      var data = role;
      console.log("service  role:" + angular.toJson(role));
      return $http.post(resourceUrl, data, {
      }).then(function (response) {
        return response.data;
      });
    };

    function addRole(role) {
      var resourceUrl = "/api/role/insert";
      console.log("insert role:" + angular.toJson(role));
      return $http.post(resourceUrl, role, {
      }).then(function (response) {
        return response.data;
      });
    }


  }

})();
