/**建议书模块入库**/
angular.module('app.route').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('kf.login', {
        url: "/login",
        cache:false,
        template: '<ion-nav-view></ion-nav-view>',
        controller: ['$rootScope', function($rootScope) {
            // $rootScope.go('kf.login.index');
            $rootScope.hideTab = true;
        }]
    }).state('kf.login.index', {
        url: "/index",
        templateUrl: function(){
            return 'app/login/view/login.html';
        },
        cache:true,
        controller: 'loginCtrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/login/ctrl/loginCtrl.js'
                ]);
            }]
        }
    }).state('kf.login.lock', {
        url: "/lock",
        templateUrl: function(){
            return 'app/login/view/lock.html';
        },
        cache:false,
        controller: 'lockCtrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/base/lib/jQuery/jQuery-2.1.4.min.js',
                    'app/login/ctrl/lockCtrl.js'
                ]);
            }]
        }
    }).state('kf.login.register', {
        url: "/register",
        templateUrl: function(){
            return 'app/login/view/register.html';
        },
        controller: 'registerCtrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/login/ctrl/registerCtrl.js'
                ]);
            }]
        }
    }).state('kf.login.registerll', {
        url: "/registerll",
        params: {moblie:"", validcode:""},
        templateUrl: function(){
            return 'app/login/view/registerll.html';
        },
        controller: 'registerCtrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/login/ctrl/registerCtrl.js'
                ]);
            }]
        }
    }).state('kf.login.registerlll', {
        url: "/registerlll",
        params: {userId:""},
        templateUrl: function(){
            return 'app/login/view/registerlll.html';
        },
        controller: 'registerCtrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/login/ctrl/registerCtrl.js'
                ]);
            }]
        }
    }).state('kf.login.pwdback', {
        url: "/pwdback",
        templateUrl: function(){
            return 'app/login/view/pwdback.html';
        },
        controller: 'pwdbackCtrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                   'app/login/ctrl/pwdbackCtrl.js'
                ]);
            }]
        }
    }).state('kf.login.pwdbackll', {
        url: "/pwdbackll",
        templateUrl: function(){
            return 'app/login/view/pwdbackll.html';
        },
        controller: 'pwdbackCtrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                   'app/login/ctrl/pwdbackCtrl.js'
                ]);
            }]
        }
    });
}]);
