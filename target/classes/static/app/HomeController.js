(function () {
	'use strict';

	angular.module('app').controller('HomeController', ['$scope','$rootScope','UserService','$http',function($scope, $rootScope, UserService,$http) {
		var self = this;
		self.files=[];

		/* self.uploadFile = uploadFile;
   self.editFile = editFile;
    self.downloadFile = downloadFile;
    self.deleteFile = deleteFile;*/

		var currentUser = $rootScope.globals.currentUser.username;
		if(currentUser.username == "admin") {
			fetchAllFiles(currentUser);
		} else {
			fetchFiles(currentUser);
			console.log(currentUser);
		}

		fetchFiles(currentUser);
		console.log(currentUser);
		function fetchFiles(username){
			UserService.fetchFiles(username)
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

		/*function fetchAllFiles(username){
        UserService.fetchAllFiles(username)
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

    function uploadFile(username,formData){
        UserService.uploadFile(username)
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

    function downloadFile(username,file){
        UserService.downloadFile(username)
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

    function deleteFile(username,file){
        UserService.deleteFile(username)
            .then(
            function(d) {
            	console.log(d);
                self.files = d;
            },
            function(errResponse){
                console.error('Error while fetching Users');
            }
        );
    }*/

		/*********MEG Code*******************************************/
		 $scope.uploadFiletest = function () {
	            
			 var currentUser = $rootScope.globals.currentUser.username;				
			 var file = $scope.myFile;
			 console.log('Inside HomeController');			 
			 console.log($scope.myFile);			 
			 UserService.uploadFile(currentUser,$scope.myFile)
	            .then(
	            function(d) {
	            	console.log(d);
	            	fetchFiles(username);
	               // self.files = d;
	            },
	            function(errResponse){
	                console.error('Error while fetching Users');
	            }
	        );			 
			}; 
	           /* var uploadUrl = "../server/service.php", //Url of webservice/api/server
	                promise = fileUploadService.uploadFileToUrl(file, uploadUrl);

	            promise.then(function (response) {
	                $scope.serverResponse = response;
	            }, function () {
	                $scope.serverResponse = 'An error has occurred';
	            })*/
	        
	        /****************************************/
		
		/*********Shishira Code*******************************************
	        
	        
	        $scope.uploadFiletest = function () {
	            
				 var currentUser = $rootScope.globals.currentUser.username;				
			//	 var file = $scope.myFile;
				 console.log($scope.myFile);		 
				 UserService.uploadFile(currentUser, ['$http', function ($http) {
					    this.uploadFileToUrl = function(file, uploadUrl){
					        var fd = new FormData();
					        fd.append('file', file);
					        $http.post(uploadUrl, fd, {
					            transformRequest: angular.identity,
					            headers: {'Content-Type': undefined}
					        })
					        .success(function(){
					        })
					        .error(function(){
					        });
					    }
					}]);
	        };
	        
	        
	        /*********************************************************************/
		/*$scope.uploadFile = function(add){
			var currentUser = $rootScope.globals.currentUser.username;
			console.log(currentUser)
			var formData = new FormData();
			formData.append("file", $scope.newfile);  
			console.log("Add object:"+$scope.add);
			console.log("Add object:"+$scope.add.description);
			console.log("Add object:"+$scope.add.newfile);
			$http.post('/insertFile?username='+currentUser,formData,{
				transformRequest: angular.identity,    	
				headers: {'Content-Type': undefined}
			}).then(
					function (response) {

						console.log(response);

					},
					function(errResponse){
						console.error('Error while fetching Files');

					}); 	
			console.log("returning");
		};*/


	}]);

})();