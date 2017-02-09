/**
 * Created by zhouzy on 2016/9/18 0018.
 */
/**
 * Created by zhouzy on 2016/8/4 0004.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ImageModalController', ImageModalController);

  ImageModalController.$inject = ['$stateParams', '$uibModalInstance','$localStorage', '$sessionStorage', '$timeout', 'Upload', 'BaseConfig','SweetAlert','entity','umEditorService'];

  function ImageModalController ($stateParams, $uibModalInstance,$localStorage,$sessionStorage,$timeout,Upload,BaseConfig,SweetAlert,entity,umEditorService) {
    var $ctrl = this;
    $ctrl.operate=entity.type;
    $ctrl.type='IMAGE';
    $ctrl.pageSize=10;
    $ctrl.sumPage=0;
    $ctrl.curPage=1;
    $ctrl.targetPage='';
    $ctrl.currentGroup="unGroup";  //未分组
    $ctrl.groupData = [];
    $ctrl.imageData = [];
    $ctrl.isOpen=false;

    $ctrl.prevPage=prevPage;
    $ctrl.nextPage=nextPage;
    $ctrl.skipPage=skipPage;
    $ctrl.selectedGroup=selectedGroup;
    $ctrl.selectPicture=selectPicture;
    $ctrl.upLoadImage=upLoadImage;
    $ctrl.addTag = addTag;
    $ctrl.closeAddTag = closeAddTag;
    $ctrl.localUpLoad=localUpLoad;

    $ctrl.preIndex=null;

    $ctrl.dynamicPopover = {
      templateUrl: 'popover.html'
    };

    init();
    function init(){
      queryGroup()
    }

    function queryGroup(){
      umEditorService.queryAttachmentGroup().then(function(data){
        $ctrl.groupData= data.rows;
        queryImage();
      },function(error){
        //console.log(error);
        SweetAlert.error("查询失败",{title:"提示"});
      });
    }
    function queryImage(){
      var data={groupId:$ctrl.currentGroup,type:$ctrl.type,pageCount:$ctrl.curPage,pageSize:$ctrl.pageSize};
      umEditorService.queryAttachment(data).then(function(resp){
        $ctrl.imageData= resp.rows;
        if(resp.total%$ctrl.pageSize==0){
          $ctrl.sumPage=resp.total/$ctrl.pageSize;
        }else{
          $ctrl.sumPage=parseInt(resp.total/$ctrl.pageSize)+1
        }
      },function(error){
        //console.log(error);
        SweetAlert.error("查询失败",{title:"提示"});
      });
    }
    function prevPage(){
      $ctrl.curPage=$ctrl.curPage-1;
      queryImage();
    }
    function nextPage(){
      $ctrl.curPage=$ctrl.curPage+1;
      queryImage();
    }
    function skipPage(){
      var regx=/^[1-9]+[0-9]*$/;
      if(!regx.test($ctrl.targetPage) || $ctrl.targetPage>$ctrl.sumPage){
        $ctrl.targetPage='';
        SweetAlert.error("请输入正常的页码",{title:"提示"});
        return false;
      }
      $ctrl.curPage=$ctrl.targetPage;
      queryImage();
    }
    //标注选定的组
    function selectedGroup(groupId){
      $ctrl.currentGroup=groupId;
      queryImage();
    }
    //选择图片
    function selectPicture(index){
      if($ctrl.imageData[index].selectFlag){
        $ctrl.imageData[index].selectFlag=false;
      }else{
        if($ctrl.operate=='cover'){  //选择封面
            if($ctrl.preIndex!=null){
              $ctrl.imageData[$ctrl.preIndex].selectFlag=false;  //取消前一个的选定
            }
          $ctrl.imageData[index].selectFlag=true;
          $ctrl.preIndex=index;
        }else{    //选择正文图片
          $ctrl.imageData[index].selectFlag=true;
        }
      }
    }
    /*弹出input file加载文件框*/
    function localUpLoad(target){
      document.getElementById(target).click();
    }
    function upLoadImage(){
      var file=document.getElementById("picture").files[0];
      if (file == null || file== undefined || file == '') {
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
          data: {file: file,type:$ctrl.type,groupId:$ctrl.currentGroup}
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
    function addTag(){
      if($ctrl.groupName==undefined || $ctrl.groupName==''){
        SweetAlert.error("输入不能为空",{title:"提示"});
        return false;
      }
      var data={groupName:$ctrl.groupName};
      umEditorService.addAttachmentGroup(data).then(function(resp){
        closeAddTag();
        queryGroup();
      });
    }

    function closeAddTag(){
      $ctrl.isOpen=false;
    }

    $ctrl.ok = function () {
      var data=[];
      for(var index=0;index<$ctrl.imageData.length;index++){
        if($ctrl.imageData[index].selectFlag){
          data.push($ctrl.imageData[index]);
        }
      }
      //console.log("data=====: "+angular.toJson(data));
      closeAddTag();
      $uibModalInstance.close(data);
    };

    $ctrl.cancel = function () {
      closeAddTag();
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
