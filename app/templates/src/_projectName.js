angular.module('<%= ngModuleName%>', [])
.directive('<%= ngDirectiveName%>', ['$window', '$parse', function ($window,$parse) {

	function updateOptions($scope)
	{

	}

	return {
		restrict: 'E',
		scope: {
			option1 : '=',					// description1
			option2 : '='					// description2

		},
		/*templateUrl : '<%= projectName%>.tpl.html',*/
		link: function ($scope, $element, $attrs) {

			updateOptions($scope);

			$scope.$watch('[option1,option2]', function(oldValue, newValue){
				if(oldValue != newValue){
					updateOptions($scope);
				}
			},true);
		}
	};
}]);
