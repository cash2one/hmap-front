(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('User', User);

  User.$inject = ['$resource'];

  function User ($resource) {
    var resourceUrl = '/api/user/:id';

    return $resource(resourceUrl, {}, {
      'query': { method: 'GET',isArray: false},
      'get': {
        method: 'GET',
        transformResponse: function (data) {
          if (data) {
            data = angular.fromJson(data);
          }
          return data;
        }
      },
      'update': { method:'PUT' }
    });
  }
})();
