/**
 * Created by hxm on 2016/9/21
 */
(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('WecorpAgentCustomMenuService',['$resource','$rootScope', function($resource,$rootScope){
      var selectedHeader = {};
      var selectedLine = {};
      var service = {
        create:create,
        getMenuList:getMenuList,
        deleteMenuRecord:deleteMenuRecord,
        deleteReleaseMenu:deleteReleaseMenu
      };
      return service;

      function create(menu){
        var resourceUrl ='/api/wecorpcustommenu/save';
        return $resource(resourceUrl, {}, {
          'saveMenu': {method: 'POST'}
        });
      }
      function getMenuList() {
        var resourceUrl ='/api/wecorpcustommenu/getMenuList';
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

      function deleteMenuRecord(wfTemp){
        var resourceUrl ='/api/wecorpcustommenu/deleteMenuRecord';
        return $resource(resourceUrl, {}, {
          'delete': {method: 'POST'}
        });
      }

      function deleteReleaseMenu() {
        var resourceUrl ='/api/wecorpcustommenu/deleteMenu';
        return $resource(resourceUrl, {}, {
          'delete': {
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
