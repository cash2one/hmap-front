/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('LineService', LineService);

  LineService.$inject = ['$resource', '$http', '$state'];

  function LineService($resource, $http) {
    var service = {
      getLines: getLines,
      getHeaderByHeaderId:getHeaderByHeaderId
    };
    return service;


    function getHeaderByHeaderId(header){
      var resourceUrl = '/api/getHeaderByHeaderId';

      var data = header;
      console.log("header params:"+angular.toJson(data));

      return $http.post(resourceUrl, data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        console.log("获取header接口", angular.toJson(response));
        return response.data;
      });
    }

    function getLines(line) {
      console.log("line params:" + angular.toJson(line));

      var resourceUrl = '/api/getLinesByHeaderId';

      return $http.post(resourceUrl, line, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        console.log("获取Lines接口", angular.toJson(response));
        return response.data;
      });


    }

  }

})();
