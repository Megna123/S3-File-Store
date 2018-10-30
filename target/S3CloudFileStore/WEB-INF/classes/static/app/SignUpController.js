(function () {
    'use strict';

    angular.module('app').controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope','UserService', '$location', '$rootScope'];
    function SignUpController($scope,UserService, $location, $rootScope) {
        var vm = this;
        vm.signup=signup;
//call directly
        function signup() {
            vm.dataLoading = true;
            UserService.signup(vm.newuser)
                .then(function (response) {
                	console.log(response);
                	console.log(response.data);
                    if (response) {
                        $location.path('/login');
                    } else {
                    	$scope.error = "SignUp Failed";
                         vm.dataLoading = false;
                    }
                });
        }
    }

})();