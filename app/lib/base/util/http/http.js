angular.module('app').factory('http_util', function ($http,cookie_util) {

    /**
     *去除json Null
     */
    // function formatParam(params) {
    // 	var newParams;
    // 	if(Object.prototype.toString.call(params) === '[object Array]'){
    // 		newParams = [];
    // 		for(var i in params){
    // 			if(typeof params[i] != 'object'){
    // 				newParams[i] = params[i];
    // 			}else{
    // 				newParams[i] = formatParam(params[i]);
    // 			}
    // 		}
    // 	}else{
    // 		var oldParams = angular.extend({},params);
    // 		newParams = {};
    // 		for (var i in oldParams) {
    // 			if (oldParams[i] || oldParams[i]===0) {
    // 				if(typeof oldParams[i] == 'object'){
    // 					oldParams[i] = formatParam(oldParams[i]);
    // 				}
    // 				newParams[i] = oldParams[i];
    // 			}
    // 		}
    // 	}
    // 	return newParams;
    // }

    function delNull(data) {
        (function filter(obj) {
            angular.forEach(obj, function (value, key) {
                // if (value === "" || value === null || value === undefined){
                if (value === null || value === undefined) {
                    delete obj[key];
                } else if (Object.prototype.toString.call(value) === '[object Object]') {
                    filter(value);
                } else if (Array.isArray(value)) {
                    value.forEach(function (el) {
                        filter(el);
                    });
                }
            });
        })(data);
        return data;
    }

    function toNull(data) {
        (function filter(obj) {
            angular.forEach(obj, function (value, key) {
                if (value !== null){
                    obj[key] = null;
                } else if (Object.prototype.toString.call(value) === '[object Object]') {
                    filter(value);
                } else if (Array.isArray(value)) {
                    value.forEach(function (el) {
                        filter(el);
                    });
                }
            });
        })(data);
        return data;
    }

    function jsonNoNull(data) {
        return angular.toJson(delNull(data));
    }

    function jsonToNull(data) {
        return angular.toJson(toNull(data));
    }

    function post(urlStr, data, config) {
        // console.log(angular.toJson(formatParam(data)));
        // console.log('hello'+angular.toJson({opt:delNull(data)}));
        // var promise = $http.post(urlStr,{opt:angular.toJson(formatParam(data))},angular.extend({timeout:30000},config));
        // var promise = $http.post(urlStr,{opt:angular.toJson(data)},angular.extend({timeout:30000},config));
        var promise = $http.post(urlStr, {opt: jsonNoNull(data)}, angular.extend({timeout: 30000},{headers: {'sid': getSessionId()}}, config));
        return promise;
    }

    function get(hurl,config) {
        return $http.get(hurl,angular.extend({headers: {'sid': getSessionId()}}, config));
    }

    function getSessionId() {
        var sessionid = cookie_util.get('sid');
        if(sessionid === undefined || sessionid === null){
            sessionid ='';
        }
        return sessionid;
    }

    var http_util = {
        http: function (htagObj, params, config) {
            // return reg.test(string);
            // console.log(htagObj.url);
            // console.log(params);
            if(htagObj.mode && (htagObj.mode ==='GET'||(htagObj.mode ==='get')))
            {
                return get(htagObj.url, config);
            }else
            {
                return post(htagObj.url, params, config);
            }
        },
        httpGet: function (hurl,config) {
            return get(hurl, config);
        },
        jsonNoNull:jsonNoNull,
        jsonToNull:jsonToNull
    };

    return http_util;
});
