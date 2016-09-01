/**
 * Created by user on 2016/8/23.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('TestService', TestService);

  TestService.$inject = ['$resource', '$http', '$state'];

  function TestService($resource, $http) {
    var service = {
      findHeaderAndLineByLine: findHeaderAndLineByLine,
      getParamsExample:getParamsExample,
      updateParamsExample:updateParamsExample

    };
    return service;

    function findHeaderAndLineByLine(line) {

      var resourceUrl = '/api/getHeaderAndLineByLineId';
      return $http.post(resourceUrl, line, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        console.log("find header,line" + angular.toJson(response.data));
        return response.data;
      })
    };

    function getParamsExample(example){
      var resourceUrl = '/api/getExample'
      return $http.post(resourceUrl,example, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        console.log("find example:" + angular.toJson(response.data));
        return response.data;
      })

    };

    function updateParamsExample(example){
      var resourceUrl = '/api/updateExample'
      return $http.post(resourceUrl,example, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        console.log("update example:" + angular.toJson(response.data));
        return response.data;
      })

    };


  }

})();
