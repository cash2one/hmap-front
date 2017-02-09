/**
 * Created by Administrator on 2016/9/12.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ApplicationEditController', ApplicationEditController);

  ApplicationEditController.$inject = ['$stateParams','$state','Application','$scope',  'entity','paginationConstants'];

  function ApplicationEditController($stateParams,$state, Application,$scope, entity, paginationConstants) {
    var vm = this;
    vm.token = null;
    vm.agent = null;
    vm.mediaId = "";
    vm.image = "";
    vm.load = load;
    vm.save = save;
    vm.uploadfile =uploadfile;
    vm.load($stateParams.id);

    function load(id) {
      Application.getToken1().then(function (data) {
        vm.token = data;
        ////console.log("000000" + vm.token);
        Application.getDetail(vm.token,id).then(function (data) {
          ////console.log("000000" + angular.toJson(data, true));
          vm.agent = data;
          if(vm.agent.type == 1) {
            vm.agent.type = "消息型应用";
          }else {
            vm.agent.type = "应用型应用";
          }
        })
      })
    }
    function save() {
      vm.agent.close = null;
      var filename = document.getElementById('field_img').files[0];
      var formdata = new FormData();
      formdata.append("media",filename);
      ////console.log("000000" + filename);
      Application.getToken1().then(function (data) {
        vm.token = data;
        ////console.log("000000" + vm.token);

      }).then(function() {

      })
      Application.getMediaId(vm.token,formdata).then(function (data) {
        ////console.log("000000" + angular.toJson(data, true));
        vm.mediaId = data.media_id;
        vm.agent.logo_mediaid = data.media_id;
        ////console.log("000000" + angular.toJson(vm.agent));
      })

      //Application.getToken1().then(function (data) {
      //  vm.token = data;
      //  ////console.log("000000" + vm.token);
      //  Application.saveAgent(vm.token,vm.agent).then(function (data) {
      //    ////console.log("000000" + angular.toJson(data, true));
      //  })
      //})
    }

    function uploadfile() {
      var filename = document.getElementById('field_img').files[0];
      var formdata = new FormData();
      formdata.append("media",filename);
      ////console.log("000000" + filename);
      Application.getToken1().then(function (data) {
        vm.token = data;
        ////console.log("000000" + vm.token);
        Application.getMediaId(vm.token,formdata).then(function (data) {
          ////console.log("000000" + angular.toJson(data, true));
          vm.mediaId = data.media_id;
        })
      })
    }

  }

})();
