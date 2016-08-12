angular.module('app.route').factory('allHandler', ['utils', function (utils) {
    return {
        testFunc: function (reqData, callback, mode) {
            callback();
        }
    };
}]);
