angular.module('app').directive('dropDownList', function(utils) {
    return {
        restrict: 'E',
   //      scope: {
			// 	index:'=',
			// 	ngModel:'=',
			// 	slideData:'=',
			// 	onchange:'&'
			// },
        template: '<ion-list class="down" ng-show="vo.insurdShow">'
        			+'<div class="list card" style="margin:0px">'
        				+'<div ng-repeat="insured in vo.insuredList">'
        				+'<a href="#" class="item item-icon-left item-icon-right" style="padding: 10px 50px;height:40px;border-bottom: 2px solid gray;"  ng-click="vc.chooeseIsure($index);$event.stopPropagation();">'
	                        +'<i class="icon ion-person"></i>'
	                        +'<span>{{insured.name}}</span>'
	                        +'<div class="icon" style="width:20%" ng-click="vc.deleteInsured($index);$event.stopPropagation();"><i class="ion-trash-a"  style="color:red" ></i></div></a></div>'
	                +'<a href="#" class="item item-icon-left" style="padding: 10px 50px;height:40px"'
	                   +'ng-click="vc.addInsured();$event.stopPropagation();">'
	                    +'<i class="icon ion-add" style="color:red"></i>添加投保人</a>'
	            	+'</div>'
        		+'</ion-list>',
        replace: true,
        link:function(scope,element, attrs, ctrls){
            utils.ocload.load([
                'app/base/lib/jQuery/jQuery-2.1.4.min.js',
            ]).then(function () {
                element = $(element[0]);
                if(attrs.width){
                    console.log(attrs.width);
                    element.css({width:attrs.width});
                }
                if(attrs.textClass){
                    element.find('.list').addClass();
                }
            });
        }
    };
})
.directive("mydiv", function(utils) {
    return {
        restrict: "EA",
        replace: true,
        template: "<div></div>",
        link: function(scope,element,attrs,ctrls) {
            utils.ocload.load([
                'app/base/lib/jQuery/jQuery-2.1.4.min.js',
            ]).then(function () {
                console.log(element);
                element = $(element[0]);
                if(attrs.color){
                    console.log(element.find('.mydiv'));
                    element.css({background:attrs.color});
                }
                if(attrs.width){
                    element.css({width:attrs.width});
                }
                if(attrs.height){
                    element.css({height:attrs.height});
                }
            });
    }
 }
})
;
