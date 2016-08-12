angular.module('app').directive('line', function(utils) {
    function timeToInt(timeArray){
        var intArray = [];
        for (var i = 0; i < timeArray.length; i++) {
            var h = timeArray[i].getHours();
            var m = timeArray[i].getMinutes()*6/10;
            intArray.push(h+m);
        };
        return intArray;
        
    }
    function intToTime(intD){
        var z = Math.floor(intD);
        var x = intD - z;
        var temp = Math.ceil(x*60);
        var str = z+":"+temp;
        return str; 
    }
    function createImgView(scope,datazoom){
       var option =  {  
                title:{
                    show:true,
                    text:"起床时间",
                    textAlign:"left",
                    x:0,
                    y:10,
                    textStyle:{
                        color:"black"
                    }
                    
                },
                // 提示框，鼠标悬浮交互时的信息提示  
                tooltip: {  
                    trigger: 'axis',
                    //show: true,   //default true
                    showDelay: 0,
                    hideDelay: 50,
                    transitionDuration:0,
                    // backgroundColor : 'rgba(229,230,221,0.7)',
                    // borderColor : '#f50',
                    borderRadius : 8,
                    borderWidth: 0,
                    padding: 10,    // [5, 10, 15, 20]
                    position : function(p) {
                        // 位置回调
                        return [p[0] + 10, p[1] - 10];
                    },
                    textStyle : {
                        // color: 'yellow',
                        decoration: 'none',
                        fontFamily: 'Verdana, sans-serif',
                        fontSize: 15,
                        fontStyle: 'italic',
                        fontWeight: 'bold'
                    },
                    formatter: function (params,ticket,callback) {
                        console.log(params);
                        var res = '日期 : ' + params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            res += '<br/>' + params[i].seriesName + ' : ' + intToTime(params[i].value);
                        }
                        // 仅为了模拟异步回调
                        return res;
                    } 
                },  
                // 图例  
                // legend: {  
                //     data: scope.model.legend  
                // },  
                grid: { // 控制图的大小，调整下面这些值就可以，
                     x: scope.model.left||50,
                     y: 40,
                     x2: scope.model.right || 20,
                     y2: scope.model.bottom ||80,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                 },
                 //滑动条
                 dataZoom : {
                    show : scope.model.datazoom.show,
                    realtime : true,
                    handleSize:3,
                    height: 10,
                    start : scope.model.datazoom.start,
                    end :scope.model.datazoom.end,
                    x:scope.model.datazoom.x||40,
                    y:scope.model.datazoom.y||150
                },
                // 横轴坐标轴  
                xAxis: [{  
                    type: 'category',  
                    data: scope.model.xitem , 
                }],  

                // 纵轴坐标轴  
                yAxis: [{  
                    type: 'value',
                    // splitNumber: 5,
                    // boundaryGap: [0,0.1],
                    min:5,
                    max:10,
                    axisLabel : { 
                        formatter: function(value) 
                        { 
                        return value+"点"; 
                        } 
                        }, 
                        splitArea : {show : true}

                }],  
                // 数据内容数组  
                series: function(){  
                    var serie=[];  
                    for(var i=0;i<scope.model.legend.length;i++){  
                        var item = {  
                            name:scope.model.legend[i],
                            type: 'line',
                            data: scope.model.data[i]  
                        };  
                        serie.push(item);  
                    }  
                    return serie;  
                }()
            }; 
            var myChart = echarts.init(document.getElementById(scope.id),'macarons');  
            myChart.setOption(option);  
    }
    return {  
        restrict: "EA",
        require: "ngModel",
        scope: {
            id: "@",  
            model: "=ngModel"
        },  
        template: '<div style="width:100%"></div>',
        replace: true,  
        link: function(scope, element, attrs, controller) {
            utils.ocload.load([
                'app/base/lib/echarts/echarts-line.js',
            ]).then(function () {
                if(attrs.height){
                    element.css({height:attrs.height});
                }else{
                    element.css({height:"200px"});
                }
                if(attrs.width){
                    element.css({width:attrs.width});
                }
                // if(scope.model.datazoom){
                //     datazoom.show =true;
                // }else{
                //     datazoom.show =false;
                // }
                //设置滑动条样式
                // if(attrs.datazoomx){
                //    datazoom.x=attrs.datazoomx;
                // }
                // if(attrs.datazoomy){
                //    datazoom.x=attrs.datazoomy;
                // }

                var option = createImgView(scope);
                scope.$on(scope.model.notice, function(e, newLocation) {
                    createImgView(scope);
                });
                // scope.$watch('model',function(newValue){
                //     console.log("sss");
                //     if(newValue){
                //         // myChart.setOption(newValue);
                //     }
                // });
            });
        }  
    };  
});
