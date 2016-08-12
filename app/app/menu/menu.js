angular.module('app.route').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('kf', {
        url: "/kf",
        templateUrl: function(){
            return 'app/menu/view/tabs.html';
        },
        controller: 'menuCtrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/menu/ctrl/menuCtrl.js',
                ]);
            }]
        }
    });
}]).run(['$rootScope', '$state',function($rootScope, $state){
    var hideTabPages = ['kf.login.lock', 
                        'kf.login.index', 
                        'kf.login.register',
                        'kf.login.registerll',
                        'kf.login.registerlll',
                        'kf.login.pwdback'];
    var safePages = ['kf.login.pwdbackll', 
                     'kf.login.index', 
                     'kf.login.register',
                     'kf.login.registerll',
                     'kf.login.registerlll',
                     'kf.login.pwdback', 
                     'kf.home.index', 
                     'kf.home.welcome'];
    $rootScope.hideTab = false;
    $rootScope.$on('$stateChangeSuccess',function(event, toState,toParams, fromState,fromParams) {
        $rootScope.backButtonPressedOnceToExit = false;  
        if(hideTabPages.indexOf(toState.name)!=-1){
            $rootScope.hideTab = true;
        }else{
            $rootScope.hideTab = false;
        }

        if(safePages.indexOf(toState.name)==-1){
            if(!$rootScope.user){
                if (localStorage.getItem('user')) {
                    $rootScope.user = angular.fromJson(localStorage.getItem('user'));
                };
            }
            if(!$rootScope.user){
                $state.go('kf.login.index');
            }
        }
    });
}]);