(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('DistributionService', DistributionService);

  DistributionService.$inject = ['$resource', '$http'];

  function DistributionService ($resource,$http) {
    var uploadApp={};
    var service = {
      queryApps: queryApps,
      getApp:getApp,
      getAppVersion:getAppVersion,
      getAppByRandomName:getAppByRandomName,
      saveApp:saveApp,
      saveAppVersion:saveAppVersion,
      saveEditApp:saveEditApp,
      editDownloadNum:editDownloadNum,
      viewEditDownloadNum:viewEditDownloadNum
    };
    return service;

    //查询所有app信息
    function queryApps(page,pageSize){
      var resourceUrl ='/api/appDistribution/queryApps?page='+page+'&pageSize='+pageSize;
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST',isArray:false}
      })
    }

    //根据appId查询头数据
    function getApp(){
      var resourceUrl ='/api/appDistribution/queryAppByAppId';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST',isArray:false}
      })
    }

    //根据appId查询行数据
    function getAppVersion(page,pageSize){
      var resourceUrl ='/api/appDistribution/queryAppVersionByAppId?page='+page+'&pageSize='+pageSize;
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST',isArray:false}
      })
    }

    //根据appVersionId查询下载数据
    function getAppByRandomName(){
      var resourceUrl ='/appDownload/queryAppByRandomName';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST',isArray:false}
      })
    }

    //新增App保存
    function saveApp(){
      var resourceUrl ='/api/appDistribution/saveApp';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST',isArray:false}
      })
    }

    //新增AppVersion保存
    function saveAppVersion(){
      var resourceUrl = '/api/appDistribution/saveAppVersion';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST',isArray:false}
      })
    }

    //编辑App保存
    function saveEditApp(){
      var resourceUrl = '/api/appDistribution/updateApp';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST',isArray:false}
      })
    }

    //下载页面增加下载次数
    function editDownloadNum(){
      var resourceUrl = '/appDownload/editDownloadNum';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST',isArray:false}
      })
    }

    //查看页面增加下载次数
    function viewEditDownloadNum(){
      var resourceUrl = '/api/appDistribution/editDownloadNum';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST',isArray:false}
      })
    }
  }
})();
