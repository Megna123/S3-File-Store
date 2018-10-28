(function () {
    'use strict';

    angular.module('app').controller('SignUpController', SignUpController);

    SignUpController.$inject = ['UserService', '$location', '$rootScope'];
    function SignUpController(UserService, $location, $rootScope) {
        var vm = this;
        vm.signup=signup;

        function signup() {
            vm.dataLoading = true;
            UserService.signup(vm.newuser)
                .then(function (response) {
                    if (response.success) {
                        $location.path('/login');
                    } else {
                    	$scope.error = "SignUp Failed";
                         vm.dataLoading = false;
                    }
                });
        }
    }

})();