/**
 * Created by hxm on 2016/9/21
 */
(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('WecorpAgentListService',['$resource','$rootScope', function($resource,$rootScope){
      var selectedHeader = {};
      var selectedLine = {};
      var service = {
        getAgentList: getAgentList
      };
      return service;
      function getAgentList() {
        var resourceUrl ='/api/wecorpagent/query';
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
    }]);


})();
