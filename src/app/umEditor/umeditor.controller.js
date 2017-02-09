/**
 * Created by zhusifeng on 2016/8/31.
 */
(function () {
  'use strict';
   angular.module('hmapFront')
     .directive('repeatFinish',['$timeout',function($timeout){
       return {
         link: function(scope,element,attr){
           //console.log("+++++++: "+scope.$index);
           if(scope.$last == true){
             $timeout(function(){
               scope.$apply(attr.repeatfinish);
               //console.log('ng-repeat执行完毕'+attr.repeatfinish);
             },250);
           }
         }
       }
     }])

    .controller('umEditorController', umEditorController);

  umEditorController.$inject = ['umEditorService','$state','$scope','$uibModal','$timeout','Upload','toastr','SweetAlert','$sce'];
  function umEditorController(umEditorService,$state,$scope,$uibModal,$timeout,Upload,toastr,SweetAlert,$sce) {
    var vm = this;
    vm.articleCount=0;
    vm.articleArr=[];
    vm.curShowCount=0; //当前显示的图文的articleCount值
    vm.show = 0;
    vm.coverRemark="";

    vm.articles=new Array(500);
    vm.article={};
    vm.templates={};
    vm.perviews="";
    //vm.editArticle={};

    vm.addImageText=addImageText; //添加图文
    vm.imageTextSelected=imageTextSelected;
    vm.onMouseOverImageText=onMouseOverImageText;
    vm.onMouseOutImageText=onMouseOutImageText;
    vm.imageTextDown=imageTextDown;
    vm.imageTextUp=imageTextUp;
    vm.imageTextDel=imageTextDel;
    vm.titleInput=titleInput;
    vm.send=send;
    vm.insertImage = insertImage;
    vm.insertRedio = insertRedio;
    vm.insertMusic = insertMusic;
    vm.insertVote = insertVote;
    vm.perview=perview;
    vm.localUpLoad = localUpLoad;
    vm.submitEdit = submitEdit;
    vm.selectAllTemplate =selectAllTemplate;

    init();
    function init(){
      addImageText();
      selectAllTemplate();
      vm.curShowCount=vm.articleCount;
      //$timeout( function() {imageTextSelected(vm.curShowCount)},500);
    }
    //新增图文
    function addImageText(){
      vm.articleCount=vm.articleCount+1;
      vm.articleArr.push(vm.articleCount);
      vm.curShowCount=vm.articleCount;
      vm.article={};
      saveData();
      //vm.curShowCount=vm.articleCount;
      //$timeout( function() {imageTextSelected(vm.curShowCount)},500);
    }

    /*选定右侧图文，并显示对应的表单*/
    function imageTextSelected(articleCount){
      //TODO 不规范
      //$("#imageTextList").find("div[id^='imageText']").removeClass("select_image_text");  //移除
      //$("#imageText"+articleCount).addClass("select_image_text");
      if(articleCount==vm.articleArr[0]){ //首图文
        vm.coverRemark="封面 小图片建议尺寸：900像素 * 500像素";
      }else{
        vm.coverRemark="封面 小图片建议尺寸：200像素 * 200像素";
      }
      saveData();
      vm.curShowCount=articleCount;
      showData();
    }

    function showData(){
       ///显示选定图文的数据
      if(vm.articles[vm.curShowCount]==undefined){
        vm.article={};
      }else{
        vm.article=vm.articles[vm.curShowCount];
      }
      //封面
      //if(vm.article.coverImg==undefined || vm.article.coverImg==''){
      //  $("#form").find("img[name='coverImg']").removeAttr("src");
      //}else{
      //  $("#form").find("img[name='coverImg']").attr("src",vm.article.coverImg);
      //}
    }

    function saveData(){

      vm.articles[vm.curShowCount]=vm.article;  //保存当前图文的数据
      //console.log(+vm.curShowCount+"==save===: "+angular.toJson(vm.articles[vm.curShowCount]));
    }

    function titleInput(){
      //TODO 不规范
      //$("#imageText"+vm.curShowCount).find("p[name='title']").text(vm.article.title==''?'标题':vm.article.title);

      saveData();
    }

    /*鼠标移入图文*/
    function onMouseOverImageText(articleCount){
      vm.show=articleCount;
    }
    /*鼠标移出图文*/
    function onMouseOutImageText(){
      vm.show=0
    }
    /*图文下移*/
    function imageTextDown(index){
      for(var i=0;i<vm.articleArr.length;i++){
        if(i==index){
          var v=vm.articleArr[i];
          vm.articleArr[i]=vm.articleArr[i+1];
          vm.articleArr[i+1]=v;
          break;
        }
      }
    }
    /*图文上移*/
    function imageTextUp(index){
      for(var i=0;i<vm.articleArr.length;i++){
        if(i==index){
          var v=vm.articleArr[i];
          vm.articleArr[i]=vm.articleArr[i-1];
          vm.articleArr[i-1]=v;
          break;
        }
      }
    }
    /*图文删除*/
    function imageTextDel(index){
      vm.articles[vm.articleArr[index]]=undefined;
      vm.articleArr.splice(index,1);
      imageTextSelected(vm.articleArr[vm.articleArr.length-1]);//选中最后一个
    }

    //打开图片上传模态框
    function insertImage(type){
      var modalInstance = $uibModal.open({
        templateUrl: 'app/umEditor/imgModal.html',
        controller: 'ImageModalController',
        controllerAs: '$ctrl',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          entity: function () {
            return {
              type: type
            };
          }
        }
      }).result.then(function (selectedImage) {
          //console.log("selectedImage: "+angular.toJson(selectedImage));
          if(type=='content'){  //正文
            insertContent(selectedImage);
          }else if(type=='cover'){ //封面
            selectCover(selectedImage);
          }
        }, function () {
          //console.log('Modal dismissed at: ' + new Date());
        });
    }
    function insertContent(selectedImage){
      var html = '';
      for(var i=0;i<selectedImage.length;i++){
        html += '<p><img src="' + selectedImage[i].attachmentUrl + '" id="' + selectedImage[i].attachmentId + '" style="max-width:100%"/></p>'
      }
      $timeout(function() {
        UE.getEditor('myUeditor').execCommand('insertHtml', html); //插入内容
      });
    }

    function selectCover(selectedImage){
        if(selectedImage.length>0){
          vm.article.contentCover=selectedImage[0].attachmentUrl;
          //$("#form").find("img[name='coverImg']").attr("src",vm.article.coverImg);
        }
    }

    /*弹出input file加载文件框*/
    function localUpLoad(target){
      document.getElementById(target).click();
    }

    //保存
    function submitEdit(){
      imageTextSelected(vm.curShowCount);
      for(var i=0;i<vm.articleArr.length;i++){
        var article=vm.articles[vm.articleArr[i]];
        var message=umEditorService.checkData(article);
        if(message!=''){
          imageTextSelected(vm.articleArr[i]);
          SweetAlert.error(message,{title: "提示"});
          return false;
        }
      }
      var articles=[];
      for(var i=0;i<vm.articleArr.length;i++){
        articles.push(vm.articles[vm.articleArr[i]]);
      }
      var data={articles:articles,flag:'add'};
      console.log("submitEdit data: "+angular.toJson(data));
      vm.article.status = "未发布";
      umEditorService.submitInfo().insert(vm.article)
      toastr.success('保存成功！','信息提示');
    }


    //弹出视频模态框
    function insertRedio(_this){
      $(_this).attr("data-toggle","modal");
    }

    //选择视频
    function selectRadio(target){
      console.log("选择视频");
      document.getElementById(target).click();
    }

    //弹出音乐模态框
    function insertMusic(_this){
      $(_this).attr("data-toggle","modal");
    }

    //选择音乐
    function selectMusic(target){
      console.log("选择音乐");
      document.getElementById(target).click();
    }

    //弹出投票模态框
    function insertVote(_this){
      $(_this).attr("data-toggle","modal");
    }

    //发起投票
    function selectVote(target){
      console.log("选择投票");
      document.getElementById(target).click();
    }


    //预览
    function perview(){
      imageTextSelected(vm.curShowCount);
      for(var i=0;i<vm.articleArr.length;i++){
        var article=vm.articles[vm.articleArr[i]];
        var message=umEditorService.checkData(article);
        if(message!=''){
          imageTextSelected(vm.articleArr[i]);
          SweetAlert.error(message,{title: "提示"});
          return false;
        }
      }
      umEditorService.perview().perview(vm.article,onPerviewSuccess,onError);
    }

    //发布
    function send(data)
    {
      console.log(data);
      imageTextSelected(vm.curShowCount);
      for(var i=0;i<vm.articleArr.length;i++){
        var article=vm.articles[vm.articleArr[i]];
        var message=umEditorService.checkData(article);
        if(message!=''){
          imageTextSelected(vm.articleArr[i]);
          SweetAlert.error(message,{title: "提示"});
          return false;
        }
      }

      var modalInstance = $uibModal.open({
        templateUrl: 'app/umEditor/selectSendPerson.html',
        controller: 'SendPersonController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          entity: function () {
            return {
              articleArr: vm.articleArr,
              articles:data
            };
          }
        }
      }).result.then(function (data) {

        }, function () {
          //console.log('Modal dismissed at: ' + new Date());
        });
    }
    function selectAllTemplate(){
      umEditorService.queryAllTemplate().query(onSuccess,onError);
    }

    function onSuccess(data){
      vm.templates=data.rows;
    }

    function onError(error) {
      //console.log('error');
    }

    function onPerviewSuccess(data){
      vm.perviews = data.rows;
      //$state.go('perview',{perviews:vm.perviews})
      var modalInstance = $uibModal.open({
        templateUrl: 'app/umEditor/perview.html',
        controller: 'PerviewController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          entity: function () {
            return {
              perviews:vm.perviews
            };
          }
        }
      }).result.then(function (data) {
        }, function () {
          //console.log('Modal dismissed at: ' + new Date());
        });
    }

  }


})();

