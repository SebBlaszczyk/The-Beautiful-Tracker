'use strict';

var App = {};

App.settings = {
	accessToken: 'f442eb0d27b3477d83f81e414572e2f2', 
	dataUrl: "http://api.football-data.org/v1"
};

App.getData = function(url) {

	return new Promise(function(resolve, reject) {
	    var httpRequest = new XMLHttpRequest();
	    httpRequest.open('GET', url);
	    httpRequest.setRequestHeader("X-Auth-Token",App.settings.accessToken);
	
	    httpRequest.onload = function() {
	      if (httpRequest.status == 200) {
	        resolve(httpRequest.response);
	      }
	      else {
	        reject(Error(httpRequest.statusText));
	      }
	    };
	
	    // Handle network errors
	    httpRequest.onerror = function() {
	      reject(Error("Network Error"));
	    };
	
	    // Make the request
	    httpRequest.send();
	});	
};

App.addClub = function(clubName,clubUrl) {
	
	localStorage.setItem(clubName,clubUrl);
};

	 

console.log('App Loaded');  
  
  
  
 