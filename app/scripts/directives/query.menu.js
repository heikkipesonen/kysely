Query.directive('menu',function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope:true,
		controller:'menuController',
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'templates/query.menu.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, $element, iAttrs, controller) {
			

			$scope.scale = function(){
				$element.find('.menu-item').each(function(){

					var size = $(window).innerHeight()  / 4;
					$(this).css({
						'height':size,
						'width':size
					});
				});		
			};


			$(window).resize(function(){
				$scope.scale();
			});

			$scope.scale();
		}
	};
});