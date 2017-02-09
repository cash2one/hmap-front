/**
 * Created by xincai.zhang on 2016/8/12.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('RoleService', RoleService);

  RoleService.$inject = ['$resource'];

  function RoleService($resource) {
    var service = {
      findRoles: findRoles,
      updateRoles: updateRoles,
      addRole: addRole
    };
    return service;

    function findRoles() {
      var resourceUrl = '/api/role/query';
      return $resource(resourceUrl, {}, {
        'query': {method: 'POST'}
      });
    }

    function updateRoles() {
      var resourceUrl = '/api/role/update';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST'}
      });
    }

    function addRole() {
      var resourceUrl = '/api/role/insert';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST'}
      });
    }

    function getUserRole(){

    }
  }

})();
