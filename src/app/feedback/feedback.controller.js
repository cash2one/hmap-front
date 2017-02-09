/**
 * Created by hand on 2016/11/3.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('feedbackController', feedbackController);

  feedbackController.$inject = ['$state', 'Feedback', 'paginationConstants','$localStorage','$scope','$uibModal','toastr'];

  function feedbackController($state,Feedback, paginationConstants,$localStorage,$scope,$uibModal,toastr) {

    var token = $localStorage.authenticationToken;
    var accessToken = token.access_token;

    var vm = this;
    this.picker3 = {
      date: new Date()
    };
    this.picker4 = {
      date: new Date()
    };
    vm.page=1;
    vm.totalItems = null;
    vm.isNotReply=false;
    vm.isSearch=false;
    vm.addReply={};
    vm.searchReply={};
    vm.searchFeedback ={};
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.transition = transition;
    vm.loadAll=loadAll;
    vm.loadAll();
    vm.search=search;
    vm.insert=insert;
    vm.queryNotReply=queryNotReply;
    vm.printFeedback=printFeedback;
    vm.openCalendar=openCalendar;
    vm.openCalendarL=openCalendarL;
    vm.createFeedback=createFeedback;

    function openCalendar (e, picker) {
      vm [picker].open = true;
    };
    function openCalendarL (e, picker) {
      vm [picker].open = true;
    };
    // watch min and max dates to calculate difference



    function createFeedback(){
      var modalInstance = $uibModal.open({
        templateUrl: 'app/feedback/feedback-dialog.html',
        controller: 'FeedbackDialogController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          entity: function () {
            return {
              feedbackData: null
            };
          }
        }
      }).result.then(function (feedbacks) {
          vm.feedbacks=feedbacks;
          vm.feedbacks.page= vm.page;
          vm.feedbacks.pageSize=paginationConstants.itemsPerPage
        }, function () {
          //console.log('Modal dismissed at: ' + new Date());
        });
    }


    function loadAll (){
      vm.isNotReply=false;
      vm.isSearch=false;
        Feedback.query().query({
          page: vm.page,
          accessToken: accessToken,
          pagesize: paginationConstants.itemsPerPage
        }, onSuccess, onError);
    }

    function insert(feedbackId,replyData){

      vm.isSaving = true;
      vm.isSearch=false;
      vm.addReply.feedbackId=feedbackId;
      vm.addReply.replyData=replyData;
      Feedback.insert().insert(vm.addReply, onSaveSuccess, onSaveError);
    }

    function queryNotReply(){
      vm.isNotReply=true;
      vm.isSearch=false;
      vm.searchReply.page = vm.page;
      vm.searchReply.pagesize = paginationConstants.itemsPerPage;
      vm.searchReply.accessToken=accessToken;
      Feedback.queryNotReply().query(vm.searchReply,onSuccess, onError);
    }


    function printFeedback(){
    //  console.log("=========: "+angular.toJson(vm.feedbacks[0]));
      Feedback.printFeedback().print(vm.feedbacks);
      toastr.success('导出成功！','信息提示');
    }

    function search() {
      vm.isNotReply=false;
      vm.isSearch=true;
      vm.searchFeedback.page = vm.page;
      vm.searchFeedback.pageSize = paginationConstants.itemsPerPage;
      vm.searchFeedback.accessToken=accessToken;
      Feedback.query().query(vm.searchFeedback, onSuccess, onError);
    }



    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.feedbacks= data.rows;
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
      if(vm.isNotReply){
        queryNotReply();
      }else if(vm.isSearch){
        search();
      }else{
        loadAll();
      }
    };

    function onSaveSuccess(result) {
      //console.log(result);
      loadAll();
      vm.isSaving = false;
    }

    function onSaveError() {
      vm.isSaving = false;
    }

  }
})();
