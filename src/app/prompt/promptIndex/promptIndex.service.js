(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('PromptService', PromptService);

  PromptService.$inject = ['$q','$http'];

  function PromptService ($q,$http) {
    console.log("have come in servcie...");
    var service = {
      queryPrompts : queryPrompts,
      savePrompt : savePrompt,
      updatePrompt : updatePrompt,
      findByPromptId : findByPromptId,
      selectLang : selectLang
    };
    return service;

    //查询所有描述
    function queryPrompts(page,pagesize){
      console.log("service page:" + page);
      console.log("service pageSize:" + pagesize);
      var resourceUrl ='/api/prompt/queryPrompts';
      var data = {
        page:page,
        pagesize:pagesize
      };
      return $http.post(resourceUrl,data, {

      }).then(function (response) {
        return response.data;
      })
    }

    //新增描述
    function savePrompt(prompt){
      var resourceUrl ='/api/prompt/savePrompt';
      var data = prompt;
      return $http.post(resourceUrl,data, {

      }).then(function (response) {
        return response.data;
      })
    }

    //编辑描述
    function updatePrompt(prompt){
      var resourceUrl ='/api/prompt/updatePrompt';
      var data = prompt;
      return $http.post(resourceUrl,data, {

      }).then(function (response) {
        return response.data;
      })
    }

    //根据promptId查询对象
    function findByPromptId(promptId){
      var resourceUrl ='/api/prompt/findByPromptId';
      var data = {
        promptId:promptId
      };
      return $http.post(resourceUrl,data, {

      }).then(function (response) {
        console.log("findById response:" + response.data);
        return response.data;
      })
    }

    //查询语言value
    function selectLang(){
      var resourceUrl ='/api/prompt/queryLang';
      return $http.post(resourceUrl, {

      }).then(function (response) {
        return response.data;
      })
    }
  }
})();
