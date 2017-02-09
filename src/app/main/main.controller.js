(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('MainController', MainController);

MainController.$inject = ['$timeout', '$localStorage','Contacts'];

function MainController($timeout, $localStorage,Contacts) {

  var vm = this;
  vm.allDepts=[];
  vm.loadDeptData=loadDeptData;
  vm.loadTagData=loadTagData;

  vm.loadDeptData();
  vm.loadTagData();

  function loadDeptData() {
    Contacts.findAllDepts().query({}, onDeptSuccess, onError);
  }
  function loadTagData(){
    Contacts.getAllTags().get({}, onTagsSuccess, onError);
  }

  function onDeptSuccess(data, headers){
    vm.allDepts = data.rows;
    vm.deptData = [];
    //var root = {};
    //root.id = 0;
    //root.parent = "#";
    //root.text = "企业组织架构";
    //root.state = {opened: true,selected:false};
    //vm.deptData.push(root);

    angular.forEach(vm.allDepts, function (dept) {

      //$log.info(menu);
      if(dept.id==1){
        var root = {};
        root.id = dept.id;
        root.parent = "#";
        root.text = dept.name;
        root.state = {opened: true,selected:false};
        vm.deptData.push(root);
      }
      else{
        var treeNode = {};
        treeNode.id = dept.id;
        treeNode.parent = dept.parentId;
        treeNode.text = dept.name;
        treeNode.state = {opened: false,selected:false};
        vm.deptData.push(treeNode);
      }

    });
    //初始化
    $localStorage.deptData=vm.deptData;
  }
  function onTagsSuccess(data, headers){
    $localStorage.allTags= data.rows;
  }
  function onError(error) {

  }
}
})();
