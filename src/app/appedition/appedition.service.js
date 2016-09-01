(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Appedition', Appedition);

  Appedition.$inject = ['$resource'];

  function Appedition ($resource) {
    var resourceUrl = '/api/appeditionApp/:id';

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
