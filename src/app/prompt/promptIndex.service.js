(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('PromptService', PromptService);

  PromptService.$inject = ['$resource','$http'];

  function PromptService ($resource,$http) {
    //console.log("have come in servcie...");
    var service = {
      queryPrompts : queryPrompts,
      savePrompt : savePrompt,
      updatePrompt : updatePrompt,
      findByPromptId : findByPromptId,
      selectLang : selectLang
    };
    return service;

    //查询所有描述
    function queryPrompts(page,pageSize){
      //console.log("service page:" + page);
      //console.log("service pageSize:" + pageSize);
      var resourceUrl ='/api/prompt/queryPrompts?page='+page+'&pageSize='+pageSize;
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST',isArray:false}
      })
    }

    //新增描述
    function savePrompt(prompt){
      var resourceUrl ='/api/prompt/savePrompt';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }

    //编辑描述
    function updatePrompt(prompt){
      var resourceUrl ='/api/prompt/updatePrompt';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }

    //根据promptId查询对象
    function findByPromptId(){
      var resourceUrl ='/api/prompt/findByPromptId';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }

    //查询语言value
    function selectLang(){
      var resourceUrl ='/api/prompt/queryLang';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }
  }
})();
