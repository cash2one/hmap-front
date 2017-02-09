/**
 * Created by user on 2016/8/8.
 */

(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('AddHeaderService', AddHeaderService);

  AddHeaderService.$inject = ['$resource', '$http'];

  function AddHeaderService($resource, $http) {
    var service = {
      query : query,
      querySystemType : querySystemType
    };
    return service;

    function query() {
      var resourceUrl = '/api/addHeader';
      return $resource(resourceUrl, {}, {
        'query': {method: 'POST', isArray: false}
      });
    }

    function querySystemType(){
      var resourceUrl = '/api/queryAllHeader';
      return $resource(resourceUrl, {}, {
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

  }


})();
