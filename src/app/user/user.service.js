(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('User', User);

  User.$inject = ['$resource'];

  function User ($resource) {
    var resourceUrl = '/api/user/';

    return $resource(resourceUrl, {}, {
      'query': { method: 'GET',isArray: false,url:resourceUrl+':id'},
      'get': {
        method: 'GET',
        url:resourceUrl+':id',
        transformResponse: function (data) {
          if (data) {
            data = angular.fromJson(data);
          }
          return data;
        }
      },
      'getByName': {
        method: 'GET',
        url:resourceUrl+'queryByName/:name',
        transformResponse: function (data) {
          if (data) {
            data = angular.fromJson(data);
          }
          return data;
        }
      },
      'update': { method:'PUT',url:resourceUrl+':id' }
    });
  }
})();
