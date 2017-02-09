(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('localMaterialService', localMaterialService);

  localMaterialService.$inject = ['$resource','$http'];

  function localMaterialService($resource,$http) {
    var service = {
      moveGroup:moveGroup,
      deleteAttachment:deleteAttachment,
      modifyName:modifyName
    };
    return service;

    function moveGroup(data) {
      var resourceUrl = '/api/attachment/moveGroup';
      return $http.post(resourceUrl,data).then(function(response){
        //console.log("response: "+angular.toJson(response.data));
        return response.data;
      });
    }

    function deleteAttachment(data){
      var resourceUrl = '/api/attachment/deleteAttachment';
      return $http.post(resourceUrl,data).then(function(response){
        //console.log("response: "+angular.toJson(response.data));
        return response.data;
      });
    }

    function modifyName(data){
      var resourceUrl = '/api/attachment/modifyName';
      return $http.post(resourceUrl,data).then(function(response){
        //console.log("response: "+angular.toJson(response.data));
        return response.data;
      });
    }

  }
})();
