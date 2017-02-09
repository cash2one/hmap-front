/**
 * Created by Koma.Tshu on 2016/8/9.
 */
(function () {
  'use strict';

  angular.module("hmapFront").controller("PromptIndexController", PromptIndexController);

  PromptIndexController.$inject = ['$state', 'PromptService','entity', 'paginationConstants'];

  function PromptIndexController($state, PromptService,entity, paginationConstants) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.searchPrompt = entity;

    vm.loadAll(vm.searchPrompt,vm.page,vm.itemsPerPage);


    function selectLang(){
      return PromptService.selectLang().query(onLangSuccess,onError);
    }

    function onLangSuccess(data){
      vm.langValue = data.rows;
    }

    function loadAll(searchPrompt,page,pageSize) {
      selectLang();
      //console.log("savePage:" + vm.page);
      return PromptService.queryPrompts(page,pageSize).query(searchPrompt,onSearchSuccess, onError);
    }
    function onSearchSuccess(data) {
      //console.log('onSuccess');
      //console.log(data);
      vm.prompts = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      //console.log('error');
    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      //console.log('Page changed to: ' + vm.page);
      loadAll(vm.searchPrompt,vm.page,vm.itemsPerPage);
    }

    vm.search = function(){
      vm.page = 1;
      vm.itemsPerPage = paginationConstants.itemsPerPage;
      //console.log("searchPrompt:" + vm.searchPrompt.promptCode);
      loadAll(vm.searchPrompt,vm.page,vm.itemsPerPage);
    };

    vm.clear = function () {
      vm.searchPrompt.promptCode = null;
      vm.searchPrompt.lang = null;
      vm.searchPrompt.description = null;
    }
  }
})();

