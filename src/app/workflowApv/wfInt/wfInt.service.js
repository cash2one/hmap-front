/**
 * Created by hxm on 2016/9/21
 */
(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('WfIntService',WfIntService);

  WfIntService.$inject = ['$resource'];

    function WfIntService($resource){

      var service = {
        getWfInts: getWfInts
      }
      return service;

      function getWfInts() {
        var resourceUrl ='/api/wecorpwfinstanceinterface/query';
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


    };


})();
