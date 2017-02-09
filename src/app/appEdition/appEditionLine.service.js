(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('AppEditionLineService', AppEditionLineService);

  AppEditionLineService.$inject = ['$resource', '$http', '$state'];

  function AppEditionLineService ($resource, $http) {
    var service = {
      insertAppEditionLine: insertAppEditionLine,
      queryAppEditionLines:queryAppEditionLines,
      queryAppEditionLineById:queryAppEditionLineById,
      updateAppEditionLine:updateAppEditionLine,
      deleteAppEditionLine:deleteAppEditionLine
    };
    return service;

    function insertAppEditionLine(appEditionLine) {
      var resourceUrl = '/api/getAppEditionLine/insert';
      return $http.post(resourceUrl, appEditionLine, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        return response.data;
      });
    }

    function queryAppEditionLines(appEditionId,page,itemsPerPage){
      var resourceUrl = '/api/getAppEditionLine/queryByAppEditionId?appEditionId='+appEditionId+"&page="+page+"&pagesize="+itemsPerPage;
      return $http.get(resourceUrl, {}).then(function (response) {
        return response.data;
      });
    }
    function queryAppEditionLineById(id){
      var resourceUrl = '/api/getAppEditionLine/queryAppEditionLineById?id='+id;
      return $http.get(resourceUrl, {}).then(function (response) {
        return response.data;
      });
    }
    function updateAppEditionLine(appEditionLine){
      var resourceUrl = '/api/getAppEditionLine/update';
      return $http.post(resourceUrl, appEditionLine, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        return response.data;
      });
    }

    function deleteAppEditionLine(appEditionLine){
      var resourceUrl = '/api/getAppEditionLine/deleteAppEditionLineById';
      return $http.post(resourceUrl, appEditionLine, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        return response.data;
      });
    }
  }
})();
