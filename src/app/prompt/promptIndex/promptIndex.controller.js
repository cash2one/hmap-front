/**
 * Created by Koma.Tshu on 2016/8/9.
 */
(function () {
  'use strict';

  angular.module("hmapFront").controller("PromptIndexController", PromptIndexController);

  PromptIndexController.$inject = ['$state', 'PromptService', 'paginationConstants'];

  function PromptIndexController($state, PromptService, paginationConstants) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;

    vm.loadAll();

    //vm.langValue = [
    //  {code : "en_GB", name : "English"},
    //  {code : "zh_CN", name : "简体中文"}
    //];

    function selectLang(){
      return PromptService.selectLang()
        .then(function(data){
          vm.langValue = data.rows;
          console.log("result00000" + angular.toJson(vm.langValue));
        })
    }

    function loadAll() {
      selectLang();
      console.log("savePage:" + vm.page);
      return PromptService.queryPrompts(vm.page,paginationConstants.itemsPerPage)
        .then(function(data){
          vm.prompts = data.rows;
          vm.totalItems =  data.total;
        })
    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      console.log('Page changed to: ' + vm.page);
      loadAll();
    }
  }
})();

