angular.module('app').controller('menuCtrl',['$rootScope','$state',function($rootScope,$state){
    $rootScope.go = function(state,params){
        if(state == -1){
            history.back();
        }else{
            $state.go(state,params);
        }
    }
}]);