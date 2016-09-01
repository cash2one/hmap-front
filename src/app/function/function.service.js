/**
 * Created by zhouzy on 2016/8/28 0028.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Function', Function);

  Function.$inject = ['$resource'];

  function Function ($resource) {
    var service ={
      query:query,
      fetchResource:fetchResource,
      fetchNotResource:fetchNotResource,
      updateFunctionResource:updateFunctionResource
    }
    return service;


    function query(){
      var resourceUrl ='/api/function/query';
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
        }
      });
    }

    function fetchResource(){
      var resourceUrl ='/api/function/fetchResource';
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
        }
      });
    }
    function fetchNotResource(){
      var resourceUrl ='/api/function/fetchNotResource';
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
        }
      });
    }
    function updateFunctionResource(){
      var resourceUrl ='/api/function/updateFunctionResource';
      return $resource(resourceUrl, {}, {
        'saveOrUpdate': {method: 'POST'}
      });
    }
  }
})();
