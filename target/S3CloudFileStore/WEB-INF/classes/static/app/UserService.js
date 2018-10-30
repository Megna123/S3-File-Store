(function () {
    'use strict';

angular.module('app').factory('UserService', UserService); 
//UserService.inject['$http', '$q'];

		function UserService($http, $q){
		var service={};
		service.uploadFile = uploadFile;		
	     service.fetchFiles=fetchFiles;
	     service.downloadFile=downloadFile;
	     service.deleteFile=deleteFile;
	     service.fetchAllFiles=fetchAllFiles;
	     service.updateFile=updateFile;
	     service.signup=signup;
	    // service.fetchAllFiles = fetchAllFiles;
	     /*service.uploadFile = uploadFile;
	     service.editFile=editFile;
	     service.deleteFile=deleteFile;
	     service.downloadFile=downloadFile;	*/ 
	   
	 
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
	    
	    function fetchAllFiles(username) {
	        var deferred = $q.defer();
	        console.log(username);
	        $http.get('/adminfilelist?username='+username)
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
	    	   
	    
	    function deleteFile(username,filename) {
	        var deferred = $q.defer();
	        console.log(username);
	        $http.post('/deletefile?username='+username+'&filename='+filename)
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
	    
	    function signup(newuser) {
	        var deferred = $q.defer();
	        console.log(newuser.email);
	        var url='/signup?email='+newuser.username+'&lname='+newuser.lastname+'&fname='+newuser.firstName+'&password='+newuser.password;
	        console.log(url);
	        $http.post(url)
	            .then(
	            function (response) {
	            	console.log(response.data);
	            	deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while signup');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function uploadFile(username,desc,file) {
	    	 var fileFormData = new FormData();
	            fileFormData.append('file', file);
	        var deferred = $q.defer();
	        console.log(username);
	        $http.post('/insertfile?username='+username+'&filedesc='+desc,fileFormData,{
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined} 
            }).then(
	            function (response) {
	            	console.log(response);
	            	deferred.resolve(response);
	            },
	            function(errResponse){
	                console.error('Error while fetching Files');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }

	    /******
	   function downloadFile(username,filename) {
	        var deferred = $q.defer();
	        console.log(filename+'    '+filename);
	        $http.post('/downloadfile?username='+username+'&filename='+filename,{responseType:'arraybuffer'})
	            .then(
	            function (response) {
	            	console.log("File recieved");
	            	deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Files');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }	 
	    *******/
	    
	    function downloadFile(username,filename) {
	        var deferred = $q.defer();
	        console.log(filename+'    '+filename);
	        $http.post('/downloadfile?username='+username+'&filename='+filename,{responseType:'arraybuffer'})
	            .then(
	            function (response) {
	            	//chcek
	            	var bytes = new Uint8Array(response);
	            	var blob = new Blob([bytes], {type: "application/pdf"});
	            	var link = document.createElement("a");
	            	link.href = window.URL.createObjectURL(blob);
	            	link.download = filename;
	            	link.click();           	
	            	
	            	console.log("File recieved");
	            	deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Files');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    
	    function updateFile(fileID,filename,username,file) {
	    	var fileFormData = new FormData();
            fileFormData.append('file', file);
	        var deferred = $q.defer();
	        console.log(filename+'    '+filename);
	        $http.post('/updatefile?fileID='+fileID+'&filename'+filename+'&username'+username,fileFormData,{
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined} 
            }).then(
	            function (response) {
	            	console.log("File Updated");
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