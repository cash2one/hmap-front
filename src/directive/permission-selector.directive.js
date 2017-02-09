/**
 * Created by zhouzy on 2016/11/14 0014.
 */
(function () {
  'use strict';
  var permissionSelector = {
    templateUrl: 'app/tpl/permission-area.html',
    controller: PermissionSelectorController,
    controllerAs: 'vm',
    bindings: {
      id: "@",
      name: "@",
      permissionData: '='
    }
  };

  angular
    .module('hmapFront')
    .component('permissionSelector', permissionSelector);
  PermissionSelectorController.$inject = ['$uibModal', 'Hmapfe'];

  function PermissionSelectorController($uibModal, Hmapfe) {
    var vm = this;
    vm.open = open;

    this.$onInit = function () {
      Hmapfe.log('$onInit');
      Hmapfe.log(vm.permissionData);
    }
    function open() {
      Hmapfe.log(vm.permissionData);
      $uibModal.open({
        templateUrl: 'app/tpl/permission-selector.html',
        controller: PermissionModalController,
        controllerAs: 'vm',
        size: 'md',
        backdrop: 'static',
        resolve: {
          permissionData: function () {
            return vm.permissionData;
          }
        }
      }).result.then(function (result) {
          console.info("I was closed, so do what I need to do myContent's controller now.  Result was->");
          console.info(result);
          vm.permissionData = result;
        }, function (reason) {
          console.info("I was dimissed, so do what I need to do myContent's controller now.  Reason was->" + reason);
        });
    };
  }

  //var permissionModal = {
  //  //templateUrl:'app/tpl/permission-selector.html',
  //  template: '<div class="modal-body"><div>{{$ctrl.greeting}}</div><label>Name To Edit</label> <input ng-model="$ctrl.modalData.name"><br>  <label>Value To Edit</label> <input ng-model="$ctrl.modalData.value"><br><button class="btn btn-warning" type="button" ng-click="$ctrl.handleClose()">Close Modal</button><button class="btn btn-warning" type="button" ng-click="$ctrl.handleDismiss()">Dimiss Modal</button></div>',
  //  controller: PermissionModalController,
  //  controllerAs: '$ctrl',
  //  bindings: {
  //    modalInstance: "<",
  //    resolve: "<"
  //  }
  //};
  //
  //angular
  //  .module('hmapFront')
  //  .component('permissionModal', permissionModal);
  PermissionModalController.$inject = ['$state', 'Contacts', 'paginationConstants', '$log', '$scope', '$uibModal', '$localStorage', 'Hmapfe', '$uibModalInstance', 'permissionData'];

  function PermissionModalController($state, Contacts, paginationConstants, $log, $scope, $uibModal, $localStorage, Hmapfe, $uibModalInstance, permissionData) {
    var vm = this;
    vm.permissionData = permissionData;

    vm.page = 1;
    vm.isStaffShow = false;
    vm.isSpinnerShow = false;
    vm.isOrgShow = true;
    vm.isTagShow = false;
    vm.totalItems = null;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.selectedData = [];
    vm.searchData=[];
    vm.jsTreeData = [];
    vm.deptData = [];
    vm.dept = {};
    vm.treeConfig = {};
    vm.detailTreeConfig = {};
    vm.treeInstance = {};
    vm.memberTreetailInstance = {};
    vm.currentDept = {};
    vm.checkedNodes = [];
    vm.allDepts = [];
    vm.allTags = [];
    vm.allTransferedDepts = [];
    vm.allTransferedTags = [];
    vm.allTransferedStaffs = [];
    vm.staffs = [];
    vm.deptTreeEventsObj = {};
    vm.memberTreeEventsObj = {};

    vm.permissionDataInitialize = permissionDataInitialize;
    vm.initData = initData;
    vm.dataTransfer = dataTransfer;
    vm.getSelectedNode = getSelectedNode;

    vm.selectOrg = selectOrg;
    vm.selectTag = selectTag;
    vm.selectDetail = selectDetail;
    vm.checkedData = checkedData;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.tagDetail = tagDetail;
    vm.onRemoveCallback = onRemoveCallback;
    vm.onSelectCallback=onSelectCallback;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.clear = clear;
    vm.close = close;
    vm.permissionAutocomplete=permissionAutocomplete;
    vm.permissionDataInitialize();
    vm.initData();
    vm.dataTransfer();


    vm.deptTreeEventsObj = {
      activate_node: selectDeptTree
    };
    vm.memberTreeEventsObj = {
      activate_node: selectMemberTree
    };
    function selectMemberTree(e, i) {
      vm.currentDept.deptNumber = i.node.id;
      vm.currentDept.deptName = i.node.text;
      loadDeptStaff();
    }

    function selectDeptTree(e, i) {
      Hmapfe.log(i);
      var dept = {};
      dept.dataType = 'dept';
      dept.dataValue = i.node.text;
      dept.dataId = i.node.id;
      dept.dataIcon = 'fa fa-folder';
      dept.checked = 'Y';
      vm.selectedData.push(dept);

    }

    function loadDeptStaff() {
      vm.isStaffShow = false;
      vm.isSpinnerShow = true;
      vm.dept.deptNumber = vm.currentDept.deptNumber;
      vm.dept.page = vm.page;
      vm.dept.pagesize = vm.itemsPerPage;

      Contacts.findDeptStaff().get(vm.dept, onStaffSuccess, onError);
    }

    function permissionDataInitialize() {

      if (vm.permissionData && vm.permissionData.length) {
        for (var i = 0; i < vm.permissionData.length; i++) {
          vm.selectedData.push(vm.permissionData[i]);
        }
      }
    }

    //在初始化数据时，需要把已经选择的数据勾选
    function initializeSelectedData(pendingData) {
      for (var i = 0; i < vm.selectedData.length; i++) {
        if (vm.selectedData[i].dataType == 'tag'||vm.selectedData[i].dataType == 'staff') {
          for (var j = 0; j < pendingData.length; j++) {
            if (vm.selectedData[i].dataId == pendingData[j].dataId && vm.selectedData[i].dataType == pendingData[j].dataType) {
              pendingData[j].checked = 'Y';
              break;
            }
          }
        }
        //如果是部门，需要处理树型结构里面的数据，设置为可选
        //vm.jsTreeData
        else if(vm.selectedData[i].dataType == 'dept'){
          for (var j = 0; j < vm.jsTreeData.length; j++) {
            if(vm.selectedData[i].dataId==vm.jsTreeData[j].id){
              vm.jsTreeData[j].state.open=true;
              vm.jsTreeData[j].state.selected=true;
              break;
            }
          }
        }
      }
    }

    function initData() {
      vm.treeConfig = {
        core: {
          multiple: true,
          animation: true,
          error: function (error) {
            $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
          },
          check_callback: true,
          worker: true
        },
        'types': {
          'default': {
            'icon': 'fa fa-folder'
          }
        },
        version: 1,
        plugins: ['types', 'checkbox']
      };
      angular.copy($localStorage.deptData,vm.jsTreeData);
      angular.copy($localStorage.deptData,vm.allDepts);
      angular.copy($localStorage.allTags,vm.allTags);
      //将已经选中的数据显示在这里
      initializeSelectedData(vm.jsTreeData);
    }

    function initDetailData() {
      vm.detailTreeConfig = {
        core: {
          multiple: true,
          animation: true,
          error: function (error) {
            $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
          },
          check_callback: true,
          worker: true
        },
        'types': {
          'default': {
            'icon': 'fa fa-folder'
          }
        },
        version: 1,
        plugins: ['types', 'dnd']
      };
      vm.jsMemberTreeData = $localStorage.deptData;
    }

    function getSelectedNode() {
      vm.checkedNodes = vm.treeInstance.jstree(true).get_selected();
    }

    function onStaffSuccess(data, headers) {
      vm.staffs = data.rows;
      staffsTransfer(vm.staffs);
      vm.totalItems = data.total;
      vm.isStaffShow = true;
      vm.isSpinnerShow = false;
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
      loadDeptStaff();
    };

    function selectTag() {
      vm.isOrgShow = false;
      vm.isTagShow = true;
    }

    function selectOrg() {
      vm.isOrgShow = true;
      vm.isTagShow = false;
      //getAllTags
    }

    function selectDetail() {
      initDetailData();
    }

    function close() {
      $uibModalInstance.close(vm.selectedData);
    }

    function clear() {
      Hmapfe.log('clear');
      $uibModalInstance.dismiss('cancel');
    }

    function tagDetail() {
      Hmapfe.log('tagDetail');
    }

    function checkedData(obj, event) {
      var isChecked = event.target.checked;
      if (isChecked) {
        if (existsInArray(obj, vm.selectedData)) {
          vm.selectedData.push(obj);
        }
      }
      else {
        vm.selectedData.splice(getPosInArray(obj, vm.selectedData), 1);
        obj.checked = 'N';
      }
    }


    function dataTransfer() {
      //deptsTransfer();
      tagsTransfer();
    }

    function deptsTransfer() {
      for (var i = 0; i < vm.allDepts.length; i++) {
        var dept = {};
        dept.dataType = 'tag';
        dept.dataValue = vm.allDepts[i].text;
        dept.dataId = vm.allDepts[i].id;
        dept.dataIcon = 'fa fa-folder';
        dept.checked = 'N';
        vm.allTransferedDepts.push(dept);
      }
    }

    function tagsTransfer() {
      for (var i = 0; i < vm.allTags.length; i++) {
        var tag = {};
        tag.dataType = 'tag';
        tag.dataValue = vm.allTags[i].tagName;
        tag.dataId = vm.allTags[i].id;
        tag.dataIcon = 'fa fa-tag';
        tag.checked = 'N';
        vm.allTransferedTags.push(tag);
        initializeSelectedData(vm.allTransferedTags);
      }
    }

    function staffsTransfer(staffs) {
      vm.allTransferedStaffs=[];
      for (var i = 0; i < staffs.length; i++) {
        var staff = {};
        staff.dataType = 'staff';
        staff.dataValue = staffs[i].userName;
        staff.dataId = staffs[i].userId;
        staff.dataIcon = 'fa fa-user';
        staff.checked = 'N';
        vm.allTransferedStaffs.push(staff);
      }
      initializeSelectedData(vm.allTransferedStaffs);
    }

    function existsInArray(obj, array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].dataId === obj.dataId && array[i].dataType === obj.dataType)
          return false;
      }
      return true;
    }

    function getPosInArray(obj, array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].dataId === obj.dataId && array[i].dataType === obj.dataType)
          return i;
      }
      return 0;
    }

    function onRemoveCallback(item, model) {
      if (item.dataType == 'staff') {
        for (var i = 0; i < vm.allTransferedStaffs.length; i++) {
          if (vm.allTransferedStaffs[i].dataId === item.dataId) {
            vm.allTransferedStaffs[i].checked = 'N';
            return;
          }
        }
      }

      if (item.dataType == 'tag') {
        for (var i = 0; i < vm.allTransferedTags.length; i++) {
          if (vm.allTransferedTags[i].dataId === item.dataId) {
            vm.allTransferedTags[i].checked = 'N';
            return;
          }
        }
      }

      if (item.dataType == 'dept') {
        //需要从树里面设置选中标记
        for (var i = 0; i < vm.jsTreeData.length; i++) {
          if (vm.jsTreeData[i].id == item.dataId) {
            //vm.jsTreeData[i].state=false;
            vm.treeInstance.jstree(true).deselect_node(vm.jsTreeData[i], false);
            return;
          }
        }
      }
    }
    function onSelectCallback(item, model){
      //处理选中时的事件


      if (item.dataType == 'tag') {
        for (var i = 0; i < vm.allTransferedTags.length; i++) {
          if (vm.allTransferedTags[i].dataId === item.dataId) {
            vm.allTransferedTags[i].checked = 'Y';
            return;
          }
        }
      }

      if (item.dataType == 'dept') {
        Hmapfe.log('dept');
        //需要从树里面设置选中标记
        for (var i = 0; i < vm.jsTreeData.length; i++) {
          if (vm.jsTreeData[i].id == item.dataId) {
            //vm.jsTreeData[i].state=false;
            vm.treeInstance.jstree(true).open_node(vm.jsTreeData[i]);
            vm.treeInstance.jstree(true).select_node(vm.jsTreeData[i], false);
            Hmapfe.log('预计选定节点');
            return;
          }
        }
      }
    }
    function permissionAutocomplete(search){
      vm.searchData=[];
      if(search){
        Contacts.contactListSearch().search({key:search}, onSearchSuccess, onError);
      }

    }
    function onSearchSuccess(data, headers){
      var searchResult=data.rows;
      for(var i=0;i<searchResult.length;i++){
        vm.searchData.push(searchResult[i]);
      }

    }
  }
})();
