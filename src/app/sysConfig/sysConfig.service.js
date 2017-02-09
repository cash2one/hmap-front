/**
 * Created by zhouzy on 2016/8/18 0018.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('SysConfig', SysConfig);

  SysConfig.$inject = ['$resource'];

  function SysConfig($resource) {
    var service = {
      query: query,
      saveOrUpdate: saveOrUpdate
    };
    return service;

    function query() {
      var resourceUrl = '/api/sysConfig/query';
      return $resource(resourceUrl, {}, {
        'query': {method: 'GET'}
      });
    }

    function saveOrUpdate() {
      var resourceUrl = '/api/sysConfig/saveOrUpdate';
      return $resource(resourceUrl, {}, {
        'saveOrUpdate': {method: 'POST'}
      });
    }

  }
})();
