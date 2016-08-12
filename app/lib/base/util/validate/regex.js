angular.module('app').factory('regex_util', function () {
    var regex_util = {
        /**
         * 正则数字
         * @param string
         * @returns {boolean}
         */
        isrNum: function (string) {
            var reg = /^\d+$/;
            return reg.test(string);
        }
    };

    return regex_util;
});
