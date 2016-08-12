/**首页入口**/
angular.module('app.route').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('kf.home', {
        url: "/home",
        cache:false,
        template:'<ion-nav-view></ion-nav-view>',
        controller:['$rootScope',function($rootScope){
            $rootScope.menu = 'home';
        }]
    }).state('kf.home.welcome', {
        url: "/welcome",
        cache: false,
        templateUrl: function(){
            return 'app/home/view/welcome.html';
        },
        controller: 'welcomeCtrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/home/ctrl/welcomeCtrl.js'
                ]);
            }]
        }
    }).state('kf.home.index', {
        url: "/index",
        cache: false,
        templateUrl: function(){
            return 'app/home/view/home.html';
        },
        controller: 'homeCtrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/home/service/homeHandler.js',
                    'app/home/ctrl/homeCtrl.js'
                ]);
            }]
        }
    })
    .state('kf.home.policy', {
            url: "/policy",
            cache: true,
            templateUrl: function() {
                return 'app/insur/view/policy.html';
            },
            controller: 'policyList',
            resolve: {
                load: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/insur/ctrl/policyListCtrl.js',

                    ]);
                }]
            }
        }).state('kf.home.policychange', {
            url: "/policychange",
            cache: false,
            templateUrl: function() {
                return 'app/policychange/view/policychange.html';
            },
            controller: 'policychangeCtrl',

            resolve: {
                load: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/policychange/ctrl/policychangeCtrl.js',
                    ]);
                }]

            }
        })
        .state('kf.home.information', {
            url: "/information",
            cache: false,
            templateUrl: function() {
                return 'app/myInformation/view/information.html';
            },
            controller: 'information',

            resolve: {
                load: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/myInformation/ctrl/informationCtrl.js',
                    ]);
                }]

            }
        });
}]);
