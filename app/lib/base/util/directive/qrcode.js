define(['app'], function (app) {
	app.directive('qrcode', function($state,$rootScope) { 
		return {
			restrict:'E',
			replace:true,
			template:'<div></div>',
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);

				var options = {
					width:attrs.size||160,
					height:attrs.size||160,
					text:attrs.text
				};

				require(['jquery_qrcode'],function(echarts){
					element.qrcode(options);
					element.click(function(){
						if(attrs.state){
							$state.go(attrs.state);
						}
					});
				});
			}
		};
	});
});