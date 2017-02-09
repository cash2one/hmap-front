/**
 * Created by Administrator on 2016/9/7.
 */
(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Application', Application);

  Application.$inject = ['$resource','$http'];

  function Application ($resource,$http) {
    var service = {
      getToken1: getToken,
      getList: getList,
      getDetail: getDetail,
      saveAgent: saveAgent,
      getMediaId: getMediaId
    };
    return service;

    function getToken() {
      var resourceUrl = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wxab06537b97cdf28a&corpsecret=zNsVuRRpCwKNAR8zD2Ch6draiAvhVd6ZGWSahT2gd4iEdFn5K4UBN7tFdA_N64uj';

      return $http.get(resourceUrl, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        //console.log("000000" + angular.toJson(response.data));
        return response.data.access_token;
      })
    }

    function getList(token) {
      var resourceUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/list?access_token='+token;
      //console.log(resourceUrl);
      return $http.get(resourceUrl, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        //console.log("000000" + angular.toJson(response.data.agentlist));
        return response.data.agentlist;
      })
    }

    function getDetail(token,agentid) {
      var resourceUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/get?access_token='+token+'&agentid='+agentid;
      return $http.get(resourceUrl, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        //console.log("000000" + angular.toJson(response.data.agentlist));
        return response.data;
      })
    }
    function saveAgent(token,agent) {
      var resourceUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/set?access_token='+token;
      var data = agent;
      //console.log("000000" + angular.toJson(data));
      return $http.post(resourceUrl,data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        return response.data;
      })
    }

    function getMediaId(token,file) {
      var resourceUrl = 'https://qyapi.weixin.qq.com/cgi-bin/material/add_material?access_token='+token+'&type=image';
      return $http.post(resourceUrl,file, {
        headers: {
          'Content-Type': undefined
        }
      }).then(function (response) {
        return response.data;
      })
    }

  }
})();
