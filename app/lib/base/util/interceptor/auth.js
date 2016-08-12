angular.module('app').factory('auth_util', function ($q) {
    var auth_util = {
        request:function(config){
            // if(config.url.substr(0,9)!='template/'){
            //     config.url = config.url + '?r='+globalConfig.random;
            // }
            return config;
        },
        response:function(response){
            if(response.config.url.indexOf(globalConfig.rootUrl)!=-1){
                if(response.data.opt!==undefined && response.data.opt!==null)
                {
                    response.data = response.data.opt;
                }
                // if(globalConfig.mode=='debug'){
                //     response.data = response.data.opt;
                // }else{
                //     response.data = eval('('+utils.security.decrypt(response.data.opt)+')');
                // }
            }
            // switch(response.data.code){
            //     case '100':
            //         if(!isSessionTimeout){
            //             if(response.config.url.indexOf('logout')==-1){
            //                 $rootScope.alert('会话过期','会话已过期，请重新登录！',function(){
            //                     $cookies.remove('session');
            //                     $rootScope.isLogin = false;
            //                     location.href='';
            //                 });
            //             }
            //         }
            //         isSessionTimeout = true;
            //         break;
            //     default:
            //         break;
            // }

            switch(response.status){
                case 401:
                    alert('对不起，您没有权限访问该模块！');
                    break;
                case 500:
                    alert('出bug了，猿们将火速抢修！');
                    break;
                default:
                    break;
            }

            return response;
        },
        requestError:function(request){
            console.log('【请求异常】');
            console.log(request);
            return $q.reject(request);
        },
        responseError:function(response){
            console.log('【响应异常】');
            console.log(response);
            return $q.reject(response);
        }
    };
    return auth_util;
});