/**
 * Created by hxm on 2016/9/21
 */
(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('WecorpAgentService',['$resource','$rootScope', function($resource,$rootScope){
      var selectedHeader = {};
      var selectedLine = {};
      var service = {
        getAgent: getAgent,
        create:create
      };
      return service;
      function getAgent() {
        var resourceUrl ='/api/wecorpagent/getByAgentid';
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

      function create(agent){
        var resourceUrl ='/api/wecorpagent/save';
        return $resource(resourceUrl, {}, {
          'save': {method: 'POST'}
        });
      }

    }]);


})();
