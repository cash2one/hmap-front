
(function(){
  'use strict';
  angular.module('hmapFront')
    .factory('MessageTemplateService', MessageTemplateService);
  MessageTemplateService.$inject = ['$resource','$http'];

  function MessageTemplateService ($resource,$http) {
    var service = {
      queryAll:queryAll,
      selectById:selectById,
      submitInfo:submitInfo
    };
    return service;

    function queryAll(){
      var resourceUrl = '/api/messageTemplate/query';
      return $resource(resourceUrl, {}, {
        'query': {method: 'GET'}
      });
    }

    function selectById(){
      var resourceUrl = '/api/messageTemplate/selectById';
      return $resource(resourceUrl, {}, {
        'query': {method: 'GET'}
      });
    }

    function submitInfo(){
      var resourceUrl = '/api/messageTemplate/save';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST'}
      });
    }
  }
})();
