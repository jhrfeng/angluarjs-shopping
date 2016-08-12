define(['app'], function (app) {
	app.directive('slidepicker', function($compile,$ionicSlideBoxDelegate,utils) { 
		return {
			restrict:'E',
			replace:true,
			scope: {
				index:'=',
				ngModel:'=',
				slideData:'=',
				onchange:'&'
			},
			template:'<div>'
				+'<i class="ion-chevron-left" style="position:relative;top:-4px;display:inline-block;padding:0 10px;"></i>'
				+'<ion-slide-box on-slide-changed="slideChange($index)" active-slide="index" auto-play="false" show-pager="false" style="display:inline-block;width:100px;text-align:center;" on-slide-changed="slideHasChanged($index)">'
					+'<ion-slide ng-repeat="item in slideData">'
						+'<div ng-bind="item.text"></div>'
					+'</ion-slide>'
				+'</ion-slide-box>'
				+'<i class="ion-chevron-right" style="position:relative;top:-4px;display:inline-block;padding:0 10px;"></i>'
			+'</div>',
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);

				if(attrs.width){
					element.find('.slider').css({width:attrs.width});
				}

				if(attrs.textClass){
					element.find('.slider').addClass(attrs.textClass);
				}

				if(attrs.textStyle){
					element.find('.slider').css(eval('('+attrs.textStyle+')'));
				}

				if(!attrs.slideData){
					scope.slideData = [];
				}

				if(attrs.slideType.indexOf('year')!=-1){
					var slideRange = attrs.slideRange||'+-10';
					var min,max;
					if(slideRange.indexOf('+-')!=-1){
						var range = parseInt(slideRange.substr(2),10);
						min = range*-1;
						max = range+1;
						if(attrs.slideType.indexOf('Month')==-1){
							scope.index = range;
						}else{
							var date = new Date();
							scope.index = range*12+date.getMonth();
						}
					}else if(slideRange.indexOf('+')!=-1){
						var range = parseInt(slideRange.substr(1),10);
						min = 0;
						max = range+1;
						if(attrs.slideType.indexOf('Month')==-1){
							scope.index = 0;
						}else{
							var date = new Date();
							scope.index = date.getMonth();
						}
						
					}else if(slideRange.indexOf('-')!=-1){
						var range = parseInt(slideRange.substr(1),10);
						min = range*-1;
						max = 1;
						scope.index = range;
					}
					for(var i=min;i<max;i++){
						var date = new Date();
						date.setFullYear(date.getFullYear()+i);
						
						if(attrs.slideType.indexOf('Month')==-1){
							scope.slideData.push({
								text:date.getFullYear()+'年',
								value:date.getFullYear()
							});
						}else{
							for(var j=1;j<13;j++){
								scope.slideData.push({
									text:date.getFullYear()+'年'+(j<10?'0'+j:j)+'月',
									value:date.getFullYear()+'-'+(j<10?'0'+j:j)
								});
							}
						}
					}
				}

				if(attrs.slideType=='month'){
					for(var i=1;i<13;i++){
						scope.slideData.push({
							text:(i<10?'0'+i:i)+'月',
							value:i
						});
					}
					var date = new Date();
					scope.index = date.getMonth();
				}

				if(attrs.slideType=='quarter'){
					var quarterArray = ['一','二','三','四'];
					for(var i=1;i<5;i++){
						scope.slideData.push({
							text:'第'+quarterArray[i-1]+'季度',
							value:i
						});
					}
					var date = new Date();
					scope.index = parseInt(date.getMonth()/3,10);
				}

				scope.$watch('ngModel',function(newValue,oldValue){
					for(var i in scope.slideData){
						if(scope.ngModel == scope.slideData[i].value){
							scope.index = i;
						}
					}
				});

				scope.slideChange = function(index){
					scope.ngModel = scope.slideData[index].value;
					if(attrs.onchange){
						scope.onchange({item:{text:scope.slideData[index].text,value:scope.ngModel},prevItem:(index==0?{text:scope.slideData[scope.slideData.length-1].text,value:scope.ngModel}:{text:scope.slideData[index-1].text,value:scope.ngModel})});
					}
				};

				if(scope.slideData[0]){
					scope.slideChange(scope.index);
				}

				element.find('.ion-chevron-left').click(function(){
					if(scope.index > 0){
						scope.ngModel = scope.slideData[(parseInt(scope.index,10)-1)].value;
						scope.$apply();
					}
				});

				element.find('.ion-chevron-right').click(function(){
					if(scope.index < scope.slideData.length-1){
						scope.ngModel = scope.slideData[(parseInt(scope.index,10)+1)].value;
						scope.$apply();
					}
				});
			}
		};
	});
});