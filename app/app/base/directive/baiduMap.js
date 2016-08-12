define(['app'], function (app) {
	app.directive('bmap', function($compile) { 
		return { 
			restrict:'E',
			replace:true,
			scope: {
				map:'=',
				lat:'=',
				lng:'=',
				onclick:'&'
			},
			template:'<div></div>',
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);
				element.css('width',attrs.width||'100%');
				element.css('height',attrs.height||'100%');
				if(attrs.id){
					element.attr('id',attrs.id+'_map');
				}
				
				window.initialize = function(){
					if(BMap){
						var map = new BMap.Map(attrs.id+'_map');

						if(attrs.location!='false'){
							map.addControl(new BMap.GeolocationControl());
						}

						if(attrs.navigation!='false'){
							map.addControl(new BMap.NavigationControl());
						}

						scope.$watch('lat',function(newValue){
							if(newValue){
								var point = new BMap.Point(parseFloat(scope.lng,10), parseFloat(scope.lat,10));
								map.centerAndZoom(point, 15);
							}else{
								var point = new BMap.Point(116.404, 39.915);
								map.centerAndZoom(point, 15);
							}
						});

						map.addEventListener("click", function(e){
							scope.onclick({event:e});
						});

						scope.map = map;
					}
				}
				if(window.BMap){
					initialize();
				}else{
					require(['http://api.map.baidu.com/api?v=2.0&ak=YEn2GeM1Qg0anfcRBywFe0e6&callback=initialize']);
				}
			}
		};
	});
});