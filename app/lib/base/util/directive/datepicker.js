define(['app'], function (app) {
	app.directive('datepicker', function($compile,$rootScope) { 
		return {
			restrict:'E',
			replace:true,
			scope: {
				ngModel:'='
			},
			template:'<input type="text" style="background:none;display:inline;padding-right:50px;"/>',
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);

				if($('.datetimepickerCss').length==0){
					$('head').append('<link href="bower_components/mobiscroll/css/mobiscroll.frame.css" rel="stylesheet" class="datetimepickerCss"/>');
					$('head').append('<link href="bower_components/mobiscroll/css/mobiscroll.scroller.css" rel="stylesheet" class="datetimepickerCss"/>');
					$('head').append('<link href="bower_components/mobiscroll/css/mobiscroll.frame.android-holo.css" rel="stylesheet" class="datetimepickerCss"/>');
					$('head').append('<link href="bower_components/mobiscroll/css/mobiscroll.android-holo-light.css" rel="stylesheet" class="datetimepickerCss"/>');
					
					$('head').append('<script src="bower_components/mobiscroll/js/mobiscroll.core.js"></script>');
					$('head').append('<script src="bower_components/mobiscroll/js/mobiscroll.frame.js"></script>');
					$('head').append('<script src="bower_components/mobiscroll/js/mobiscroll.scroller.js"></script>');
					$('head').append('<script src="bower_components/mobiscroll/js/mobiscroll.datetime.js"></script>');
					$('head').append('<script src="bower_components/mobiscroll/js/mobiscroll.util.datetime.js"></script>');
					$('head').append('<script src="bower_components/mobiscroll/js/mobiscroll.datetimebase.js"></script>');
					$('head').append('<script src="bower_components/mobiscroll/js/mobiscroll.android-holo-light.js"></script>');
					$('head').append('<script src="bower_components/mobiscroll/js/i18n/mobiscroll.i18n.zh.js"></script>');
				}
				if(attrs.width){
					element.css('width',attrs.width);
				}
				if(attrs.height){
					element.css('height',attrs.height);
				}
				if($rootScope.phone){
					element.addClass('text-right');
				}

				if(attrs.time=='true'){
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
			}
		};
	});
});