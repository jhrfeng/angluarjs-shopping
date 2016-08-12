define(['app'], function (app) {
	app.directive('chart', function($compile) { 
		return { 
			restrict:'E',
			replace:true,
			scope: {
				options:'=',
				data:'=',
				click:'&'
			},
			template:'<div></div>',
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);
				if(attrs.width){
					element.css('width',attrs.width);
				}
				if(attrs.height){
					element.css('height',attrs.height);
				}
				var types = attrs.type.split(',');
				for(var i in types){
					types[i] = ('echarts/chart/'+types[i]);
				}
				require(['echarts/echarts'],function(echarts){
					var myChart = echarts.init(element[0]);
					require(types,function(){
						if(scope.options){
							myChart.setOption(scope.options);
			                myChart.on('click', function(data){
			                	if(scope.click){
			                		scope.click({data:data});
			                	}
			                });
			                
						}

						scope.$watch('options',function(newValue){
							if(newValue){
								myChart.setOption(newValue);
								scope.data = myChart.getDataURL();
							}
						});
					});
				});
			}
		};
	});
});