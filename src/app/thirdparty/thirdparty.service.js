(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Thirdparty', Thirdparty);

  Thirdparty.$inject = ['$resource'];

  function Thirdparty ($resource) {
    var resourceUrl ='/api/thirdpartyApp/:id';

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
