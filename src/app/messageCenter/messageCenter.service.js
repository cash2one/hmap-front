/**
 * Created by Koma.Tshu on 2016/8/25.
 */
(function(){
  'use strict';
  angular.module('hmapFront')
    .factory('MessageCenterService', MessageCenterService);
  MessageCenterService.$inject = ['$resource','$http'];

  function MessageCenterService ($resource,$http) {
    var service = {
      sendMessage:sendMessage,
      queryMessageTemplate:queryMessageTemplate
    };
    return service;

    function sendMessage(){
      var resourceUrl ='/api/messageCenter/sendMessage';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }

    function queryMessageTemplate(){
      var resourceUrl ='/api/messageTemplate/queryAll';
      return $resource(resourceUrl,{}, {
        'query': {method: 'GET'}
      })
    }
  }
})();
