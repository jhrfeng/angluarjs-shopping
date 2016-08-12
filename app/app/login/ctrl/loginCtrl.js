// angular.module('app').controller('welcomeCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, '$timeout') {
angular.module('app').controller('loginCtrl', ['$scope', '$rootScope', '$timeout','$state', function($scope, $rootScope, $timeout, $state) {
    (function init() {
        $scope.login = {username:"", password:""};
        $scope.vc = {};
        $scope.vc.entry = entry;
        $scope.vc.applogin = applogin;
        $scope.vc.clears = clears;
        $scope.vc.appRegister = appRegister;
        $rootScope.hideTab = true;

        $scope.err1 = "";
        $scope.err2 = "";
    })();

    function entry() {
        $state.go('kf.login.pwdback');
    }

    function applogin() {
        console.log($scope.login.username);
        if(!validuser($scope.login.username)){
            $scope.err1= "需手机号登录";
        }
        else if(!validtext($scope.login.password)){
            $scope.err2= "密码不正确";
        }
        else {
            alert("跳转首页");
        }
        
        //$state.go('kf.login.register');
    }
    
    function appRegister() {
        $state.go('kf.login.register');
    }

    function validtext(s){   
        var patrn=/^[a-zA-Z]{0,1}([a-zA-Z0-9]|[._]){4,19}$/;   
        if (!patrn.exec(s)) 
            return false 
        return true 
    }

    function validuser(s){
        var patrn=/^0?1[3|4|5|8][0-9]\d{8}$/;   
        if (!patrn.exec(s)) 
            return false 
        return true
    }

    function clears(s){
        console.log("vvv");
        if(s=='1')
            $scope.err1= "";
        else if(s=='2')
            $scope.err2= "";
    }


}])
