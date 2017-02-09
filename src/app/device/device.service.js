(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Device', Device);

  Device.$inject = ['$resource'];

  function Device ($resource) {
    var service = {
      selectByDeviceUser : selectByDeviceUser,
      updateByDeviceId : updateByDeviceId,
      getStatistic : getStatistic,
    };
    return service;

    function selectByDeviceUser(){
      var resourceUrl = '/api/device/query';
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
    };

    function updateByDeviceId(){
      var resourceUrl = '/api/device/update';
      return $resource(resourceUrl, {}, {
        'post': {
          method: 'POST',
          transformResponse: function (data) {
            if (data) {
              data = angular.fromJson(data);
            }
            return data;
          }
        }
      });
    };

    function getStatistic(){
      var resourceUrl = '/api/device/statistic';
      return $resource(resourceUrl, {}, {
        'query': { method: 'GET',isArray: false}
      });
    };
  }
})();
