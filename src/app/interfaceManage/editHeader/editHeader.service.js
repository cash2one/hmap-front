/**
 * Created by user on 2016/8/4.
 */

(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('EditHeaderService', EditHeaderService);

  EditHeaderService.$inject = ['$resource', '$http'];

  function EditHeaderService($resource, $http) {
    var service = {
      query: query,
      querySystemType: querySystemType
    };
    return service;

    function query() {
      var resourceUrl = '/api/updateHeader';
      return $resource(resourceUrl, {}, {
        'query': {method: 'POST', isArray: false}
      });
    }

    function querySystemType(){
      var resourceUrl = '/api/queryAllHeader';
      return $resource(resourceUrl, {}, {
        'get': {
          method: 'GET',
          transformResponse: function (data) {
            if (data) {
              data = angular.fromJson(data);
            }
            return data;
          }
        }
      });
    }


    /* var service = {
     updateHeader : updateHeader
     };
     return service;

     function updateHeader(newHeader){
     var resourceUrl = '/api/updateHeader';
     var data = newHeader;
     //console.log("update header param:"+angular.toJson(data));

     return  $http.post(resourceUrl,data , {
     headers: {
     'Content-Type': 'application/json;charset=utf-8'
     }
     }).then(function (response) {
     //console.log("edit header接口", angular.toJson(response));
     return response.data;
     });

     }*/


  }


})();
