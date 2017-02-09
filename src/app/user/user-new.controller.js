/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('UserNewController', UserNewController);

  UserNewController.$inject = ['$timeout','$scope','$state', '$stateParams','User','entity','uibDateParser','toastr','SweetAlert'];

  function UserNewController($timeout,$scope, $state, $stateParams, User, entity, uibDateParser,toastr,SweetAlert) {
    var vm = this;

    vm.user = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.startOpen = startOpen;
    vm.endOpen = endOpen;
    vm.load=load;

    vm.load(vm.user.id);

    vm.type = [
      {id:'WEB_USER',name:'WEB_USER'},
      {id:'APP_USER',name:'APP_USER'},
      {id:'ALL',name:'ALL'}
    ];
    vm.state = [
      {id:'Y',name:'有效'},
      {id:'N',name:'无效'}
    ];

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear() {
      $state.go('user');
    }

    function save() {
      vm.isSaving = true;
      var passwd=vm.user.password;
      //var reg = /^(?![^a-zA-Z]+$)(?!\\D+$)[a-zA-Z0-9._`~!@#$%^&*()+-={}:;<>?,\\\\\"\'\\[\\]]{8,}$/g;
      //var afterMatch = reg.test(passwd);
      //if(!afterMatch){
      //  SweetAlert.error("密码格式不正确",{title:"提示"});
      //  return false;
      //}
      if (vm.user.userId !== null) {
        User.query().update(vm.user, onSaveSuccess, onSaveError);
      } else {
        User.query().save(vm.user, onSaveSuccess, onSaveError);
      }
    }

    function onSaveSuccess(result) {
      toastr.success('保存成功！','信息提示');
      $scope.$emit('hmapFront:userUpdate', result);
      vm.isSaving = true;
      $state.go('user');
    }

    function onSaveError() {
      vm.isSaving = false;
    }

    function dateOptions() {
      var options = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };
      return options;
    }

    function startOpen() {
      vm.isStartOpen = true;
    }
    function endOpen() {
      vm.isEndOpen = true;
    }

    function onQuerySuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.roles= data.rows;
    }
    function onQueryError(error) {
      //console.log('error');
    }
    function load(id) {
      if (id) {
        User.query().get({id: id}, function (result) {
          vm.user = result.rows[0];
          vm.user.startActiveDate=uibDateParser.parse(vm.user.startActiveDate,"yyyy-MM-dd");
          vm.user.endActiveDate=uibDateParser.parse(vm.user.endActiveDate,"yyyy-MM-dd");
        });
      }
      User.queryRoles().query(onQuerySuccess,onQueryError);
    }
  }
})();
