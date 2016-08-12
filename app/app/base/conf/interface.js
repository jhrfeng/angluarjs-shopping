angular.module('app.route').factory('htag', function () {
    function URL(url) {
        return globalConfig.rootUrl + url;
    }

    var SERVICE_LOGIN = "com.ifp.ipartner/interfaceChannel?sign=2646d8800761041c6f3438de7bae35ff&com_id=KF20160707";
    var SERVICE_LOGOUT = "avtivity/logout";
    var SERVICE_getProductOption = "proposal/getProductOption";
    var SERVICE_getAllProductList = "proposal/getAllProductList";  //获取所有产品列表
    var SERVICE_mergeAnnuity = "proposal/mergeAnnuity";
    var SERVICE_reCalAndCheckRule = "proposal/reCalAndCheckRule";
    var SERVICE_getProductRiderList = "proposal/getProductRiderList";
    var SERVICE_getInterestItems = "proposal/getInterestItems";


    var htag = {
        htag_login: {url: URL(SERVICE_LOGIN)},
        htag_logout: {url: URL(SERVICE_LOGOUT)},

        //============建议书
        htag_getProductOption: {url: URL(SERVICE_getProductOption)},
        htag_getAllProductList: {url: URL(SERVICE_getAllProductList)},
        htag_mergeAnnuity: {url: URL(SERVICE_mergeAnnuity)},
        htag_reCalAndCheckRule: {url: URL(SERVICE_reCalAndCheckRule)},
        htag_getProductRiderList: {url: URL(SERVICE_getProductRiderList)},
        htag_getInterestItems: {url: URL(SERVICE_getInterestItems)},

        //============在线投保

    };

    return htag;
});
