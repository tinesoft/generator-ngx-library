describe('Directive: <%= ngDirectiveName %>', function () {

	var element, $scope, $compile,	
		defaultTemplate = '<<%= ngDirectiveName %>></<%= ngDirectiveName %>>',
		attrOptionsTemplate = 
			'<<%= ngDirectiveName %>'+ 
			'			option1="\'value1\'"'+
			'			option2="\'value2\'">'+					
			'</<%= ngDirectiveName %>>',
		scopeOptionsTemplate = 
			'<<%= ngDirectiveName %>'+
			'			option1="option1"'+
			'			option2="option2">'+					
			'</<%= ngDirectiveName %>>';

	 function createDirective(data, template) {
		//scope.data = data || defaultData;

		var elm = angular.element(template || defaultTemplate);
		angular.element(document.body).prepend(elm);
		$compile(elm)($scope);
		$scope.$digest();

		return elm;
	}

	 beforeEach(function () {

		module('<%= ngModuleName%>');

		inject(function (_$rootScope_, _$compile_) {
		  $scope = _$rootScope_.$new();
		  $compile = _$compile_;
		});
	});

	afterEach(function () {
		if (element) {
			element.remove();
		}
	});

	describe('when created without any options', function(){
		it('should ...', function(){
			element = createDirective();
			expect(element).toBeDefined();

			//TODO: make assertions here
		});

	});

	describe('when created with options', function(){
		describe('from attributes', function(){
			it('should ...', function(){

				element = createDirective(null,attrOptionsTemplate);
				expect(element).toBeDefined();

				//TODO: make assertions here
			});

		});

		describe('from scope', function(){
			it('should ...', function(){

				$scope.option1 = 'value1';
				$scope.option2 = 'value2';

				element = createDirective(null,scopeOptionsTemplate);
				expect(element).toBeDefined();

				//TODO: make assertions here
			});
		});
	});
	
});