(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Guest', Guest);

  Guest.$inject = ['$http','$resource','Upload','BaseConfig','$localStorage','$sessionStorage'];

  function Guest ($http,$resource,Upload,BaseConfig,$localStorage,$sessionStorage) {
    var service = {
      guestLoadSearch: guestLoadSearch,
      guestUpdate: guestUpdate,
      guestImport: guestImport,
      guestExport:guestExport
    };
    return service;

    function guestLoadSearch(page,pageSize) {
      return $resource("/api/guestFound?page="+page+"&pageSize="+pageSize, {}, {
        'query': {method: 'POST', isArray: false}
      });
    }
    function guestUpdate() {
      return $resource("/api/guestUpdate", {}, {
        'update': {method: 'POST'}
      });
    }
    function guestImport(data) {
      var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
      Upload.upload({
        url: BaseConfig.url + '/api/guestImport',
        headers: {
          'Authorization': 'Bearer ' + token.access_token
        },
        data: {file: data}
      })
    }
    function guestExport(data) {
      //return $resource("/api/guestExport", {}, {
      //  'export': {method: 'POST'}
      //});
      //console.log("000000" + angular.toJson(data));
      //return $http.post('/api/guestExport',data,{responseType: 'arraybuffer'}).then(function (response) {
      //  var blob = new Blob([response], {type: "application/vnd.ms-excel"});
      //  var objectUrl = URL.createObjectURL(blob);
      //  var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
      //  $("body").append(aForExcel);
      //  $(".forExcel").click();
      //  aForExcel.remove();
        //var data = new Blob([response.data], { type: response.headers('Content-Type') });
        //var filename = response.headers('Content-Disposition').split(';')[1].trim().substr('filename='.length);
        //FileSaver.saveAs(data, filename);
      //});
      //$http.post('/api/guestExport', data
      //).success(function(data, status, headers, config) {
      //
      //  }).error(function(data, status, headers, config) {
      //
      //  });
      $http({
        url: '/api/guestExport',
        method: "POST",
        data: data,
        headers: {
          'Content-type': 'application/json'
        },
        responseType: 'arraybuffer'
      }).success(function (data, status, headers, config) {
        var blob = new Blob([data], {type: "application/vnd.ms-excel"});
        var objectUrl = URL.createObjectURL(blob);
        var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
        $("body").append(aForExcel);
        $(".forExcel").click();
        aForExcel.remove();
      }).error(function (data, status, headers, config) {
        //upload failed
      });

    }
  }
})();
