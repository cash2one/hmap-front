/**
 * Created by user on 2016/8/3.
 */
(function (){
  'use strict';

  angular
    .module('hmapFront')
    .controller('WecorpAgentCustomMenuController',['WecorpAgentCustomMenuService','$anchorScroll','$state','$scope','$location','$localStorage','$sessionStorage','paginationConstants','entity','Upload','BaseConfig','SweetAlert',
    function(WecorpAgentCustomMenuService,$anchorScroll,$state,$scope,$location,$localStorage,$sessionStorage,paginationConstants,entity,Upload,BaseConfig,SweetAlert){
      var vm = this;
      var i;
      vm.agent = entity;
      vm.editId=null;
      vm.menus ={};

      vm.page = 1;
      vm.totalItems = null;
      vm.pageChanged=pageChanged;
      vm.itemsPerPage = paginationConstants.itemsPerPage;
      vm.agent.page = vm.page;
      vm.agent.pagesize = paginationConstants.itemsPerPage;

      vm.showSubMenu =2;
      vm.mouseIndex = -1;
      vm.addMenuInputShowFlag=false;
      vm.saveMenuButtonCanClick = true;
      vm.releaseMenuButtonCanClick = true;
      vm.deletereleaseMenuButtonCanClick = true;
      vm.addMenuName=''
      vm.addSubMenuName = ''
      vm.menuSelectedId = -1 ;
      vm.menuType = [
        {code :"click", name : "菜单key"},
        {code :"view", name : "跳转到网页"},
        {code :"scancode_push", name : "扫码推事件"},
        {code :"scancode_waitmsg", name : "扫码推事件(弹框)"},
        {code :"pic_sysphoto", name : "系统拍照"},
        {code :"pic_photo_or_album", name : "拍照或者相册"},
        {code :"pic_weixin", name : "微信发图器"},
        {code :"location_select", name : "地理位置选择器"}
      ];
      vm.sortableOptions = {
        allowDuplicates: true,
        dragStart:function(){

        },
        accept: function (sourceItemHandleScope, destSortableScope) {return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;},
        orderChanged:function(event){
          if(vm.showSubMenu==event.dest.index){
            vm.showSubMenu = event.source.index;
          }
          else if(vm.showSubMenu==event.source.index){
            vm.showSubMenu = event.dest.index;
          }
          //var tmp = vm.buttonLeft.slice(0);
          //console.log(vm.buttonLeft);
          //for(var i =0 ; i < vm.buttonLeft.length ; i++){
          //    if(i==event.source.index){
          //      vm.buttonLeft[i] = tmp[event.dest.index]
          //    }else if(i==event.dest.index){
          //    vm.buttonLeft[i] = tmp[event.source.index]
          //    }else{
          //      vm.buttonLeft[i] = tmp[i]
          //    }
          //}
        }
      };

      vm.sortableOptions1 = {
        accept: function (sourceItemHandleScope, destSortableScope) {return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;}
      };
      vm.clickMenu = clickMenu;
      vm.isShowMenu =isShowMenu;
      vm.deleteMenu = deleteMenu;
      vm.addMenu = addMenu;
      vm.addMenuOperation = addMenuOperation;
      vm.addSubMenuOperation = addSubMenuOperation;
      vm.saveMenu = saveMenu;
      vm.search = search;
      vm.editRecord = editRecord;
      vm.deleteRecord = deleteRecord;
      vm.newMenu = newMenu;
      vm.releaseMenu = releaseMenu;
      vm.deleteReleaseMenu = deleteReleaseMenu;
      getMenuList(vm.agent.agentid);


      function clickMenu(index){
        if(vm.showSubMenu == index){
          vm.showSubMenu = -1;
        }else{
          vm.showSubMenu = index;
        }

      }
      function isShowMenu(index,showSubMenu,subMenu){
        if(subMenu==undefined){
          return false;
        }
        if(subMenu.length==0){
          return false
        }
          return index == showSubMenu;
      }
      function deleteMenu(x,y){
        if(y==-1){
          vm.menus.button.splice(x,1);
        }else{
          vm.menus.button[x].sub_button.splice(y,1);
        }
      }
      function addMenu(){
        vm.addMenuInputShowFlag = true;
      }
      function addMenuOperation(){
        if(vm.addMenuName!=""){
          if(vm.menus.button!=null){
          vm.menus.button[vm.menus.button.length]={
            "name": vm.addMenuName,
            "type": "",
            "key":""
          };
          }else{
            vm.menus={"button":[{
              "name": vm.addMenuName,
              "type": "",
              "key":""
            }]};
          }
          vm.addMenuName="";
        }
      }
      function addSubMenuOperation(index){
        if(vm.addSubMenuName!=""){
          if(vm.menus.button[index].sub_button==null){
            vm.menus.button[index].sub_button=[{
              "name": vm.addSubMenuName,
              "type": "",
              "key":""
            }];
            vm.addSubMenuName="";
          }else{
            vm.menus.button[index].sub_button[vm.menus.button[index].sub_button.length]={
              "name": vm.addSubMenuName,
              "type": "",
              "key":""
            };
            vm.addSubMenuName="";
          }

        }
      }

      function saveMenu(){
        vm.saveMenuButtonCanClick = false;
        var sendBody ={
          //"id":vm.editId, 使用历史记录，而不是菜单保存机制
          "agentid":vm.agent.agentid,
          "menuName":vm.menuName,
          "menuBody":JSON.stringify(vm.menus),
          "enableFlag":"N"
        }
        WecorpAgentCustomMenuService.create().saveMenu(sendBody,
          function(data, headers) {
            SweetAlert.success("保存成功!", {title: "提示"});
            getMenuList(vm.agent.agentid);
            vm.saveMenuButtonCanClick = true;
          }, function(error) {
            vm.saveMenuButtonCanClick = true;
            console.log('error');
          });

      }

      function getMenuList(agentid){
        WecorpAgentCustomMenuService.getMenuList().get({
          agentid:agentid,
          page: vm.page,
          pagesize: paginationConstants.itemsPerPage,
          menuName:vm.agent.menuName
        }, onSuccess, onError);
      } function onSuccess(data, headers) {
        vm.menuList = data.rows;
        vm.totalItems =  data.total;
        if(vm.menuList.length!=0){
        vm.menus = JSON.parse(vm.menuList[0].menuBody);
        vm.menuName = vm.menuList[0].menuName;
        vm.menuSelectedId = vm.menuList[0].id;
        vm.editId=vm.menuList[0].id;
        }else{
          vm.menus = {};
          vm.menuName ='';
        }
      }
      function onError(error) {
        console.log('error');
      }

      function pageChanged() {
        console.log('Page changed to: ' +vm.page);
        vm.agent.page = vm.page;
        vm.agent.pagesize = paginationConstants.itemsPerPage;
        getMenuList(vm.agent.agentid);
      };

      function search(){
        //每次搜索的时候把page设为 1
        vm.agent.page = vm.page = 1;
        vm.agent.pagesize = paginationConstants.itemsPerPage;

        getMenuList(vm.agent.agentid);
      }

      function editRecord(menu,id){
        vm.menus = JSON.parse(menu.menuBody);
        vm.editId = menu.id;
        vm.menuSelectedId = id;
        vm.menuName = menu.menuName;
        $anchorScroll('menuBody');
      }

      function deleteRecord(id){
        SweetAlert.confirm("是否确认删除该条历史记录信息?", {title : "提示"})
          .then(function(p) {
            if(p){
            WecorpAgentCustomMenuService.deleteMenuRecord().delete({id:id},
            function(data){
              getMenuList(vm.agent.agentid);
            },
            function(error){
              console.log(error);
            })
            };
          },
          function(p) {}
        );
      }

      function newMenu(){
        SweetAlert.confirm("确定放弃当前的编辑新建菜单记录?", {title : "提示"})
          .then(function(p) {
            if(p){
            vm.menus={};
            vm.editId=null;
            vm.menuSelectedId = -1;
            vm.menuName='';
            }
          },
          function(p) {}
        );

      }
      function releaseMenu(){
        vm.releaseMenuButtonCanClick = false;
        SweetAlert.confirm("确定发布当前菜单?", {title : "提示"})
          .then(function(p) {
            if(p){
              var sendBody ={
                "id":vm.editId,
                "agentid":vm.agent.agentid,
                "menuName":vm.menuName,
                "menuBody":JSON.stringify(vm.menus),
                "enableFlag":"Y"
              }
              WecorpAgentCustomMenuService.create().saveMenu(sendBody,
                function(data, headers) {
                  SweetAlert.success("发布成功!", {title: "提示"});
                  getMenuList(vm.agent.agentid);
                  vm.releaseMenuButtonCanClick = true;
                }, function(error) {
                  console.log('error');
                  vm.releaseMenuButtonCanClick = true;
                });
            }else{
              vm.releaseMenuButtonCanClick = true;
            }
          },
          function(p) {}
        );
      }
      function deleteReleaseMenu(){
        vm.deletereleaseMenuButtonCanClick = false;
        console.log(vm.agent.agentid)
        SweetAlert.confirm("确定清空已发布应用菜单?", {title : "提示"})
          .then(function(p) {
            if(p){
              WecorpAgentCustomMenuService.deleteReleaseMenu().delete({agentid:vm.agent.agentid},
                function(data, headers) {
                  SweetAlert.success("删除成功!", {title: "提示"});
                  getMenuList(vm.agent.agentid);
                  vm.deletereleaseMenuButtonCanClick = true;
                }, function(error) {
                  console.log('error');
                  vm.deletereleaseMenuButtonCanClick = true;
                });
            }else{
              vm.deletereleaseMenuButtonCanClick = true;
            }
          },
          function(p) {}
        );
      }
    }])
    .directive('focusMe', function($timeout) {
      return {
        scope: { trigger: '@focusMe' },
        link: function(scope, element) {
          scope.$watch('trigger', function(value) {
            if(value === "true") {
              $timeout(function() {
                element[0].focus();
              });
            }
          });
        }
      };
    });
})();
