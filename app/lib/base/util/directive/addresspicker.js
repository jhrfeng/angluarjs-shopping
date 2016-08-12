define(['app'], function(app) {
	app.directive('addresspicker', function($compile, $rootScope) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				ngModel: '=',
				text: '='
			},
			template: '<ul></ul>',
			link: function(scope, element, attrs, ctrls) {
				element = $(element[0]);

				if ($('.addresspickerCss').length == 0) {

					$('head').append('<link href="bower_components/mobiscroll/css/mobiscroll.frame.css" rel="stylesheet" class="addresspickerCss"/>');
					$('head').append('<link href="bower_components/mobiscroll/css/mobiscroll.scroller.css" rel="stylesheet" class="addresspickerCss"/>');
					$('head').append('<link href="bower_components/mobiscroll/css/mobiscroll.frame.android-holo.css" rel="stylesheet" class="addresspickerCss"/>');
					$('head').append('<link href="bower_components/mobiscroll/css/mobiscroll.android-holo-light.css" rel="stylesheet" class="addresspickerCss"/>');

				}
				require(['bower_components/mobiscroll/js/mobiscroll.listbase'], function() {
					require(['bower_components/mobiscroll/js/mobiscroll.treelist'],function(){
						var data = [{
							code: '010',
							name: '北京市',
							children: [{
								code: '01001',
								name: '北京市',
								children: [{
									code: '0100101',
									name: '朝阳区'
								}, {
									code: '0100102',
									name: '东城区'
								}, {
									code: '0100103',
									name: '西城区'
								}]
							}]
						}, {
							code: '021',
							name: '上海市',
							children: [{
								code: '02101',
								name: '上海市',
								children: [{
									code: '0210101',
									name: '浦东新区'
								}, {
									code: '0210102',
									name: '黄浦区'
								}, {
									code: '0210103',
									name: '徐汇区'
								}]
							}]
						}, {
							code: '430',
							name: '湖南省',
							children: [{
								code: '43001',
								name: '长沙市',
								children: [{
									code: '4300101',
									name: '雨花区'
								}]
							}, {
								code: '43002',
								name: '株洲市',
								children: [{
									code: '4300201',
									name: '天元区'
								}, {
									code: '4300202',
									name: '醴陵市'
								}]
							}, {
								code: '43003',
								name: '湘潭市',
								children: [{
									code: '4300301',
									name: 'xxx1区'
								}, {
									code: '4300302',
									name: 'xxx2区'
								}]
							}]
						}];

						var dataMap = {};

						for (var i in data) {
							dataMap[data[i].code] = data[i];
							var province = $('<li data-val="' + data[i].code + '">' + data[i].name + '</li>');
							if (data[i].children) {
								var cityList = $('<ul></ul>');
								for (var j in data[i].children) {
									dataMap[data[i].children[j].code] = data[i].children[j];
									var city = $('<li data-val="' + data[i].children[j].code + '">' + data[i].children[j].name + '</li>').appendTo(cityList);
									if (data[i].children[j].children) {
										var areaList = $('<ul></ul>');
										for (var k in data[i].children[j].children) {
											dataMap[data[i].children[j].children[k].code] = data[i].children[j].children[k];
											var area = $('<li data-val="' + data[i].children[j].children[k].code + '">' + data[i].children[j].children[k].name + '</li>').appendTo(areaList);
											city.append(areaList);
										}
									}
									province.append(cityList);
								}
							}
							element.append(province);
						}

						element.mobiscroll().treelist({
							theme: 'android-holo-light',
							lang: 'zh',
							mode: 'scroller',
							display: 'bottom',
							placeholder: '请输入地址',
							labels: ['Province', 'City', 'Area'],
							onSelect: function(valueCode, instance) {
								var valueArray = valueCode.split(' ');
								if (valueArray && valueArray.length > 0) {
									var value = '';
									var text = '';
									for (var i in valueArray) {
										value = dataMap[valueArray[i]].code;
										text += dataMap[valueArray[i]].name + ' ';
									}
									scope.ngModel = value;
									scope.$apply();
									element.prev().val(text.substr(0, text.length - 1));
								}
							}
						});
					
						scope.$watch('ngModel', function(newValue) {
							if (newValue) {
								var valueArray = [newValue.substr(0, 3), newValue.substr(0, 5), newValue.substr(0, 7)];
								var text = '';
								for (var i in valueArray) {
									text += dataMap[valueArray[i]].name + ' ';
								}
								element.prev().val(text.substr(0, text.length - 1));
								scope.text = text;
							}
						});
	                    scope.$apply();

						element.prev().css({
							background: 'none'
						});
					});
				});
			}
		};
	});
});