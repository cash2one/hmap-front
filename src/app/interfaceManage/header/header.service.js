/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('HeaderService', HeaderService);

  HeaderService.$inject = ['$http', '$resource'];

  function HeaderService($http, $resource) {

    var service = {
      queryAll: queryAll,
      update: update,
      add:add,
      query:query,
      syncMock:syncMock
    };
    return service;

    function queryAll() {
    var resourceUrl = '/api/queryAllHeader';
    return $resource(resourceUrl, {}, {
      'query': {method: 'POST', isArray: false},
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
    function update() {
      var resourceUrl = '/api/updateHeader';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST', isArray: false}
      });
    }

    function add() {
      var resourceUrl = '/api/addHeader';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST', isArray: false}
      });
    }

    function query(){
      var resourceUrl = '/api/getHeaderByHeaderId';
      return $resource(resourceUrl, {}, {
        'query': {method: 'POST', isArray: false}
      });
    }
    function syncMock(){
      var resourceUrl = '/api/syncMockConfig';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST', isArray: false}
      });
    }
  }


})();
