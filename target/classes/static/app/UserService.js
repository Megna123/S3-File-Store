(function () {
    'use strict';

angular.module('app').factory('UserService', UserService); 
//UserService.inject['$http', '$q'];

		function UserService($http, $q){
		var service={};
		service.uploadFile = uploadFile;
		
	     service.fetchFiles=fetchFiles;
	     
	    // service.fetchAllFiles = fetchAllFiles;
	     /*service.uploadFile = uploadFile;
	     service.editFile=editFile;
	     service.deleteFile=deleteFile;
	     service.downloadFile=downloadFile;	*/ 
	     service.signup=signup;
	 
	    return service;
	 
	    function fetchFiles(username) {
	        var deferred = $q.defer();
	        console.log(username);
	        $http.get('/filelist?username='+username)
	            .then(
	            function (response) {
	            	console.log(response);
	            	deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Files');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    /*
	    function fetchAllFiles(username) {
	        var deferred = $q.defer();
	        console.log(username);
	        $http.get('/filelist?username='+username)
	            .then(
	            function (response) {
	            	console.log(response);
	            	deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Files');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function uploadFile(username,formData) {
	        var deferred = $q.defer();
	        console.log(username);
	        $http.post('/filelist?username='+username,formData)
	            .then(
	            function (response) {
	            	console.log(response);
	            	deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Files');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function editFile(username,file) {
	        var deferred = $q.defer();
	        console.log(username);
	        $http.post('/filelist?username='+username)
	            .then(
	            function (response) {
	            	console.log(response);
	            	deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Files');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function removeFile(username,file) {
	        var deferred = $q.defer();
	        console.log(username);
	        $http.post('/filelist?username='+username)
	            .then(
	            function (response) {
	            	console.log(response);
	            	deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Files');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }*/
	    
	    function signup(newuser) {
	        var deferred = $q.defer();
	        console.log(newuser.email);
	        var url='/signup?email='+newuser.username+'&lname='+newuser.lastname+'&fname='+newuser.firstName+'&password='+newuser.password;
	        console.log(url);
	        $http.post(url)
	            .then(
	            function (response) {
	            	console.log(response);
	            	deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while signup');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function uploadFile(username,file) {
	    	 var fileFormData = new FormData();
	          	fileFormData.append('file', file);
	            console.log('Inside UserService.js');
	            console.log(file);
	        var deferred = $q.defer();
	        console.log(username);
	        $http.post('/insertfile?username='+username,fileFormData,{
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined} 
            }).then(
	            function (response) {
	            	console.log(response);
	            	deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Files');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    
	   
	 }
})();