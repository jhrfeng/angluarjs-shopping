angular.module('app.route').filter('optionFilter', function () {
    return function (val) {
        if (val == 'pay') {
            return "交费期间";
        } else if (val == 'insure') {
            return "保险期间";
        }
    };
}).filter('shortFilter', function () {
    return function (value, length) {
        length = length || 12;
        if (value && value.length > length) {
            value = value.substr(0, length) + '...';
        }
        return value;
    };
}).filter('sexFilter', function () {
    return function (value, length) {
        return value == '1' ? '男' : '女';
    };
});