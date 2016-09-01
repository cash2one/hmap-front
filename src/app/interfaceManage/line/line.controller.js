/**
 * Created by user on 2016/8/3.
 */
(function () {
    'use strict';

    angular.module('hmapFront')
        .controller('LineController', LineController);

    LineController.$inject = ['LineService', '$scope', '$state', 'entity','paginationConstants'];

    function LineController(LineService, $scope, $state, entity, paginationConstants) {
        var vm = this;

      vm.page = 1;
      vm.totalItems = null;
      vm.transition = transition;
      vm.pageChanged=pageChanged;
      vm.itemsPerPage = paginationConstants.itemsPerPage;

      vm.line = entity;
      vm.line.page = vm.page;
      vm.line.pagesize = paginationConstants.itemsPerPage;

        getHeader(vm.line);
      getLinesByHeaderId(vm.line);

      function getHeader(headerId){
        return LineService.getHeaderByHeaderId(headerId)
          .then(function(data){
            vm.header = data.rows[0];
          })

      };


        function getLinesByHeaderId(line) {
            return LineService.getLines(line)
                .then(function (data) {
                vm.lines = data.rows;
                vm.totalItems =  data.total;
                });

        };

      vm.search = function(){
        //每次搜索的时候把page设为 1
        vm.line.page = vm.page = 1;
        vm.line.pagesize = paginationConstants.itemsPerPage;

        if(vm.line.lineCode!=null && vm.line.lineCode === ""){
          vm.line.lineCode = undefined;
        }
        if(vm.line.lineName!=null && vm.line.name === ""){
          vm.line.lineName = undefined;
        }
        getLinesByHeaderId(vm.line);
      }



      function transition () {
        $state.transitionTo($state.$current, {
          page: vm.page
        });
      }

      function pageChanged() {
        console.log('Page changed to: ' +vm.page);
        vm.line.page = vm.page;
        vm.line.pagesize = paginationConstants.itemsPerPage;
        getLinesByHeaderId(vm.line);
      };


        $scope.addLine = function (header) {
            $state.go("addLine", {headerId: header.headerId});
        };


    }


})();
