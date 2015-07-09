angular.module('<%= ngModuleName%>Demo', ['<%= ngModuleName%>', 'ui.bootstrap','prettifyDirective', 'plunker' ])
	.controller('MyCtrl', ['$scope', function ($scope) {
		$scope.options = {};

		$scope.options.options1 = 'value1';
		$scope.options.option2 = 'value2';
	}]);