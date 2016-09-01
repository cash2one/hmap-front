/**
 * Created by user on 2016/8/16.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('InterfaceListService', InterfaceListService);

  InterfaceListService.$inject = ['$resource', '$http', '$state'];

  function InterfaceListService($resource, $http) {
    var service = {
      findHeaderAndLine: findHeaderAndLine,

    };
    return service;

    function findHeaderAndLine(page,pagesize) {

      var resourceUrl = '/api/getAllHeaderAndLine';
      return $http.post(resourceUrl, {"page":page,"pagesize":pagesize}, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        console.log("000000" + angular.toJson(response.data));
        return response.data;
      })
    }


  }

})();
