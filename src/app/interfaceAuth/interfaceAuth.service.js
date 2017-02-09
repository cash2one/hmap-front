/**
 * Created by Koma.Tshu on 2016/8/25.
 */
(function(){
  'use strict';
  angular.module('hmapFront')
    .factory('InterfaceAuthService', InterfaceAuthService);
  InterfaceAuthService.$inject = ['$resource','$http'];

  function InterfaceAuthService ($resource,$http) {
    var service = {
      selectAuthByHeaderId : selectAuthByHeaderId,
      selectAuthByLineId : selectAuthByLineId,
      selectAppName : selectAppName,
      saveInterfaceAuth : saveInterfaceAuth,
      deleteInterfaceAuth : deleteInterfaceAuth
    };
    return service;

    //根据headerId获取授权信息
    function selectAuthByHeaderId(InterfaceAuth){
      var resourceUrl ='/api/interfaceAuth/selectAuthByHeaderId';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }

    //根据lineId获取授权信息
    function selectAuthByLineId(){
      var resourceUrl ='/api/interfaceAuth/selectAuthByLineId';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }

    //查询所有应用名称
    function selectAppName(){
      var resourceUrl ='/api/interfaceAuth/selectAppNames';
      //return $http.post(resourceUrl, {
      //
      //}).then(function (response) {
      //  return response.data;
      //})
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }

    //新增描述
    function saveInterfaceAuth(){
      var resourceUrl ='/api/interfaceAuth/saveInterfaceAuth';
      //var data = InterfaceAuth;
      //return $http.post(resourceUrl,data, {
      //
      //}).then(function (response) {
      //  return response.data;
      //})
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }

    //删除描述
    function deleteInterfaceAuth(){
      var resourceUrl ='/api/interfaceAuth/deleteInterfaceAuth';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }
  }
})();
