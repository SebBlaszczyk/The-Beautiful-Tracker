'use strict';
//IIF to start things off
(function() {
  // Set Global Variables
  var httpRequest, data, competitionsList = [], i, competitionsListOutput, apiKey = "f442eb0d27b3477d83f81e414572e2f2";
  
  // Make request for Data
  function makeRequest(url) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = getData; // Have a closer look
    httpRequest.open('GET', url);
    httpRequest.setRequestHeader("X-Auth-Token",apiKey);
    httpRequest.send();
  }
  
  // Check state of request and if successful get data and store
  function getData() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        data = JSON.parse(httpRequest.responseText);
        for(i=0;i<data.length;i++){
	        competitionsList.push('<li data-league="'+data[i].league+'">'+data[i].caption+'</li>');
	    }
	    competitionsList.push('</ul>');
	    competitionsList.unshift('<ul id="competitions-list">');
	    competitionsListOutput = competitionsList.join("");
	    document.getElementById("competitions").innerHTML = competitionsListOutput;
       } else {
        alert('There was a problem with the request.');
      }
    }
  }
  
 
  // Controller - User Triggers (view.js file?)
  document.getElementById('get-competitions').onclick = function() { 
	  makeRequest('http://api.football-data.org/v1/competitions/?season=2016'); 
	  this.className = ' hidden';
  };
					 
			  
})();