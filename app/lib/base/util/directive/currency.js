define(['app'], function (app) {
	app.directive('money', function($compile,$rootScope,$timeout) { 
		return {
			restrict:'A',
			replace:false,
			scope: {
				ngModel:'=',
				value:'='
			},
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);

				function　thousands(val){
				    if(val){
						var result = '';
						val = (val || 0).toString();
						while (val.length > 3) {
							result = ',' + val.slice(-3) + result;
							val = val.slice(0, val.length - 3);
						}
						if (val) { result = val + result; }
						var index = result.indexOf('.');
						if (index >0){
							result =result.replace(',.','.');
						}
						var index1 = result.indexOf('-,');
						if (index1 >=0){
							result =result.replace('-,','-');
						}
						return result;
					}else{
						return 0;
					}
				}

				String.prototype.replaceAll = function(s1,s2) { 
				    return this.replace(new RegExp(s1,"gm"),s2); 
				}

				scope.$watch('ngModel',function(value){
					if(value != undefined){
						var result = thousands(value.toString().replaceAll(',',''));
						result = result==0?'':result;
						scope.ngModel = result;
						scope.value = result.toString().replaceAll(',','');
					}
				});
			}
		};
	});
});