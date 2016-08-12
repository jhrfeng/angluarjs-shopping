// angular.module('app').controller('welcomeCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, '$timeout') {
angular.module('app').controller('welcomeCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
    (function init() {
        $scope.vo = {};
        $scope.vc = {};
        $scope.vc.entry = entry;
        $rootScope.hideTab = true;
    })();

    function entry() {
        alert("1111");
        if (!$rootScope.unlocked && localStorage.getItem('passwordxx')) {
            $rootScope.go('kf.login.lock');
        } else {
            $rootScope.go('kf.home.index');
        }
    }

    function initLock() {
        // $timeout(entry, 2000);
    };
    (function initProcess() {
        initLock();
    })();
}])
