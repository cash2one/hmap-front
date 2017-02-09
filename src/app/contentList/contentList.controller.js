/**
 * Created by hand on 2016/12/22.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('contentController', contentController);

  contentController.$inject = ['$state', 'paginationConstants','ContentService'];

  function contentController($state, paginationConstants,ContentService) {


    var vm = this;
    this.picker3 = {
      date: new Date()
    };
    this.picker4 = {
      date: new Date()
    };
    vm.page=1;
    vm.totalItems = null;

    vm.contents={};
    vm.isSearch=false;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.transition = transition;
    vm.loadAll=loadAll;
    vm.loadAll();
    vm.openCalendar=openCalendar;
    vm.openCalendarL=openCalendarL;

    function openCalendar (e, picker) {
      vm [picker].open = true;
    };
    function openCalendarL (e, picker) {
      vm [picker].open = true;
    };



    function loadAll (){
      ContentService.query().query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }


    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.contents= data.rows;
      console.log(vm.contents);
      console.log("12123:"+vm.contents[0].contentSubject);
      for(var i = 0;i<vm.contents.length;i++){
      //  if(vm.contents[i].contentSubject<0)
        if(vm.contents[0].contentSubject.len()>10){

        };
      }

      vm.totalItems =  data.total;
    }
    function onError(error) {
      //console.log('error');

    }
    function transition () {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      //console.log('Page changed to: ' +vm.page);
      loadAll();
    };


  }
})();
