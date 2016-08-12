angular.module('app.route').constant("bo", {
    "boTest": {
        "age": null
    },
    "boPid": {
        "productId": null
    },
    "boLogin": {
        "username": null,
        "password": null,
        "passwordTest": null
    },

    "boProposalProductVo": {
        "tid": null,
        "name": null,
        "code": null,
        "insuranceType": null,
        "payPeriod": null,
        "insurePeriod": null,
        "premium": null,
        "insuredId": null,
        "insuredType": null,
        "parentCodeId": null,
        "amount": null,
        "cid": null,
        "insurerName": null,
        "pid": null,
        "productExtend": [],
    },

    //投,被保人
    "boProposalCustomer": {
        "tid": null,
        "type": null,
        "relation": null,
        "name": null,
        "sex": null,
        "birthday": null,
        "age": null,
        "job": null,
    },

    "boProductExtends": {
        "tid": null,
        "attCode": null,
        "attText": null,
        "attValue": null,
        "attType": null,
        "modifyDate": null,
        "productId": null,
        "attId": null,
    },

    "boAgent": {
        "name": null,
        "number": null,
        "tel": null,
    },
    //考勤
    "punchClock":{
    	   "startDate":null,
    	   "endDate":null
    }
});