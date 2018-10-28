//(function() {
//    'use strict';
//    var myApp = angular.module('app');
//
//    /*
//     A directive to enable two way binding of file field
//     */
//    myApp.directive('fileUploadModel', function ($parse) {
//    	console.log($parse);
//    	return {
//    	        scope: {
//    	            file: '='
//    	        },
//    	        link: function (scope, el, attrs) {
//    	            el.bind('change', function (event) {
//    	                var file = event.target.files[0];
//    	                scope.file = file ? file : undefined;
//    	                scope.$apply();
//    	            });
//    	        }
//    	    };
//    	});
//})();



//(function() {
//    'use strict';
//    var myApp = angular.module('app');
//
//    /*
//     A directive to enable two way binding of file field
//     */
	var myApp = angular.module('app')
    myApp.directive('fileModel', ['$parse', function ($parse) {
    console.log('Inside directive');
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
//});