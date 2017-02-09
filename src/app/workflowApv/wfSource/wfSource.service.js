/**
 * Created by hxm on 2016/9/21
 */
(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('WfSourceService',['$resource', function($resource){
      var service = {
        getWfSources: getWfSources,
        get:getWfSource,
        create:create,
        edit:edit,
        delete:deleteWfSource

      };
      return service;
      function getWfSources() {
        var resourceUrl ='/api/wecorpwfsource/query';
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
      function getWfSource() {
        var resourceUrl ='/api/wecorpwfsource/selectedById';
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
      function create(wfTemp){
        var resourceUrl ='/api/wecorpwfsource/insert';
        return $resource(resourceUrl, {}, {
          'save': {method: 'POST'}
        });
      }
      function edit(wfTemp){
        var resourceUrl ='/api/wecorpwfsource/update';
        return $resource(resourceUrl, {}, {
          'save': {method: 'POST'}
        });
      }
      function deleteWfSource(wfTemp){
        var resourceUrl ='/api/wecorpwfsource/delete';
        return $resource(resourceUrl, {}, {
          'delete': {method: 'POST'}
        });
      }
    }]);


})();
