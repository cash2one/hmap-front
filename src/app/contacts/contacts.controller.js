/**
 * Created by zhouzy on 2016/11/10 0010.
 */
/**
 * Created by zhouzy on 2016/8/18 0018.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ContactsController', ContactsController);

  ContactsController.$inject = ['$state', 'Contacts', 'paginationConstants', '$log','$scope','$uibModal','Hmapfe','toastr','$localStorage'];

  function ContactsController($state, Contacts, paginationConstants, $log,$scope,$uibModal,Hmapfe,toastr,$localStorage) {
    var vm = this;
    vm.page = 1;
    vm.isStaffShow=false;
    vm.isSpinnerShow=false;
    vm.isOrgShow=true;
    vm.isTagShow=false;
    vm.totalItems = null;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.jsTreeData = [];
    vm.deptData = [];
    vm.dept = {};
    vm.treeConfig = {};
    vm.treeInstance = {};
    vm.currentDept={};
    vm.checkedNodes = [];
    vm.allDepts = [];
    vm.allTags=[];
    vm.staffs = [];
    vm.treeEventsObj = {};
    vm.loadAll = loadAll;
    vm.initData = initData;
    vm.getSelectedNode = getSelectedNode;
    vm.generateTreeData = generateTreeData;
    vm.selectOrg=selectOrg;
    vm.selectTag=selectTag;
    vm.getAllTags=getAllTags;
    vm.openTagModal=openTagModal;
    vm.updateTag=updateTag;
    vm.lockTag=lockTag;
    vm.deleteTag=deleteTag;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.tagDetail=tagDetail;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.value = '';
    vm.loadAll();
    vm.getAllTags();
    vm.treeEventsObj = {
      activate_node: select
    };
    function select(e, i) {
      vm.currentDept.deptNumber=i.node.id;
      vm.currentDept.deptName=i.node.text;
      loadDeptStaff();
    }
  function loadDeptStaff(){
    vm.isStaffShow=false;
    vm.isSpinnerShow=true;
    vm.dept.deptNumber = vm.currentDept.deptNumber;
    vm.dept.page = vm.page;
    vm.dept.pagesize = vm.itemsPerPage;

    Contacts.findDeptStaff().get(vm.dept, onStaffSuccess, onError);
  }
    function loadAll() {
      Contacts.findAllDepts().query({}, onSuccess, onError);
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
        plugins: ['types', 'dnd']
      };
    }

    function getSelectedNode() {
      vm.checkedNodes = vm.treeInstance.jstree(true).get_selected();
    }

    function generateTreeData() {
      vm.deptData = [];
      var root = {};
      //$log.info(menu);
      //root.id = 0;
      //root.parent = "#";
      //root.text = "企业组织架构";
      //root.state = {opened: true,selected:false};
      //vm.deptData.push(root);

      angular.forEach(vm.allDepts, function (dept) {
        if(dept.id==1){
          var root = {};
          root.id =dept.id;
          root.parent = "#";
          root.text = dept.name;
          root.state = {opened: true,selected:false};
          vm.deptData.push(root);
        }
        else{
          var treeNode = {};
          //$log.info(menu);
          treeNode.id = dept.id;
          treeNode.parent = dept.parentId;
          treeNode.text = dept.name;
          treeNode.state = {opened: false,selected:false};
          vm.deptData.push(treeNode);
        }
      });
      //初始化
      vm.currentDept.deptNumber=vm.deptData[0].id;
      vm.currentDept.deptName=vm.deptData[0].text;
      $localStorage.deptData=vm.deptData;
    }

    function onSuccess(data, headers) {
      vm.allDepts = data.rows;
      vm.generateTreeData();
      vm.jsTreeData = [];
      vm.initData();
      angular.copy(vm.deptData, vm.jsTreeData);
      vm.treeConfig.version++;

    }

    function onStaffSuccess(data, headers) {
      vm.staffs = data.rows;
      vm.totalItems = data.total;
      vm.isStaffShow=true;
      vm.isSpinnerShow=false;
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

    function selectTag(){
      vm.isOrgShow=false;
      vm.isTagShow=true;
    }
    function selectOrg(){
      vm.isOrgShow=true;
      vm.isTagShow=false;
      //getAllTags
    }
    $scope.$on('handleAddNewTag', function() {
      console.log(Contacts.newTag);
      vm.allTags.push(Contacts.newTag);
    });

    function getAllTags(){
      Contacts.getAllTags().get({}, onTagsSuccess, onError);
    }

    function onTagsSuccess(data, headers){
      vm.allTags = data.rows;
      $localStorage.allTags=vm.allTags;
    }
    function openTagModal(){
        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/contacts/tag-dialog.html',
          controller: 'TagDialogController',
          controllerAs: 'vm',
          size: 'lg',
          resolve: {
            entity: function () {
              return {
                tagName: null
              };
            }
          }
        });
      };
    function updateTag(id){
      Hmapfe.log('updateTag');
    }
    function lockTag(id){
      Hmapfe.log('lockTag');
    }
    function deleteTag(id){
      //Contacts.deleteTag().save({}, onTagsSuccess, onError);
      Hmapfe.log('lockTag:'+id);
    }
    function tagDetail(){
      Hmapfe.log('tagDetail');
    }

  }


})();
