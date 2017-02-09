/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('WfTempService',['$resource', function($resource){
      var service = {
        getWfTemps: getWfTemps,
        get:getWfTemp,
        create:create,
        edit:edit,
        delete:deleteWfTemp
      };
      return service;

      function getWfTemps() {
        var resourceUrl ='/api/wecorpwftemplate/query';
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
      function getWfTemp() {
        var resourceUrl ='/api/wecorpwftemplate/selectedById';
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
        var resourceUrl ='/api/wecorpwftemplate/insert';
        return $resource(resourceUrl, {}, {
          'save': {method: 'POST'}
        });
      }
      function edit(wfTemp){
        var resourceUrl ='/api/wecorpwftemplate/update';
        return $resource(resourceUrl, {}, {
          'save': {method: 'POST'}
        });
      }
      function deleteWfTemp(wfTemp){
        var resourceUrl ='/api/wecorpwftemplate/delete';
        return $resource(resourceUrl, {}, {
          'delete': {method: 'POST'}
        });
      }
    }]);


})();
