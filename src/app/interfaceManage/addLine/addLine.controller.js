/**
 * Created by user on 2016/8/8.
 */

(function () {
    'use strict';

    angular.module('hmapFront')
        .controller('AddLineController', AddLineController);

    AddLineController.$inject = ['AddLineService', '$state','entity'];

    function AddLineController(AddLineService,$state,entity) {
        var vm = this;
        vm.line = entity;
        vm.add = add;
        vm.clear = clear;

        vm.flag = [
            {code : "Y", name : "是"},
            {code : "N", name : "否"}
        ];


        function add(){
            return AddLineService.addLine(vm.line)
                .then(function(data){
                    vm.result = data;
                    if(data.success){
                        return $state.go("line",{headerId:entity.headerId});
                    }
                });

        }

        function clear(){
            $state.go("line",{headerId:entity.headerId});
        }



    }


})();
