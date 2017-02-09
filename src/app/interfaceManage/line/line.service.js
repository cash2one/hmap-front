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
      getLine: getLine,
      insertLine:insertLine,
      updateLine:updateLine
    };
    return service;

    function getLine() {
      var resourceUrl = '/api/queryLine';
      return $resource(resourceUrl, {}, {
        'get': {method: 'POST'}
      });

    }

    function getLines(line) {
      //console.log("line params:" + angular.toJson(line));

      var resourceUrl = '/api/getLinesByHeaderId';

      return $http.post(resourceUrl, line, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        //console.log("获取Lines接口", angular.toJson(response));
        return response.data;
      });


    }

    function updateLine() {
      var resourceUrl = '/api/updateLine';
      return $resource(resourceUrl, {}, {
        'update': {method: 'POST'}
      });
    }
    function insertLine(){
      var resourceUrl = '/api/insertLine';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST', isArray: false}
      });
    }

  }

})();
