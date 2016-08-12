define(['app'], function (app) {
	var chartConfig = {
		animationSteps:50
	};

	app.directive('chartPie', function($compile) {
		return {
			restrict:'E',
			replace:true,
			scope: {
				options:'='
			},
			template:'<canvas></canvas>',
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);
				if(attrs.width){
					element.attr('width',attrs.width);
				}
				if(attrs.height){
					element.attr('height',attrs.height);
				}

				require(['chart'],function(){
					var ctx = element[0].getContext("2d");
					var pieChart = new Chart(ctx).Pie([
						{
							value: 30,
							color:"#F38630",
							label: "Android"
						},
						{
							value : 50,
							color : "#E0E4CC",
							label: "iPhone"
						},
						{
							value : 100,
							color : "#69D2E7",
							label: "Windows"
						}			
					],$.extend({},chartConfig));
				});
			}
		};
	}).directive('chartDoughnut', function($compile) {
		return {
			restrict:'E',
			replace:true,
			scope: {
				options:'='
			},
			template:'<canvas></canvas>',
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);
				if(attrs.width){
					element.attr('width',attrs.width);
				}
				if(attrs.height){
					element.attr('height',attrs.height);
				}

				require(['chart'],function(){
					var ctx = element[0].getContext("2d");
					new Chart(ctx).Doughnut([{
						value: 30,
						color:"#F7464A"
					},
					{
						value : 50,
						color : "#E2EAE9"
					},
					{
						value : 100,
						color : "#D4CCC5"
					},
					{
						value : 40,
						color : "#949FB1"
					},
					{
						value : 120,
						color : "#4D5360"
					}],$.extend({legendTemplate:'<div style="border:1px solid red;">aaa</div>'},chartConfig));
				});
			}
		};
	}).directive('chartBar', function($compile) {
		return {
			restrict:'E',
			replace:true,
			scope: {
				options:'='
			},
			template:'<canvas></canvas>',
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);
				if(attrs.width){
					element.attr('width',attrs.width);
				}
				if(attrs.height){
					element.attr('height',attrs.height);
				}

				require(['chart'],function(){
					var ctx = element[0].getContext("2d");
					new Chart(ctx).Bar({
						labels : ["January","February","March","April","May","June","July"],
						datasets : [
							{
								fillColor : "rgba(220,220,220,0.5)",
								strokeColor : "rgba(220,220,220,1)",
								data : [65,59,90,81,56,55,40]
							},
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								data : [28,48,40,19,96,27,100]
							}
						]
					},chartConfig);
				});
			}
		};
	}).directive('chartLine', function($compile) {
		return {
			restrict:'E',
			replace:true,
			scope: {
				options:'='
			},
			template:'<canvas></canvas>',
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);
				if(attrs.width){
					element.attr('width',attrs.width);
				}
				if(attrs.height){
					element.attr('height',attrs.height);
				}

				require(['chart'],function(){
					var ctx = element[0].getContext("2d");
					var lineChart = new Chart(ctx).Line({
						labels : ["January","February","March","April","May","June","July"],
						datasets : [
							{
								fillColor : "rgba(220,220,220,0.5)",
								strokeColor : "rgba(220,220,220,1)",
								pointColor : "rgba(220,220,220,1)",
								pointStrokeColor : "#fff",
								data : [65,59,90,81,56,55,40]
							},{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [28,48,40,19,96,27,100]
							}
						]
					},chartConfig);



					element[0].onclick = function(evt){
						console.log(lineChart);
						var activePoints = lineChart.getPointsAtEvent(evt);
					    alert("See me?");
					};
				});
			}
		};
	}).directive('chartRadar', function($compile) {
		return {
			restrict:'E',
			replace:true,
			scope: {
				options:'='
			},
			template:'<canvas></canvas>',
			link:function(scope, element, attrs, ctrls){
				element = $(element[0]);
				if(attrs.width){
					element.attr('width',attrs.width);
				}
				if(attrs.height){
					element.attr('height',attrs.height);
				}

				require(['chart'],function(){
					var ctx = element[0].getContext("2d");
					new Chart(ctx).Radar({
						labels : ["Eating","Drinking","Sleeping","Designing","Coding","Partying","Running"],
						datasets : [
							{
								fillColor : "rgba(220,220,220,0.5)",
								strokeColor : "rgba(220,220,220,1)",
								pointColor : "rgba(220,220,220,1)",
								pointStrokeColor : "#fff",
								data : [65,59,90,81,56,55,40]
							},
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [28,48,40,19,96,27,100]
							}
						]
					},chartConfig);
				});
			}
		};
	});
});