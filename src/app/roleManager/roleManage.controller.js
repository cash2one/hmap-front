/**
 * Created by xincai.zhang on 2016/8/12.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('RoleManagerController', RoleManagerController);

  RoleManagerController.$inject = ['RoleService', 'Authority', 'paginationConstants','cfpLoadingBar', '$state', '$log'];

  function RoleManagerController(RoleService, Authority, paginationConstants, cfpLoadingBar, $state, $log) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.ignoreChanges = true;
    vm.role = {};
    vm.jsTreeData = [];
    vm.menuData = [];
    vm.treeConfig = {};
    vm.treeInstance = {};
    vm.checkedNodes = [];
    vm.menuItems = [];
    vm.currentRole = {};
    vm.roles = [];
    vm.roleFunctions=[];
    vm.getSelectedNode = getSelectedNode;
    vm.generateTreeData = generateTreeData;
    vm.initData = initData;
    vm.loadAllAuthority = loadAllAuthority;
    vm.selectRole = selectRole;
    vm.loadAllRole = loadAllRole;
    vm.queryRole = queryRole;
    vm.saveAuthority=saveAuthority;
    vm.applyModelChanges=applyModelChanges;
    vm.initData();
    vm.loadAllAuthority();
    vm.loadAllRole();

    function loadAllRole() {
      RoleService.findRoles().query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onRoleSuccess, onError);
    }

    function onRoleSuccess(data, headers) {
      vm.roles = data.rows;
      vm.totalItems =  data.total;
    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      ////console.log('Page changed to: ' + vm.page);
      loadAll();
    };

    function queryRole() {
      RoleService.findRoles().query(vm.role, onRoleSuccess, onError);
    }


    function getSelectedNode() {
      vm.checkedNodes = vm.treeInstance.jstree(true).get_selected();
      //$log.info(vm.checkedNodes);
    }

    function generateTreeData() {
      vm.menuData = [];
      angular.forEach(vm.menuItems, function (menu) {
        var treeNode = {};
        //$log.info(menu);
        treeNode.id = menu.id;
        treeNode.parent = "#";
        treeNode.text = menu.text;
        var ischecked=false;

        if(menu.ischecked){
          ischecked=true;
        }
        treeNode.state = {opened: true, selected: ischecked};
        vm.menuData.push(treeNode);
        if (menu.children != undefined && menu.children != null && menu.children.length > 0) {
          angular.forEach(menu.children, function (m) {
            expandTree(m, menu);
          });
        }
      });
    }

    function expandTree(menuNode, parentNode) {
      var treeNode = {};
      treeNode.id = menuNode.id;
      treeNode.parent = parentNode.id;
      treeNode.text = menuNode.text;
      var ischecked=false;
      if(menuNode.ischecked){
        ischecked=true;
      }
      treeNode.state = {opened: true, selected: ischecked};
      vm.menuData.push(treeNode);
      if (menuNode.children != undefined && menuNode.children != null && menuNode.children.length > 0) {
        angular.forEach(menuNode.children, function (menu) {
          expandTree(menu, menuNode);
        });
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
    }

    function loadAllAuthority() {
      Authority.query().query({
        roleId: vm.currentRole
      }, onSuccess, onError);
    }

    function onSuccess(data, headers) {
      complete();
      vm.menuItems = data.rows;
      vm.generateTreeData();
      vm.jsTreeData=[];
      angular.copy(vm.menuData, vm.jsTreeData);
      vm.treeConfig.version++;
      $log.info('vm.jsTreeData');
      $log.info(vm.jsTreeData);
      $log.info('vm.jsTreeDataend');
      vm.totalItems = data.total;
    }
    function onRoleFunctionSuccess(data){
      $log.info(data);
    }

    function onError(error) {
      //console.log('error');
    }

    function start() {
      cfpLoadingBar.start();
    };

    function complete() {
      cfpLoadingBar.complete();
    }

    function selectRole(role) {
      start();
      vm.currentRole = role.roleId;
      loadAllAuthority();
    }

    function saveAuthority(){
      vm.roleFunctions=[];

      var selected_nodes = vm.treeInstance.jstree(true).get_selected();
      $log.info(selected_nodes);
      angular.forEach(selected_nodes, function (node) {
        var roleFunction={
          roleId: vm.currentRole,
          functionId:node
        };
        vm.roleFunctions.push(roleFunction);
      });
      $log.info(vm.roleFunctions);
      Authority.save().save(vm.roleFunctions,onRoleFunctionSuccess,onError);
    }
    function applyModelChanges(){
      $log.info("applyModelChanges");
      return vm.ignoreChanges;
    }
  }


})();
