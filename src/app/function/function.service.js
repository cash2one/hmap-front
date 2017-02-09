/**
 * Created by zhouzy on 2016/8/28 0028.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Function', Function);

  Function.$inject = ['$resource','$rootScope'];

  function Function ($resource,$rootScope) {
    var selectedFunction = {};
    var selectedEntry = {};
    var service ={
      query:query,
      save:saveOrUpdate,
      fetchResource:fetchResource,
      fetchNotResource:fetchNotResource,
      updateFunctionResource:updateFunctionResource,
      menu:menu,

      selectedFunction:selectedFunction,
      shareFunction:shareFunction,
      selectedEntry:selectedEntry,
      shareEntry:shareEntry,
      queryResource:queryResource
    }
    return service;

   function shareFunction(selectedParent){
       this.selectedFunction = selectedParent;
       $rootScope.$broadcast('handleSelectedFunction');
    }
    function shareEntry(selectedEntry){
      this.selectedEntry = selectedEntry;
      $rootScope.$broadcast('handleSelectedEntry');
    }

    function query(){
      var resourceUrl ='/api/function/query';
      return $resource(resourceUrl, {}, {
        'query': { method: 'GET',isArray:false},
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

    function fetchResource(){
      var resourceUrl ='/api/function/fetchResource';
      return $resource(resourceUrl, {}, {
        'query': { method: 'GET',isArray:false},
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
    function fetchNotResource(){
      var resourceUrl ='/api/function/fetchNotResource';
      return $resource(resourceUrl, {}, {
        'query': { method: 'GET',isArray:false},
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
    function updateFunctionResource(){
      var resourceUrl ='/api/function/updateFunctionResource';
      return $resource(resourceUrl, {}, {
        'saveOrUpdate': {method: 'POST'}
      });
    }
    function saveOrUpdate(){
      var resourceUrl ='/api/function/save';
      return $resource(resourceUrl, {}, {
        'saveOrUpdate': {method: 'POST'}
      });
    }
    function menu(){
      var resourceUrl ='/api/function/menus';
      return $resource(resourceUrl, {}, {
        'get': {method: 'GET'}
      });
    }
    function parentSelect(){

    }

    function queryResource(){
      var resourceUrl = '/api/resource/query';
      return $resource(resourceUrl,{},{
        'query':{ method: 'GET',isArray:false}
      })
    }
  }
})();
