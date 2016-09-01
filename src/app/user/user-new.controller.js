/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('UserNewController', UserNewController);

  UserNewController.$inject = ['$timeout', '$scope','$state', '$stateParams','User','entity','uibDateParser'];

  function UserNewController($timeout, $scope, $state, $stateParams, User, entity, uibDateParser) {
    var vm = this;

    vm.user = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.startOpen = startOpen;
    vm.endOpen = endOpen;
    vm.load=load;

    vm.load(vm.user.id);

    $scope.type = [
      {id:'WEB_USER',name:'WEB_USER'},
      {id:'APP_USER',name:'APP_USER'},
      {id:'ALL',name:'ALL'}
    ];
    $scope.state = [
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
      if (vm.user.userId !== null) {
        User.update(vm.user, onSaveSuccess, onSaveError);
      } else {
        User.save(vm.user, onSaveSuccess, onSaveError);
      }
    }

    function onSaveSuccess(result) {
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


    function load(id) {
      if (id) {
        User.get({id: id}, function (result) {
          vm.user = result.rows[0];
          vm.user.startActiveDate=uibDateParser.parse(vm.user.startActiveDate,"yyyy-MM-dd");
          vm.user.endActiveDate=uibDateParser.parse(vm.user.endActiveDate,"yyyy-MM-dd");
        });
      }
    }
  }
})();
