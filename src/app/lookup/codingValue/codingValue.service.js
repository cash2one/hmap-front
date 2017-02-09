/**
 * Created by user on 2016/8/10.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('CodingValueService', CodingValueService);

  CodingValueService.$inject = ['$resource', '$http', '$state'];

  function CodingValueService($resource, $http) {
    var service = {
      //findCodeValues: findCodeValues,
      findCodeValuesByCodeValue:findCodeValuesByCodeValue,
      updateCodeValue: updateCodeValue,
      addCodingValue: addCodingValue,
      deleteCodeValue:deleteCodeValue
    };
    return service;

  /*  function findCodeValues(code) {
      //console.log("service  code+++:" + angular.toJson(code));
      var resourceUrl = '/api/codeValue/getValuesByCode';
      var data = code;
      return $http.post(resourceUrl, data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        //console.log("000000" + angular.toJson(response.data));
        return response.data;
      })
    }*/

    function findCodeValuesByCodeValue(codeValue) {
      //console.log("service  code----:" + angular.toJson(codeValue));
      var resourceUrl = '/api/codeValue/getValues';
      var data = codeValue;
      return $http.post(resourceUrl, data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        //console.log("000000" + angular.toJson(response.data));
        return response.data;
      })
    }


    function updateCodeValue(codeValue) {

      var resourceUrl = '/api/codeValue/update';
      var data = codeValue;
      //console.log("service  codeValue:" + angular.toJson(data));
      return $http.post(resourceUrl, data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        return response.data;
      });

    };

    function addCodingValue(codeValue) {
      var resourceUrl = "/api/codeValue/insert";
      //console.log("insert codeValue:" + angular.toJson(codeValue));

      return $http.post(resourceUrl, codeValue, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        return response.data;
      });
    }

    function deleteCodeValue(codeValue){
      var resourceUrl = "/api/codeValue/delete";
      //console.log("delete codeValue:"+angular.toJson(codeValue));
      return $http.post(resourceUrl,codeValue,{
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function(response){
        return response.data;
      })
    }


  }

})();
