/**
 * Created by user on 2016/8/8.
 */

(function () {
    'use strict';
    angular.module('hmapFront')
        .factory('EditLineService', EditLineService);

    EditLineService.$inject = ['$http'];

    function EditLineService($http) {

        var service = {
            updateLine: updateLine,
            getLine: getLine
        };
        return service;

        function getLine(lineId) {
            var resourceUrl = '/api/queryLine';
            return $http.post(resourceUrl, {lineId: lineId}, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log("queryLine接口", angular.toJson(response));
                return response.data;
            });

        }

        function updateLine(newLine) {
            var resourceUrl = '/api/updateLine';
            var data = newLine;
            console.log("url=" + angular.toJson(data));

            return $http.post(resourceUrl, data, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log("addLine接口", angular.toJson(response));
                return response.data;
            });

        }


    }


})();
