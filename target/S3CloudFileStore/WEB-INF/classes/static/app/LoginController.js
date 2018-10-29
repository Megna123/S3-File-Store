(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$location', 'CloudFileStoreService'];
    function LoginController($scope,$location, CloudFileStoreService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            CloudFileStoreService.ClearCredentials(); 
            FB.getLoginStatus(function(response) {
            	console.log("Inside FB login status");
                statusChangeCallback(response);
            });  
           
        })();
        
        
              
        function statusChangeCallback(response){
        	console.log(response.status);
        	 if(response.status =="connected"){
             	//CloudFileStoreService.SetCredentials(response.authResponse.userID, vm.password);            	
             	$location.path('/');       	
             }else{
             	$location.path('/login');           
             }
        	
        }
        
        function checkLoginState() {
            FB.getLoginStatus(function(response) {
            	console.log("fb button pressed")
              statusChangeCallback(response);
            });
          }      
        
        
        function login() {
          if(vm.username=='admin'&&vm.password=='admin'){
        	  CloudFileStoreService.SetCredentials(vm.username, vm.password);
        	  $location.path('/')
          }
          else{ CloudFileStoreService.Login(vm.username, vm.password, function (response) {
                if (response.status=200) {
                    CloudFileStoreService.SetCredentials(vm.username, vm.password);
                    console.log("Suceess")
                    $location.path('/');
                } else {
                	console.log("error");
                	$scope.error="Invalid credentials";
                    // vm.dataLoading = false;
                }
            });}
        };
    }

})();