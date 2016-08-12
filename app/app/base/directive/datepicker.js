angular.module('app').directive('datepicker', function($compile,$rootScope,utils) { 
		return {
			restrict:'E',
			replace:true,
			scope: {
				ngModel:'='
			},
			template:'<input type="text" style="background:none;display:inline;padding-right:50px;text-align:right"/>',
			link:function(scope, element, attrs, ctrls){
				utils.ocload.load([
					'app/base/lib/jQuery/jQuery-2.1.4.min.js',
					'app/base/lib/mobiscroll/css/mobiscroll.datetime.min.css',
					'app/base/lib/mobiscroll/js/mobiscroll.datetime.min.js',
				]).then(function () {
					element = $(element[0]);
					if(attrs.width){
						element.css('width',attrs.width);
					}
					if(attrs.height){
						element.css('height',attrs.height);
					}
					if($rootScope.phone){
						element.addClass('text-right');
					}
					if(attrs.time=='activitytime'){
						element.mobiscroll().time({
							theme:'android-holo-light',
							lang:'zh',
							dateFormat:attrs.format||''
						});
					}
					else if(attrs.time=='true'){
						element.mobiscroll().datetime({
							theme:'android-holo-light',
							lang:'zh',
							dateFormat:attrs.format||'yyyy-mm-dd'
						});
					}else{
						element.mobiscroll().date({
							theme:'android-holo-light',
							lang:'zh',
							dateFormat:attrs.format||'yyyy-mm-dd'
						});
					}
				});
			}
		};
	});
