/**
 * Created by xincai.zhang on 2016/8/12.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('AppAuthService', AppAuthService);

  AppAuthService.$inject = ['$resource', '$http'];

  function AppAuthService($resource,$http) {
    var service = {
      findAppAuth: findAppAuth,
      insertOrUpdateAppAuth: insertOrUpdateAppAuth,
      getAppAuth:getAppAuth,
      savePermissionData:savePermissionData,
      generateUUID:generateUUID,
      getPermissionData:getPermissionData
    };
    return service;

    function findAppAuth() {
      var resourceUrl = '/api/appauth/query';
      return $resource(resourceUrl, {}, {
        'query': {method: 'POST'}
      });
    }
    function savePermissionData(dataId) {
      var resourceUrl = '/api/applicationPermission/save?dataId='+dataId;
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST'}
      });
    }
    function getPermissionData() {
      var resourceUrl = '/api/applicationPermission/query/:id';
      return $resource(resourceUrl, {}, {
        'query': {method: 'GET', isArray: false}
      });
    }
    function getAppAuth() {
      var resourceUrl = '/api/appauth/:id';
      return $resource(resourceUrl, {}, {
        'query': {method: 'GET'}
      });
    }
    function insertOrUpdateAppAuth() {
      var resourceUrl = '/api/appauth/insertOrUpdate';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST'}
      });
    };

    function generateUUID() { //生成新的UUID
      var date = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    };

  }
})();
