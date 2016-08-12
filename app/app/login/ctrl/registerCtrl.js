// angular.module('app').controller('welcomeCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, '$timeout') {
angular.module('app').controller('registerCtrl', 
	['$scope', '$rootScope', '$timeout','$state', '$stateParams', '$interval',
	function($scope, $rootScope, $timeout, $state, $stateParams, $interval) {
    (function init() {
    	$scope.step1 = {
    		moblie: "",
    		validcode: "",
    		status: false
    	};
    	$scope.step2 = {
    		userId: "",
    		moblie: "",
    		password: ""
    	};
    	$scope.step3 = {
    		userId: "",
    		name: "",
    		email: "",
    		classgroup: "",
    		shcool: ""
    	};
        $scope.vc = {};
        $scope.vc.step2 = step2;
        $scope.vc.step3 = step3;
        $scope.vc.sendphonecode = sendphonecode;
        $rootScope.hideTab = true;

        $scope.paracont = "获取验证码";  
        $scope.paraclass = "but_null";  
        $scope.paraevent = true;  
        $scope.vc.sendphonecode();
        $scope.vc.clears = clears;
        $scope.vc.switchpwd = switchpwd;
        $scope.vc.submitInfo = submitInfo;

        $scope.pwdshow = "password";
        $scope.err1= "";   

    })();

    function switchpwd(){
        console.log($scope.pwdshow);
        if($scope.pwdshow=="text"){
            $scope.pwdshow= "password";
        }else{
            $scope.pwdshow= "text";
        }
        console.log($scope.pwdshow);
    }

    function submitInfo(){
        alert("恭喜你完善个人信息，即将跳转到首页");
    }

    function step2() {
    	// 验证是否有效
    	$scope.step1.status = true;

    	// if($scope.step1.status){
    	// 	$state.go('kf.login.registerll', $scope.step1);
    	// }else{
    	// 	alert("验证码错误");
    	// }

        if(!validuser($scope.step1.moblie)){
          $scope.err1 = "手机号不正确";
        }else{
          $state.go('kf.login.registerll', $scope.step1);
        }
    }
    
    function step3() {
        if(!validtext($scope.step2.password)){
            $scope.err2= "密码不正确";
        }else{
            $state.go('kf.login.registerlll');
        }

  //   	console.log($stateParams);
  //   	//valid password valid
  //   	if($scope.step2.password === $scope.step2.npassword
  //   		&& true) // 符合密码规则
  //   	{
  //   	// send server and genenrate validUser callback
  //   	$scope.step2.moblie= $stateParams.moblie;
		// }

    	//if(callback)
//        	$state.go('kf.login.registerlll');
        //else
        	// server error
    }

     function sendphonecode(){
        var second = 60;
        timePromise = $interval(function(){  
          if(second<=0){  
            timePromise = undefined;  
           // second = 60;  
            $scope.paracont = "重发验证码";  
            $scope.paraclass = "but_null";  
            $scope.paraevent = true; 
            $interval.cancel(timePromise);   
          }else{  
            $scope.paracont = second + "秒后可重发";  
            $scope.paraclass = "not but_null";  
            second--;  
             
          }  
        },1000,100);
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
