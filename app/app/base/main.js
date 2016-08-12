globalConfig = {
    rootUrl:'http://0.0.0.0:9000/',
    plat:'WX' // 微信,
};
(function (document){
    angular.module('app.route',[]);
    if(globalConfig.plat ==='WX'){
        angular.module('app', ['ionic', 'oc.lazyLoad','app.route']);
    }
    var routerList = [
        'app/menu/menu.js',
        'app/home/home.js',
        'app/login/login.js'
    ];
    var str = '';
    routerList.forEach(function (router) {
        str += '<script src="' + router + '"></script>';
    });
    document.write(str);
}(document));

angular.module('app.route').config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/kf/login/index');
}]);

(function (document){
    var libList = [
        'lib/base/utils.min.js',
        'app/base/conf/bo.js',
        'app/base/conf/interface.js',
        'app/base/other/filter.js'
    ];
    var str = '';
    libList.forEach(function (lib) {
        str += '<script src="' + lib + '"></script>';
    });
    document.write(str);
}(document));

//延迟加载
// var lazyloadlib=[
// //    'app/base/lib/jQuery/jQuery-2.1.4.min.js',
//     'app/base/directive/datepicker.js',
//     'app/base/directive/cdatepicker/cdatepicker.js',
//     'app/base/directive/echarts.js',
//     'app/base/directive/ionaffix.js'
// ];