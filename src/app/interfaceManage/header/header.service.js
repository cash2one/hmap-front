/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('HeaderService', HeaderService);

  HeaderService.$inject = ['$http'];

  function HeaderService($http) {

    var service = {
      getHeaders: getHeaders
    };
    return service;

    function getHeaders(header) {
      var resourceUrl = '/api/queryAllHeader';

      console.log("header param:" + angular.toJson(header));

      return $http.post(resourceUrl, header, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        return response.data;
      });


    }


  }


})();
