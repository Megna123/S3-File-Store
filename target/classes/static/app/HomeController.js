(function () {
	'use strict';

	angular.module('app').controller('HomeController', ['$scope','$rootScope','UserService','$http',function($scope, $rootScope, UserService,$http) {
		var self = this;
		self.files=[];
		var currentUser = $rootScope.globals.currentUser.username;
		console.log(currentUser)
		if(currentUser == "admin") {
			console.log(currentUser);
			fetchAllFiles(currentUser);
			
		} else {
			fetchFiles(currentUser);
			console.log(currentUser);
		}

		//fetchFiles(currentUser);
		console.log(currentUser);
		function fetchFiles(currentUser){
			UserService.fetchFiles(currentUser)
			.then(
					function(d) {
						console.log(d);
						self.files = d;
					},
					function(errResponse){
						console.error('Error while fetching Files');
					}
			);
		}

		function fetchAllFiles(currentUser){
        UserService.fetchAllFiles(currentUser)
            .then(
            function(d) {
            	console.log(d);
                self.files = d;
            },
            function(errResponse){
                console.error('Error while fetching Files');
            }
        );
    }

    function uploadFile(formData){
        UserService.uploadFile(currentUser)
            .then(
            function(d) {
            	console.log(d);
                //self.files = d;
            },
            function(errResponse){
                console.error('Error while fetching Users');
            }
        );
    }

    
    $scope.deleteFile = function deleteFile(filename){
        UserService.deleteFile(currentUser,filename)
            .then(
            function(d) {
            	console.log(d);
                self.files = d;
            },
            function(errResponse){
                console.error('Error while fetching Users');
            }
        );
    }
		
		
		
		$scope.download = function (filename){
	        UserService.downloadFile(filename)
	            .then(
	            function(d) {
	            	console.log("File downloaded");
	                  },
	            function(errResponse){
	                console.error('Error while fetching Users');
	            }
	        );
	    }
		

		
		 $scope.uploadFiletest = function () {	            
			 var currentUser = $rootScope.globals.currentUser.username;				
			 var file = $scope.myFile;
			 console.log($scope.myFile);			 
			 UserService.uploadFile(currentUser,$scope.myFile)
	            .then(
	            function(d) {
	            	console.log(d);
	            	fetchFiles(currentUser);
	             },
	            function(errResponse){
	                console.error('Error while fetching Users');
	            }
	        );
			 
			 
	           /* var uploadUrl = "../server/service.php", //Url of webservice/api/server
	                promise = fileUploadService.uploadFileToUrl(file, uploadUrl);

	            promise.then(function (response) {
	                $scope.serverResponse = response;
	            }, function () {
	                $scope.serverResponse = 'An error has occurred';
	            })*/
	        };
		


	}]);

})();