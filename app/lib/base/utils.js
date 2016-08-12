angular.module('app').factory('utils', function (
    $rootScope,
    $state,
    $timeout,
    $ocLazyLoad,
    $stateParams,
    $ionicPopup,
    $ionicModal,
    regex_util,
    date_util,
    uuid_util,
    math_util,
    cookie_util,
    http_util,
    bo,
    htag
){
    var utils = {
        _:function (data) {
            var result = {CODE:null,data:null,message:null};
            if(data!==undefined && data!==null) {
                if(data.success!==undefined && data.success!==null)
                {
                    result.CODE = data.success;
                }
                if(data.message!==undefined && data.message!==null)
                {
                    result.message = data.message;
                }
                result.data = data;
            }
            else {
                result.CODE = false;
                result.message = '请求异常,请检查网路!';
                result.data = data;
            }
            return result;
        },
        regex: regex_util,
        date: date_util,
        cookie: cookie_util,
        http: http_util.http,
        httpGet:http_util.httpGet,
        jsonNoNull: http_util.jsonNoNull,
        jsonToNull: http_util.jsonToNull,
        bo: bo,
        htag: htag,
        timeout:$timeout,
        ocload:$ocLazyLoad,
        go:$state.go,
        urlParams:$stateParams,
        popup:$ionicPopup,
        modal:$ionicModal,
        uuid:uuid_util.uuid,
        double:{
            add:math_util.double.add,
            sub:math_util.double.sub,
            mul:math_util.double.mul,
            div:math_util.double.div
        }
    };

    return utils;
});
