/**
 * Created by zhouzy on 2016/9/1 0001.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Authority', Authority);

  Authority.$inject = ['$resource'];

  function Authority ($resource) {
    var service={
      query:query,
      save:save,
      queryUserRoles:queryUserRoles,
      validateUrl:validateUrl
    };
    return service;

    function query(){
      var resourceUrl ='/api/rolefunction/query';
      return $resource(resourceUrl, {}, {
        'query': { method: 'GET',isArray:false},
        'get': {
          method: 'GET',
          transformResponse: function (data) {
            if (data) {
              data = angular.fromJson(data);
            }
            return data;
          }
        },
        'update': {method: 'PUT'}
      });
    }

    function save(){
      var resourceUrl ='/api/rolefunction/save';
      return $resource(resourceUrl, {}, {
        'saveOrUpdate': {method: 'POST'}
      });
    }

    function queryUserRoles(){
      var resourceUrl ='/api/userrole/queryUserRoles';
      return $resource(resourceUrl, {}, {
        'get': {method: 'GET'}
      });
    }
    function validateUrl(){
      var resourceUrl ='/api/authority';
      return $resource(resourceUrl, {}, {
        'query': {method: 'POST'}
      });
    }
  }
})();
