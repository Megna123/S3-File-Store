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

		$scope.deleteFile = function deleteFile(filename){
			UserService.deleteFile(currentUser,filename)
			.then(
					function(d){
						console.log(d);
						if(currentUser=='admin'){
							fetchAllFile(currentUser);
						}else{
							fetchFiles(currentUser);
						}
					},
					function(errResponse){
						console.error('Error while fetching Users');
					}
			);
		}


		$scope.download = function (filename){
			UserService.downloadFile(currentUser,filename)
			.then(
					function(d) {
						console.log("File downloaded");
					},
					function(errResponse){
						console.error('Error while fetching Users');
					}
			);
		}



		$scope.uploadFile = function () {	            
			var currentUser = $rootScope.globals.currentUser.username;				
			var file = $scope.myFile;
			console.log($scope.myFile);			 
			UserService.uploadFile(currentUser,$scope.desc,$scope.myFile)
			.then(
					function(d) {
						console.log(d);
						if(currentUser=='admin'){
							fetchAllFile(currentUser);
						}else{
							fetchFiles(currentUser);
						}
					},
					function(errResponse){
						console.error('Error while fetching Users');
					}
			);



		};

		
		$scope.updateFile = function (fileID,filename) {	            
			var currentUser = $rootScope.globals.currentUser.username;				
			var file = $scope.uploadfilemodel;
			console.log($scope.uploadfilemodel);			 
			UserService.updateFile(fileID,filename,currentUser,$scope.uploadfilemodel)
			.then(
					function(d) {
						console.log(d);
						if(currentUser=='admin'){
							fetchAllFile(currentUser);
						}else{
							fetchFiles(currentUser);
						}
					},
					function(errResponse){
						console.error('Error while fetching Users');
					}
			);



		};



	}]);

})();