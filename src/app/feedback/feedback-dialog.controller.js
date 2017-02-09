/**
 * Created by hand on 2016/11/28.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('FeedbackDialogController', FeedbackDialogController);

  FeedbackDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Feedback','toastr'];

  function FeedbackDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, Feedback,toastr) {
    var vm = this;
    vm.feedback = {};
    vm.feedbacks={};
    vm.isFeedback = false;
    vm.clear = clear;
    vm.save = save;
    vm.load = load;
    vm.load(vm.feedback.id);

    function clear(){
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.isSaving = true;
      //console.log(vm.sysConfig);
      Feedback.createFeedback().insert(vm.feedback, onSaveSuccess, onSaveError);
    }

    function onSaveSuccess(data, headers) {
      //console.log(result);
      vm.feedbacks=data.rows;
      toastr.success('保存成功！','信息提示');
      $scope.$emit('hmapFront:feedbackUpdate',vm.feedbacks);
      $uibModalInstance.close(vm.feedbacks);
      vm.isSaving = false;
    }

    function onSaveError() {
      vm.isSaving = false;
    }

        function load(id) {
        if (id) {
          Feedback.query().query(vm.feedback, function (result) {
            vm.feedback = result.rows[0];
          });
        }

    }

  }
})();
