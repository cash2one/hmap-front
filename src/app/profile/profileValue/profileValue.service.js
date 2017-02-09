/**
 * Created by Administrator on 2016/9/2.
 */
(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('ProfileValue', ProfileValue);

  ProfileValue.$inject = ['$resource'];

  function ProfileValue ($resource) {
    var resourceUrl = '/api/profileValue';

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
})();
