/**
 * Created by zhouzy on 2016/8/28 0028.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Resource', Resource);

  Resource.$inject = ['$resource'];

  function Resource ($resource) {
    var service={
      query:query,
      save:save
    };
    return service;

    function query(){
      var resourceUrl ='/api/resource/query';
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
      var resourceUrl ='/api/resource/save';
      return $resource(resourceUrl, {}, {
        'saveOrUpdate': {method: 'POST'}
      });
    }

  }
})();
