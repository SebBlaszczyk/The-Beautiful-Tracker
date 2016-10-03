'use strict';

/*, data, teamsList = [], teamsListOutput, competitionsId, competitionsList = [], i, competitionsListOutput, apiKey = "f442eb0d27b3477d83f81e414572e2f2";*/

var App = {};

App.settings = {
	accessToken: function() { return localStorage.getItem('accessKey'); },
	dataUrl: "http://api.football-data.org/v1"
};

App.getData = function(url) {
	// Return a new promise.
	return new Promise(function(resolve, reject) {
	    // Do the usual XHR stuff
	    var httpRequest = new XMLHttpRequest();
	    httpRequest.open('GET', url);
	    httpRequest.setRequestHeader("X-Auth-Token",App.settings.accessToken());
	
	    httpRequest.onload = function() {
	      // This is called even on 404 etc
	      // so check the status
	      if (httpRequest.status == 200) {
	        // Resolve the promise with the response text
	        resolve(httpRequest.response);
	      }
	      else {
	        // Otherwise reject with the status text
	        // which will hopefully be a meaningful error
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

	 

console.log('App Loaded');  
  
  
  
 