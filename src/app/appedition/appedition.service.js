(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('AppEdition', AppEdition);

  AppEdition.$inject = ['$resource'];

  function AppEdition ($resource) {
    var resourceUrl = '/api/appEditionApp/:id';

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
