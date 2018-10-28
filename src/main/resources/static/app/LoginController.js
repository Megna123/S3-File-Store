(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'CloudFileStoreService'];
    function LoginController($location, CloudFileStoreService) {
        var vm = this;

        vm.login = login;
        
//        FB.getLoginStatus(function(response) {
//            console.log("Inside getLoginStatus");
//            statusChangeCallback(response);
//        });

        (function initController() {
            // reset login status
            CloudFileStoreService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            //my part
            console.log("Inside logincontroller");
            CloudFileStoreService.SetCredentials(vm.username, vm.password);
            $location.path('/');
           /* CloudFileStoreService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    CloudFileStoreService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                	$scope.error="Authentication Failed";
                     vm.dataLoading = false;
                }
            });*/
        };
        
        function checkLoginState() {
            console.log("Inside getLoginStatus");

        	  FB.getLoginStatus(function(response) {
        	    statusChangeCallback(response);
        	    if (response.status!="connected")
        	    	{
        	    	FB.login(function(response) {
        	    		  if (response.status === 'connected') {
        	    	            console.log("Inside FB Login - Connected to fb");
        	    		  }
        	    	}, {scope: 'public_profile,email'});
        	    	}
        	    	}
        	  };
})();