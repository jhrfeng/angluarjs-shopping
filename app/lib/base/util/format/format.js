define(function () {
    var formatModule = {
        //对象属性下划线改为驼峰
        formatObjProp: function (object) {
            if (object) {
                $.each(object, function (i, n) {
                    if (i.indexOf('_') != -1) {
                        var strs = i.split('_');
                        var newPropName = strs[0];
                        for (var j = 1; j < strs.length; j++) {
                            newPropName = newPropName + strs[j].substring(0, 1).toUpperCase() + strs[j].substring(1);
                        }
                        object[newPropName] = n;
                        delete object[i];
                    }
                })
            }
        },
        //分页查询拼接sql
        pageSelectSql: function (selectSql, pageSize, pageNo) {
            if (selectSql && pageSize && pageNo) {
                selectSql = 'select * from ( ' + selectSql + ' ) limit ' + (parseInt(pageSize) * (parseInt(pageNo) - 1)) + ' , ' + pageSize;
            }
            return selectSql;
        },
        //分页查询获得总记录数
        getTotalItemsPageSql: function (selectSql) {
            if (selectSql) {
                selectSql = 'select count(1) totalItems from ( ' + selectSql + ' )';
            }
            return selectSql;
        }
    };

    return formatModule;
});