/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('WfConditionTypeService',WfConditionTypeService);

  /** @ngInject */

  function WfConditionTypeService($resource){

      var service = {
        getWfConditionTypes: getWfConditionTypes,
        get:get,
        create:create,
        edit:edit,
        delete:deleteWfConditionType,
      };
      return service;
      function getWfConditionTypes() {
        var resourceUrl ='/api/wecorpwfcondition/query';
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
      function get() {
        var resourceUrl ='/api/wecorpwfcondition/selectedById';
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
      function create(wfConditionType){
        var resourceUrl ='/api/wecorpwfcondition/insert';
        return $resource(resourceUrl, {}, {
          'save': {method: 'POST'}
        });
      }
      function edit(wfConditionType){
        var resourceUrl ='/api/wecorpwfcondition/update';
        return $resource(resourceUrl, {}, {
          'save': {method: 'POST'}
        });
      }
      function deleteWfConditionType(wfConditionType){
        var resourceUrl ='/api/wecorpwfcondition/delete';
        return $resource(resourceUrl, {}, {
          'delete': {method: 'POST'}
        });
      }
    }


})();
