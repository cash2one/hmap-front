(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('DeviceController', DeviceController);
  DeviceController.$inject = ['$state','Device','paginationConstants'];
  /** @ngInject */
  function DeviceController($state, Device, paginationConstants) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.loadByName = loadByName;
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.foundByName="";
    vm.loadByName();
    vm.platform = [];
    vm.changeFlag = changeFlag;
    vm.labels = [];
    vm.series = ['android', 'ios'];
    vm.data =   [];
    vm.datasetOverride1 = [
        {
          borderWidth: 1,
          hoverBackgroundColor: '#23c6c8',
          hoverBorderColor: '#23c6c8',
          backgroundColor:'#1ab394',
          type: 'bar'
        },
        {

          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          type: 'bar'
        }
      ];
    vm.pielabels = [];
    vm.piedata = [];
    vm.pieoptions = { legend: { display: true } };
    vm.datasetOverride2 = {
      hoverBackgroundColor: ['#45b7cd', '#ff6384', '#ff8e72'],
      hoverBorderColor: ['#45b7cd', '#ff6384', '#ff8e72']
    };
    vm.colors= ['#1ab394', '#f8ac59'];
    vm.barOptions = {
      legend: {
        display: true,
        position:'top',
        fullWidth:true,
        labels: {
          fontColor: 'rgb(255, 99, 132)'
        }
      }
    };
    function changeFlag(deviceId){
      Device.updateByDeviceId().post({
        deviceId:deviceId
      }, updateSuccess, onError);
    };

    function loadByName(){
      Device.selectByDeviceUser().get({
        deviceUser:vm.foundByName
      }, onSuccess, onError);
      Device.getStatistic().query({},function(data,headers){
        vm.platform = data.rows[0].platform;
        var status = data.rows[0].status;
        var systems = data.rows[0].bars;
        vm.pielabels[0] = "正常";
        vm.piedata[0] = status.Y;
        vm.piedata[1] = status.N;
        vm.pielabels[1] = "禁用";
        var arr = [];
        for(var i=0;i<systems.length;i++){
          vm.labels[i]=systems[i].operationSystemVersion;
          arr[i]=[];
          for(var j=0;j<systems[i].barsList.length;j++){
            arr[i][j] = systems[i].barsList[j].value;
          }
        }
        vm.data = transform(arr);
      },onError);
    }

    //二维数组转置
    function transform(old){
      var arr = [];
      for (i=0;i<old[0].length;i++ ){
        arr[i]=[];
      }
      for(var i=0;i<old.length;i++){
        for(var j=0;j<old[i].length;j++){
          arr[j][i]=old[i][j];
        }
      }
      return arr;
    }
    function loadAll() {
      Device.selectByDeviceUser().query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      vm.devices = data.rows;
      vm.totalItems =  data.total;
    }
    function updateSuccess(data, headers) {
      console.log('updateSuccess');
      console.log(data);
      console.log(vm.devices)
      for(var i=0;i<vm.devices.length;i++){
        if(data.rows[0].deviceId == vm.devices[i].deviceId){
          vm.devices[i].deviceFlag = data.rows[0].deviceFlag;
          return;
        };
      }

    }
    function onError(error) {
      console.log('error');
    }
    function transition () {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      console.log('Page changed to: ' +vm.page);
      loadAll();
    };
  }
})();
