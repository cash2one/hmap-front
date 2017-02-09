/**
 * Created by zhusifeng on 2016/8/31.
 */
(function () {
  'use strict';
  angular.module('hmapFront')
         .controller('localMaterialController', localMaterialController);

  localMaterialController.$inject = ['$state','$scope','$uibModal','$stateParams','$localStorage', '$sessionStorage', '$timeout', 'Upload', 'BaseConfig','paginationConstants','SweetAlert','localMaterialService','umEditorService'];
  function localMaterialController($state,$scope,$uibModal,$stateParams,$localStorage,$sessionStorage,$timeout,Upload,BaseConfig,paginationConstants,SweetAlert,localMaterialService,umEditorService) {
    var vm = this;
    vm.page = 1;
    vm.pageSize = 8;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.groupData=[];
    vm.pictures=[];
    vm.currentGroup="unGroup";  //未分组
    vm.type="IMAGE";
    vm.seletAllFlag=false;
    vm.selectPictureCount=0;
    vm.popover = {
      editNameUrl: 'editName.html',
      moveGroupUrl: 'moveGroup.html',
      createGroupUrl:'createGroup.html'
    };

    vm.editName=editName;
    vm.editNameClose=editNameClose;
    vm.confirmEditName=confirmEditName;
    vm.moveGroup=moveGroup;
    vm.confrimMoveGroup=confrimMoveGroup;
    vm.batchMoveGroup=batchMoveGroup;
    vm.moveGroupClose=moveGroupClose;
    vm.deleteAttachement=deleteAttachement;
    vm.batchDeleteAttachement=batchDeleteAttachement;
    vm.selectPicture=selectPicture;
    vm.selectedGroup=selectedGroup;
    vm.selectAll=selectAll;
    vm.localUpLoad=localUpLoad;
    vm.upLoadImage=upLoadImage;
    vm.addGroup=addGroup;
    vm.closeAddGroup=closeAddGroup;


    vm.loadAll();
    function loadAll() {
      queryGroup();
    }

    function queryGroup(){
      umEditorService.queryAttachmentGroup().then(function(data){
        vm.groupData= data.rows;
        queryPicture();
      },function(error){
        //console.log(error);
        SweetAlert.error("查询失败",{title:"提示"});
      });
      queryPicture()
    }
    function queryPicture(){
      var data={groupId:vm.currentGroup,type:vm.type,pageCount:vm.page,pageSize:vm.pageSize};
      umEditorService.queryAttachment(data).then(function(resp){
        vm.pictures= resp.rows;
        vm.totalItems = resp.total;
        vm.seletAllFlag=false;
        vm.selectPictureCount=0;
      },function(error){
        //console.log(error);
        SweetAlert.error("查询失败",{title:"提示"});
      });
    }

    function selectAll(){
        for (var i=0;i<vm.pictures.length;i++){
          vm.pictures[i].selectFlag=vm.seletAllFlag;
        }
        if(vm.seletAllFlag){
          vm.selectPictureCount=vm.pictures.length;
        }else{
          vm.selectPictureCount=0;
        }

    }
    function selectPicture(index){
      if(vm.pictures[index].selectFlag!=undefined&&vm.pictures[index].selectFlag){
        vm.pictures[index].selectFlag=false;
        vm.selectPictureCount--;
      }else{
        vm.pictures[index].selectFlag=true;
        vm.selectPictureCount++;
      }
    }
    //标注选定的组
    function selectedGroup(groupId){
      vm.currentGroup=groupId;
      queryPicture();
    }

    function batchDeleteAttachement(){
      SweetAlert.confirm("确定批量删除吗？",{title:"提示"}).then(function (p) {
        if(p){
          var ids=[];
          for (var i=0;i<vm.pictures.length;i++){
            if(vm.pictures[i].selectFlag!=undefined && vm.pictures[i].selectFlag){
              ids.push(vm.pictures[i].attachmentId);
            }
          }
          localMaterialService.deleteAttachment({"ids":ids}).then(function (data) {
            SweetAlert.success("批量删除成功",{title:"提示"});
            queryGroup();
          },function (error) {
            //console.log(error);
            SweetAlert.error("批量删除失败",{title:"提示"});
          })
        }
      },function (p) {
      })
    }
    function deleteAttachement(id){
      SweetAlert.confirm("确定删除吗？",{title:"提示"}).then(function (p) {
        if(p){
          var ids=[];
          ids.push(id);
          localMaterialService.deleteAttachment({"ids":ids}).then(function (data) {
            SweetAlert.success("删除成功",{title:"提示"});
            queryGroup();
          },function (error) {
            //console.log(error);
            SweetAlert.error("删除失败",{title:"提示"});
          });
        }
      },function (p) {
      })
    }

    function editName(index){  //弹框
      if(vm.editIndex!=undefined){
        editNameClose();
      }
      vm.newPictureName=vm.pictures[index].attachmentName;
      vm.pictureId=vm.pictures[index].attachmentId;
      vm.editIndex=index;
    }
    function confirmEditName(){
      localMaterialService.modifyName({id:vm.pictureId,newName:vm.newPictureName}).then(function (data) {
        SweetAlert.success("修改成功",{title:"提示"});
        editNameClose();
        queryPicture();
      },function (error) {
        //console.log(error);
        SweetAlert.error("修改失败",{title:"提示"});
      });
    }
    function editNameClose(){
      vm.pictures[vm.editIndex].isEditName=false;
    }


    function moveGroup(index){  //弹框
      if(vm.moveIndex!=undefined){
        moveGroupClose();
      }
      vm.selectRadio=undefined;
      vm.moveIndex=index;
    }
    function batchMoveGroup(){
      var ids=[];
      for (var i=0;i<vm.pictures.length;i++){
        if(vm.pictures[i].selectFlag!=undefined && vm.pictures[i].selectFlag){
          ids.push(vm.pictures[i].attachmentId);
        }
      }
      localMaterialService.moveGroup({ids:ids,groupId:vm.selectRadio}).then(function (data) {
        SweetAlert.success("分组移动成功",{title:"提示"});
        queryGroup();
      },function (error) {
        //console.log(error);
        SweetAlert.error("分组移动失败",{title:"提示"});
      })
    }
    function confrimMoveGroup(){
      var ids=[];
      ids.push(vm.pictures[vm.moveIndex].attachmentId);
      localMaterialService.moveGroup({ids:ids,groupId:vm.selectRadio}).then(function (data) {
        SweetAlert.success("分组移动成功",{title:"提示"});
        moveGroupClose();
        queryGroup();
      },function (error) {
        //console.log(error);
        SweetAlert.error("分组移动失败",{title:"提示"});
      })
    }
    function moveGroupClose(){
      if(vm.moveIndex=='batch'){ //批量分组
        vm.isBatchMoveGroup=false;
      }else{
        vm.pictures[vm.moveIndex].isMoveGroup=false;
      }
    }

    /*弹出input file加载文件框*/
    function localUpLoad(){
      document.getElementById("picture").click();
    }
    function upLoadImage(){
      var file=document.getElementById("picture").files[0];
      if (file == null || file== undefined || file == '') {
        //console.log('文件为空: ' + file)
        return false;
      }
      var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
      Upload.upload({
        //服务端接收
        url: BaseConfig.url + '/api/attachment/uploadFile',
        headers: {
          'Authorization': 'Bearer ' + token.access_token
        },
        //上传的文件
        data: {file: file,type:vm.type,groupId:vm.currentGroup}
      }).progress(function (evt) {
        //进度条
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      }).success(function (data, status, headers, config) {
        //上传成功
        //console.log("服务器返回的数据：", angular.toJson(data));
        queryGroup();
      }).error(function (data, status, headers, config) {
        //上传失败
        //console.log('上传失败,服务器返回的数据: ' + angular.toJson(data));
        SweetAlert.error(data.message,{title:"提示"});
      });
    }

    //确认新建
    function addGroup(){
      var data={groupName:vm.groupName};
      umEditorService.addAttachmentGroup(data).then(function(resp){
        closeAddGroup();
        queryGroup();
      });
    }

    function closeAddGroup(){
      vm.isCreateGroup=false;
      vm.groupName='';
    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      //console.log('Page changed to: ' + vm.page);
      queryPicture();
    }

  }
})();

