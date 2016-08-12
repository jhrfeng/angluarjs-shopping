angular.module('app').factory('loginHandler', ['utils', 'dateFormat', function (utils, dateFormat) {
	return {
       login: function (request, success, fail, start, end, mode) {
            var data = globalConfig.request;
            data.packageList.packages.request.customer = request;
            data.packageList.packages.header.requestType = 'LOGIN';
            data.packageList.packages.header.sendTime = "2016-02-29 09:54:26"; //utils.format(new Date());
            console.log(dateFormat.format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
            console.log(data);

            utils.http(utils.htag.htag_login, data).success(function (data, status, headers, config) {
                alert('success');
                success(data);
            }).error(function (data, status, headers, config) {
                fail();
            }).then(function () {
                alert('then');
            });
        }
	};
}])