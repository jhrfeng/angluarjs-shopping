angular.module('app').factory('date_util', function () {
    var date_util = {
        dateFormat: df.dateFormat,
        toDate: df.toDate,
        getBirthday:function(age){
            function pad(num) {
                return num > 10 ? num : "0" + num;
            }
            var date1 = new Date();
            var nYear = date1.getFullYear();
            var nMon = pad(date1.getMonth() + 1,2);
            var nDay = pad(date1.getDate(),2);
            return nYear - age + "-" + nMon + "-" + nDay;
        },
        getAge : function(dateStr){
            var   r   =   dateStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if(r==null)return   false;
            var   d=   new   Date(r[1],   r[3]-1,   r[4]);
            if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
            {
                var   Y   =   new   Date().getFullYear();
                return Y-r[1];
            }
            return("输入的日期格式错误!");
        }
    };
    return date_util;
});

(function (window) {
    /**
     console.log(df.dateFormat(new Date(),'yyyy年MM月dd日'));
     console.log(df.toDate('2016-05-17 16:03:01'));
     */
    var sinojh = {};
    /**
     * 方便于添加和重写类的属性
     * @param {Object} attributes 添加的属性
     */
    Function.prototype.prototypes = function (attributes) {
        for (var a in attributes) {
            this.prototype[a] = attributes[a];
        }
    };
    /**
     * 获取Url参数
     * @param {String} parameter 参数名
     * @return {String} 参数值
     */
    sinojh.getUrlParameter = function (parameter) {
        if (!sinojh.getUrlParameter.cache) {
            var url = window.location.href;
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var cache = {};
            for (var i in paraString) {
                var j = paraString[i];
                cache[j.substring(0, j.indexOf("="))] = j.substring(j.indexOf("=") + 1, j.length);
            }
            sinojh.getUrlParameter.cache = cache;
        }
        return sinojh.getUrlParameter.cache[parameter];
    };
    /**
     * 日期格式化
     * @param {Date} date 日期对象
     * @param {String} formatStyle 格式化样式
     * @return {String} 日期型字符串
     */
    sinojh.dateFormat = function (date, formatStyle) {
        formatStyle = formatStyle ? formatStyle : sinojh.dateFormat.settings.formatStyle;
        date = date ? date : new Date();
        var time = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "S": date.getMilliseconds()
        };
        if (formatStyle == sinojh.dateFormat.formatStyleCache) {
            var replaceCache = sinojh.dateFormat.replaceCache;
            if (replaceCache["y+"]) {
                formatStyle = formatStyle.replace(replaceCache["y+"].replace, (date.getFullYear() + "").substring(replaceCache["y+"].index));
            }
            for (var k in time) {
                if (replaceCache[k]) {
                    formatStyle = formatStyle.replace(replaceCache[k].replace, replaceCache[k].replace.length == 1 ? time[k] : ("00" + time[k]).substring(("" + time[k]).length));
                }
            }
        } else {
            sinojh.dateFormat.formatStyleCache = formatStyle;
            var replaceCache = {};
            if (new RegExp("(y+)").test(formatStyle)) {
                var index = 4 - RegExp.$1.length;
                replaceCache["y+"] = {
                    replace: RegExp.$1,
                    index: index
                };
                formatStyle = formatStyle.replace(RegExp.$1, (date.getFullYear() + "").substring(index));
            }
            for (var k in time) {
                if (new RegExp("(" + k + ")").test(formatStyle)) {
                    replaceCache[k] = {
                        replace: RegExp.$1
                    };
                    formatStyle = formatStyle.replace(RegExp.$1, RegExp.$1.length == 1 ? time[k] : ("00" + time[k]).substring(("" + time[k]).length));
                }
            }
            sinojh.dateFormat.replaceCache = replaceCache;
        }
        return formatStyle;
    };
    sinojh.dateFormat.settings = {
        formatStyle: "yyyy-MM-dd hh:mm:ss"
    };
    /**
     * 将日期格式的字符串转换成Date对象
     * @param {String} dateStr 日期格式字符串
     * @param {String} dateStyle 日期格式
     * @return {Date} 日期对象
     */
    sinojh.toDate = function (dateStr, dateStyle) {
        dateStyle = dateStyle ? dateStyle : sinojh.toDate.settings.dateStyle;
        var compare = sinojh.toDate.compare;
        var result = new sinojh.toDate.result();
        if (dateStyle == sinojh.toDate.settings.dateStyleCache) {
            var indexCache = sinojh.toDate.indexCache;
            for (var k in compare) {
                if (indexCache[k]) {
                    result[compare[k]] = dateStr.substring(indexCache[k].index, indexCache[k].index + indexCache[k].length);
                }
            }
        } else {
            var indexCache = {};
            for (var k in compare) {
                if (new RegExp("(" + k + ")").test(dateStyle)) {
                    var index = dateStyle.indexOf(RegExp.$1);
                    var length = RegExp.$1.length;
                    indexCache[k] = {
                        index: index,
                        length: length
                    };
                    result[compare[k]] = dateStr.substring(index, index + length);
                }
            }
            sinojh.toDate.indexCache = indexCache;
            sinojh.toDate.settings.dateStyleCache = dateStyle;
        }
        return new Date(result["y"], result["M"] - 1, result["d"], result["h"], result["m"], result["s"], result["S"]);
    };
    sinojh.toDate.compare = {
        "y+": "y",
        "M+": "M",
        "d+": "d",
        "h+": "h",
        "m+": "m",
        "s+": "s",
        "S": "S"
    };
    sinojh.toDate.result = function () {
    };
    sinojh.toDate.result.prototypes({
        "y": "",
        "M": "",
        "d": "",
        "h": "00",
        "m": "00",
        "s": "00",
        "S": "000"
    });
    sinojh.toDate.settings = {
        dateStyle: "yyyy-MM-dd hh:mm:ss"
    };
    delete Function.prototype.prototypes;
    window.df = sinojh;
}(this));