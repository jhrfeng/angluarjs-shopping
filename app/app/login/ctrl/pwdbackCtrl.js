// angular.module('app').controller('welcomeCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, '$timeout') {
angular.module('app').controller('pwdbackCtrl', 
	['$scope', '$rootScope', '$timeout','$state','$interval',  
	function($scope, $rootScope, $timeout, $state, $interval) {
    (function init() {
        $scope.pwd = {
         mobile: "",
         validcode: "",
         title: "找回登录密码",
         password: "1",
         npassword: ""
        };

        $scope.err = true;
        $scope.err1 = "";
        $scope.err2 = "";
        
        $scope.vc = {};
        $scope.vc.pwdbackll = pwdbackll;
        $scope.vc.sendphonecode = sendphonecode;
        $scope.vc.updatePwd = updatePwd;
        $scope.vc.clears = clears;

        $rootScope.hideTab = true;

        $scope.paracont = "获取验证码";  
        $scope.paraclass = "enable-pointer-events";  
       // $scope.paraevent = true;  
        //$scope.vc.sendphonecode();   

    })();

    function sendphonecode(){
        $scope.paraclass = "disable-pointer-events";  
		var second = 60;
		timePromise = $interval(function(){  
          if(second<=0){  
            $interval.cancel(timePromise); 
          	timePromise = undefined;  
            second = 60;  
            $scope.paracont = "重发验证码";  
            $scope.paraclass = "enable-pointer-events";  
            //$scope.paraevent = true; 
          }else{  
            $scope.paracont = second + "秒后可重发";  
            second--;  
             
          }  
        },1000,100);
    }

    function pwdbackll() {
        if(!validuser($scope.pwd.mobile)){
          $scope.err1 = "手机号不正确";
        }else{
          $state.go('kf.login.pwdbackll');
        }
    }

// 更新密码
    function updatePwd(){
        if($scope.pwd.password!=$scope.pwd.npassword){
            $scope.err=false;
        }else{
            $scope.err=true;
            alert("设置成功！");
        }
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
