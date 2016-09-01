/**
 * Created by user on 2016/8/8.
 */


(function(){
    'use strict';
    angular.module('hmapFront')
        .factory('AddLineService',AddLineService);

    AddLineService.$inject = ['$http'];

    function AddLineService($http){

        var service = {
            addLine : addLine
        };
        return service;

        function addLine(newLine){
            var resourceUrl = '/api/insertLine';
            var data = newLine;
            console.log("url="+angular.toJson(data));

            return  $http.post(resourceUrl, data, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log("addLine½Ó¿Ú", angular.toJson(response));
                return response.data;
            });

        }



    }


})();