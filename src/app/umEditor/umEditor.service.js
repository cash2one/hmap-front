/**
 * Created by zhusifeng on 2016/9/8.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('umEditorService', umEditorService);

  umEditorService.$inject = ['$resource', '$http','$q','$log'];

  function umEditorService($resource, $http,$q, $log) {
    var service = {
      addAttachmentGroup:addAttachmentGroup,
      queryAttachmentGroup:queryAttachmentGroup,
      queryAttachment:queryAttachment,
      checkData:checkData,
    /*  uploadMyImg: uploadMyImg,
      readAsDataUrl: readAsDataURL,
      onLoad: onLoad,
      getReader: getReader,
      onError: onError,*/
      submitInfo:submitInfo,
      queryAllTemplate:queryAllTemplate,
      savePublish:savePublish,
      perview:perview,

    };
    return service;
    function addAttachmentGroup(data){
      var resourceUrl = '/api/attachmentGroup/add';
      return $http.post(resourceUrl,data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        //console.log("response: " + angular.toJson(response.data));
        return response.data;
      });
    }

    function queryAttachmentGroup(){
      var resourceUrl = '/api/attachmentGroup/query';
      return $http.get(resourceUrl).then(function (response) {
        //console.log("response: " + angular.toJson(response.data));
        return response.data;
      });
    }

    function queryAttachment(data){
      var resourceUrl = '/api/attachment/query';
      return $http.post(resourceUrl,data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        //console.log("response: " + angular.toJson(response.data));
        return response.data;
      });
    }

    function checkData(article){
      var message='';
      if(isNUll(article.contentTitle)){
        message='标题不能为空';
      }else if(isNUll(article.contentBody)){
        message='正文不能为空';
      }else if(isNUll(article.contentCover)){
        message='封面不能为空';
      }else if(isNUll(article.templateId)){
        message='模版不能为空';
      }
      return message;
    }
    function isNUll(_target){
      if(_target==undefined || _target==null || _target==''){
        return true;
      }
      return false;
    }

    function submitInfo(data){
      var resourceUrl = '/api/content/save';
      return $resource(resourceUrl,{},{
        'insert':{method:'POST'}
      })
    }

    function queryAllTemplate(){
      var resourceUrl = '/api/template/query';
      return $resource(resourceUrl,{},{
        'query':{method:'GET'}
      })
    }

    function savePublish(){
      var resourceUrl = '/api/content/savePublish';
      return $resource(resourceUrl,{},{
        'save':{method:'POST'}
      })
    }

    function perview(){
      var resourceUrl = '/api/content/perview';
      return $resource(resourceUrl,{},{
        'perview':{method:'POST'}
      })
    }

   /* function onLoad(reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.resolve(reader.result);
        });
      };
    }
    function onError(reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.reject(reader.result);
        });
      };
    }
    function getReader(deferred, scope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      return reader;
    }
    function readAsDataURL(file, scope) {
      var deferred = $q.defer();
      var reader = getReader(deferred, scope);
      reader.readAsDataURL(file);
      return deferred.promise;
    }
    function uploadMyImg(file){
      var resourceUrl = '/api/objectUploadNoThumbnail';
      return $http.post(resourceUrl,file, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function (response) {
        console.log("000000" + angular.toJson(response.data));
        return response.data;
      })
    }*/
  }

})();
