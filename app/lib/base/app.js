angular.module('app').config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    (function initView() {
        
        $ionicConfigProvider.backButton.text("");
        $ionicConfigProvider.backButton.previousTitleText(false);

        var element = angular.element(document.querySelector('.sc-navbtn'));
        element.removeClass("button-clear");
    })();

});

angular.module('app').controller('startCtrl', function ($scope,$rootScope,$ocLazyLoad,$state,$location,cookie_util) {

    var urlParams = $location.search();

    (function init() {
        $scope.rootvo = {};
        $rootScope.rootvc = {};
//removeIf(zzdebug)
        console.log($location.absUrl());
        console.log($location.url());
        console.log($location.path());
        console.log($location.protocol());
        console.log($location.host());
        console.log($location.port());
        console.log($location.search());
        //#?s=1 //TODO: ...@_@... 必须在#后面 http://localhost:63342/zzf/www/index.html#?sid=3123123
        if($location.search()['sid'])
        {
            console.log($location.search()['sid']);
        }
//endRemoveIf(zzdebug)
        if($location.search()['sid'])
        {
            cookie_util.put('sid',$location.search()['sid']);
        }
        // console.log('');
    })();

    //removeIf(zzdebug)
    // //设置页面路由变换时所需要设置的事件
    // $rootScope.$on("$ionicView.beforeEnter", function(event, data) {
    //     //底部bar显示
    //     $scope.tabActive = data.stateName;
    //     switch(data.stateName){
    //         case "tabs.mall":
    //             $rootScope.tabsshow="";
    //             break;
    //         case "tabs.map":
    //             $rootScope.tabsshow="";
    //             break;
    //         case "tabs.menu":
    //             $rootScope.tabsshow="";
    //             break;
    //         case "tabs.jour":
    //             $rootScope.tabsshow="hide";
    //             var a = angular.element(document.querySelector('.sc-navbar'));
    //             a.classList.remove("hide");
    //             a.classList.add("dark");
    //             break;
    //         default:
    //             $rootScope.tabsshow="hide";
    //             break;
    //     }
    // });
    //
    // $rootScope.$on("$ionicView.beforeLeave",function(event, data) {
    //     switch(data.stateName){
    //         case "tabs.jour":
    //             var a = angular.element(document.querySelector('.sc-navbar'));
    //             a.classList.remove("dark");
    //             console.log("detail");
    //             break;
    //     }
    // });
    //endRemoveIf(zzdebug)

    //removeIf(zzdebug)
    $rootScope.rootvc.toMenu = function(type){
        switch (type){
            case "zouke":
            {
                $ocLazyLoad.load([
                    'app/zouke/zouke.js'
                ]).then(function () {
                    $state.go('zouke');
                });
            }
                break;
            case "":
            {}
                break;
            default :
            {}
        }
        // utils.go(type);
    };
    //endRemoveIf(zzdebug)

    (function initData() {
        $ocLazyLoad.load([
            // //removeIf(zzdebug)
            // 'lib/base/util/ui/ui.js',
            // 'lib/base/util/uuid/uuid.js',
            // 'lib/base/util/math/math.js',
            // 'lib/base/util/validate/regex.js',
            // 'lib/base/util/date/date.js',
            // 'lib/base/util/cookie/cookie.js',
            // 'lib/base/util/http/http.js',
            // //endRemoveIf(zzdebug)
            // 'lib/base/utils.js',
            //
            // 'app/base/conf/bo.js',
            // 'app/base/conf/interface.js',
            //
            // 'app/base/other/filter.js',
        ]).then(function () {
            //removeIf(zzdebug)
            // if(urlParams)
            // {
            //     if(urlParams.s ==='1')
            //     {
            //         $ocLazyLoad.load([
            //             'app/test/test.js',
            //         ]).then(function () {
            //             $state.go('test');
            //         });
            //     }
            //     else if(urlParams.s ==='2')
            //     {
            //         $ocLazyLoad.load([
            //             'app/demo/demo.js',
            //         ]).then(function () {
            //             $state.go('demo');
            //         });
            //     }
            //     else
            //     {
            //         $ocLazyLoad.load([
            //             'app/test/test.js',
            //         ]).then(function () {
            //             $state.go('test');
            //         });
            //     }
            // }
            //endRemoveIf(zzdebug)

            // $ocLazyLoad.load([
            //     'app/test/test.js',
            //     // 'app/demo/demo.js',
            // ]).then(function () {
            //     $state.go('test');
            //     // $state.go('demo');
            // });
        });
    })();
});
//removeIf(zzdebug)
// app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
//     for(var i=0;i<app.states.length;i++){
//         var state = app.states[i];
//         (function(i){
//             $stateProvider.state(state[0],state[1]);
//         })(i);
//     }
// });
//
// app.states = [];
//
// app.state = function(state){
//     app.states.push(state);
//     return app;
// };

// app.state(['zouke',{
//     url: "/zouke",
//     // abstract: true,
//     templateUrl: function(){
//         return 'app/zouke/view/zouke.html';
//     },
//     controller: 'zoukeCtrl',
//     resolve: {
//         load: ['$ocLazyLoad', function ($ocLazyLoad) {
//             return $ocLazyLoad.load([
//                 'app/zouke/ctrl/zoukeCtrl.js',
//                 'app/zouke/service/zoukeHandler.js'
//             ]);
//         }]
//     }
// }]);
//endRemoveIf(zzdebug)

angular.module('app').config(function ($httpProvider) {
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
            value = obj[name];
            if (value instanceof Array) {
                for (i = 0; i < value.length; i++) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName
                        + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined
                && value !== null) {
                query += encodeURIComponent(name) + '='
                    + encodeURIComponent(value) + '&';
            }
        }
        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // $httpProvider.defaults.transformRequest.shift();
    // $httpProvider.defaults.transformRequest.push(function(data) {
    // 	return angular.isObject(data)&& String(data) !== '[object File]' ? param(data) : data;
    // });

    
    // $httpProvider.defaults.transformRequest = [function (data) {
    //     return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    // }];
    $httpProvider.interceptors.push('auth_util');
});

angular.bootstrap(document, ['app']);