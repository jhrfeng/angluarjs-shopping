angular.module('app').factory('homeHandler',['utils','htag',function(utils,htag){
    return {
        getLBPicture: function (success, fail, start, end, mode) {
            var pictureParams = {
                "packageList": {
                    "packages": {
                        "header": {
                            "requestType": "LBPICTURE",
                            "comId": "KF20160707",
                            "from": "PAD",
                            "sendTime": "2016-02-29 09:54:26",
                            "orderSerial": "comSerial",
                            "productCode": ""
                        },
                        "request": {
                            "customer": {
                                "deviceNo": "A1000038B0DFD99",
                                "fromChannel": "IOS",
                                "lbpicModular": "1"
                            }
                        }
                    }
                }
            };
            var jsonStr = JSON.stringify(pictureParams);
            utils.http(htag.htag_login,pictureParams).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data, status, headers, config) {
                fail(result);
            });
        },
        getCityList: function (success, fail, start, end, mode) {
            utils.http({url:globalConfig.rootUrl+'app/home/data/city.json?_='+Math.random(),mode:"GET"}).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data, status, headers, config) {
                fail(data);
            });
        }
    };
}]);