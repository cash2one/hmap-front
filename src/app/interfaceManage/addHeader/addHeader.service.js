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
      addHeader: addHeader
    };
    return service;

    function addHeader(newHeader) {
      var resourceUrl = '/api/addHeader';
      var data = newHeader;

      return $http.post(resourceUrl, data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        console.log("测试post接口", angular.toJson(response));
        return response.data;
      });

    }


  }


})();
