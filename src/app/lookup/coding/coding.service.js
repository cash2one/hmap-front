/**
 * Created by user on 2016/8/9.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('CodingService', CodingService);

  CodingService.$inject = ['$resource', '$http', '$state'];

  function CodingService($resource, $http) {
    var service = {
      findCodes: findCodes,
      updateCodes: updateCodes,
      addCoding: addCoding,
      deleteCode:deleteCode
    };
    return service;

    function findCodes(code,page,pagesize) {
      if(page==undefined){
        page = 1;
      }
      if(pagesize == undefined){
        pagesize = 10;
      }
      //console.log("service  code:" + angular.toJson(code));
      var resourceUrl = '/api/code/query?page='+page+'&pagesize='+pagesize;

      var data = code;
      //console.log("data params:"+angular.toJson(data));
      return $http.post(resourceUrl, data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        //console.log("000000" + angular.toJson(response.data));
        return response.data;
      })
    }


    function updateCodes(code) {

      var resourceUrl = '/api/code/update';
      var data = code;
      //console.log("service  code:" + angular.toJson(data));
      return $http.post(resourceUrl, data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        return response.data;
      });

    };

    function addCoding(code) {
      var resourceUrl = "/api/code/insert";
      //console.log("insert code:" + angular.toJson(code));

      return $http.post(resourceUrl, code, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        return response.data;

      });
    };

    function deleteCode(code){
      var resourceUrl = "/api/code/delete";
      //console.log("delete code:"+angular.toJson(code));
      return $http.post(resourceUrl,code ,{
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function(response){
        return response.data;
      })
    }



  }

})();
