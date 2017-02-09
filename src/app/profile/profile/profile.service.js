(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Profile', Profile);

  Profile.$inject = ['$resource'];

  function Profile ($resource) {
    var resourceUrl = '/api/profile/:id';

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
