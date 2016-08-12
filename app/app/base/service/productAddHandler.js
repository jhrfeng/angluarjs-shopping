angular.module('app').factory('productAddHandler', ['utils', function (utils) {
    function createOption(options) {
        if (!productExtends) {
            var productExtends = [];//产品属性对象初始化
        }
        angular.forEach(options, function (option) {
            if (option.name == "pay_freq") {
                productExtends.push({
                    "tid": null,
                    "attCode": "pay_freq",
                    "attText": "",
                    "attValue": "year",
                    "attType": "1"
                })
            }
            else {
                productExtends.push(option.values[0]);
            }
        });
        return productExtends;
    };
    /**
     * 获取页面的所有产品和客户
     * @returns {{proposalProductVos: (*|Array), proposalCustomers: (*|Array)}}
     */
    function getProductVosAndCustomers(productList, riderList, mainId, proposalCustomers, productExtends) {
        //获取主约
        if (productList) {
            var insurance = productList.filter(function (item) {
                return item.code == mainId;
            })[0];
            var proposalProductVo = {
                "tid": null,  //标识
                "name": insurance.name, //产品名称
                "code": insurance.code, //产品code
                "insuranceType": insurance.isMain, //产品主附约类型  1 = 主约，2 = 附约
                "payPeriod": null, //缴费期间
                "insurePeriod": null,
                "premium": null, //保费
                "insuredId": null, //被保人id
                "insuredType": null, //被保人类型  暂时用不到
                "parentCodeId": null, //主约tid  主附约都需要
                "amount": null,//保额
                "cid": null,//引擎内产品id 后台返回 引擎内的对象叫 Commodity
                "insurerName": null,  //被保人姓名
                "pid": insurance.id,   //产品的xml id
                "productExtend": productExtends //产品属性对象
            };
            var proposalProductVos = []; //产品数组 包含主约和附约
            proposalProductVos.push(proposalProductVo); //

            if (riderList) {
                angular.forEach(riderList, function (item) {
                    if (item.choose)
                        proposalProductVos.push(item); //选择的附约增加进产品数组
                });
            }

            return {
                proposalProductVos: proposalProductVos, //产品大对象
                proposalCustomers: proposalCustomers //客户对象
            }
        }
    };
    function showAlert(str) {
        var alertPopup = utils.popup.alert({
            title: '规则提示',
            template: str,
            okText: '确认'
        });
    };

    return {
        /**
         * Handler  方法接受三个参数
         * reqData  传入参数
         * callback 回调方法
         * mode     调用模式(在线版、本地版)
         **/
        getAllProductList: function (reqData, callback, mode) {
            var result = {CODE: null, data: null};
            utils.http(utils.htag.htag_getAllProductList).success(function (data, status, headers, config) {
                // console.log('success ' + angular.toJson(data) + ' ' + status);
                result.CODE = true;
                result.data = data;
                callback(result);
            }).error(function (data, status, headers, config) {
                result.CODE = false;
                result.data = data;
                callback(result);
            })
        },

        getProductOption: function (reqData, callback, mode) {
            var result = {CODE: null, data: null, productExtends: null};
            var postObj = angular.copy(utils.bo.boPid);
            postObj.productId = reqData.pid;
            utils.http(utils.htag.htag_getProductOption, postObj).success(function (data, status, headers, config) {
                //console.log('success ' + angular.toJson(data) + ' ' + status);
                result.CODE = true;
                result.data = data;
                result.productExtends = createOption(data.data);
                callback(result);
            }).error(function (data, status, headers, config) {
                result.CODE = false;
                result.data = data;
                callback(result);
            })
        },

        mergeAnnuity: function (reqData, success, fail, start, end, mode) {
            utils.http(utils.htag.htag_mergeAnnuity, reqData).success(function (data, status, headers, config) {
                //console.log('success ' + angular.toJson(data) + ' ' + status);
                success(data);
            }).error(function (data, status, headers, config) {
                fail('fail ' + data + ' ' + status);
            }).then(function () {

            });
        },

        reCalAndCheckRule: function (reqData, callback, mode) {
            var result = {CODE: null, data: null};
            var reqDataResult = getProductVosAndCustomers(reqData.productList, reqData.riderList, reqData.mainId, reqData.proposalCustomers, reqData.productExtends);
            utils.http(utils.htag.htag_reCalAndCheckRule, reqDataResult).success(function (data, status, headers, config) {
                result.CODE = true;
                result.data = data;
                callback(result);
            }).error(function (data, status, headers, config) {
                result.CODE = true;
                result.data = data;
                callback(result);
            })
        },


        getProductRiderList: function (reqData, callback, mode) {
            var result = {CODE: null, data: null};
            utils.http(utils.htag.htag_getProductRiderList, reqData).success(function (data, status, headers, config) {
                //console.log('success ' + angular.toJson(data) + ' ' + status);
                result.CODE = true;
                result.data = data;
                callback(result);
            }).error(function (data, status, headers, config) {
                result.CODE = false;
                result.data = data;
                callback(result);
            })
        },

        getInterestItems: function (reqData, callback, mode) {
            var result = {CODE: null, data: null};
            var reqDataResult = getProductVosAndCustomers(reqData.productList, reqData.riderList, reqData.mainId, reqData.proposalCustomers, reqData.productExtends);
            utils.http(utils.htag.htag_getInterestItems, reqDataResult).success(function (data, status, headers, config) {
                reqDataResult.agent = reqData.agent;

                //console.log('success ' + angular.toJson(data) + ' ' + status);
                result.CODE = true;
                result.data = data;
                result.reqDataResult = reqDataResult
                callback(result);
            }).error(function (data, status, headers, config) {
                result.CODE = false;
                result.data = data;
                callback(result);
            })
        },
        reCalAndCheckRuleFull: function (reqData, callback, mode) {
            var result = {CODE: null, data: null};
            utils.http(utils.htag.htag_reCalAndCheckRule, reqData).success(function (data, status, headers, config) {
                result.CODE = true;
                result.data = data;
                callback(result);
            }).error(function (data, status, headers, config) {
                result.CODE = true;
                result.data = data;
                callback(result);
            })
        },
        getInterestItemsFull: function (reqData, callback, mode) {
            var result = {CODE: null, data: null};
            utils.http(utils.htag.htag_getInterestItems, reqData).success(function (data, status, headers, config) {
                result.agent = reqData.agent;

                //console.log('success ' + angular.toJson(data) + ' ' + status);
                result.CODE = true;
                result.data = data;
                callback(result);
            }).error(function (data, status, headers, config) {
                result.CODE = false;
                result.data = data;
                callback(result);
            })
        }
    };
}]);
