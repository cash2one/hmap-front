/**
 * Created by user on 2016/8/8.
 */

(function () {
    'use strict';

    angular.module('hmapFront')
        .controller('EditLineController', EditLineController);

    EditLineController.$inject = ['EditLineService', '$state', 'entity'];

    function EditLineController(EditLineService, $state, entity) {
        var vm = this;
        vm.line = entity;
        vm.update = update;
        vm.clear = clear;

        var lineId = vm.line.lineId;
        getLine(lineId);

        vm.flag = [
            {code: "Y", name: "是"},
            {code: "N", name: "否"}
        ];

        function getLine(lineId) {
            return EditLineService.getLine(lineId)
                .then(function (data) {
                    console.log("Result=" + angular.toJson(data.rows));
                    return vm.line = data.rows[0];
                });
        }

        function update() {
            return EditLineService.updateLine(vm.line)
                .then(function (data) {
                    vm.result = data;
                    if (data.success) {
                        return $state.go("line", {headerId: vm.line.headerId});
                    }
                });

        }

        function clear() {
            $state.go("line", {headerId: vm.line.headerId});
        }


    }


})();
