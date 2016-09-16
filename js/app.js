'use strict';
//IIF to start things off
(function() {
  // Set Global Variables
  var httpRequest, data, teamsList = [], teamsListOutput, competitionsId, competitionsList = [], i, competitionsListOutput, apiKey = "f442eb0d27b3477d83f81e414572e2f2";
  
  // Make request for Data
  function makeRequest(url,getData) {
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
  
  // Check state of request and if successful get data
  function competitionsData() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        data = JSON.parse(httpRequest.responseText);
        for(i=0;i<data.length;i++){
	        competitionsList.push('<li class="league" data-leagueid="'+data[i].id+'">'+data[i].caption+'</li>');
	    }
	    competitionsList.push('</ul>');
	    competitionsList.unshift('<ul id="competitions-list">');
	    competitionsListOutput = competitionsList.join("");
	    document.getElementById("competitions").innerHTML = competitionsListOutput;
	    var parent = document.getElementById('competitions-list');
		parent.addEventListener('click', function (e) {
			this.className = ' hidden';
			document.getElementById('clubs').innerHTML = '<button id="back-to-competitions">Go back and select another Competition</button><h2>'+e.target.textContent+'</h2>';
		    makeRequest('http://api.football-data.org/v1/competitions/'+e.target.dataset.leagueid+'/teams',teamData);
		    document.getElementById('back-to-competitions').addEventListener('click', function(e) { 
				parent.className = '';
				document.getElementById('clubs').innerHTML = '';
				document.getElementById('teams').innerHTML = '';
			});
		});
		
		
	   } else {
        alert('There was a problem with the request.');
      }
    }
  }
  
  // Team Data
  function teamData() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
	    teamsList = [];  
        var teData = JSON.parse(httpRequest.responseText);
        var te;
        for(te=0;te<teData.teams.length;te++){
	        teamsList.push('<li class="club" data-badge="'+teData.teams[te].crestUrl+'" data-fixtures="'+teData.teams[te]._links.fixtures.href+'">'+teData.teams[te].name+'</li>');
	    }
	    teamsList.push('</ul>');
	    teamsList.unshift('<ul id="teams-list">');
	    teamsListOutput = teamsList.join("");
	    document.getElementById("teams").innerHTML = teamsListOutput;
	    var teamParent = document.getElementById('teams-list');
		teamParent.addEventListener('click', function (e) {
			this.className = ' hidden';
			document.getElementById('clubs').innerHTML = '';
			document.getElementById('teams').innerHTML = '<h2>'+e.target.textContent+'</h2>';
		    makeRequest(e.target.dataset.fixtures,fixturesData);
		});
        
	   } else {
        alert('There was a problem with the request.');
      }
    }
  }
  
  // Fixtures Data
  function fixturesData() {
	 if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var fdata = JSON.parse(httpRequest.responseText);
        var fd;
        var fixturesList = [];
        for(fd=0;fd<fdata.fixtures.length;fd++){
	        fixturesList.push('<div class="fixture"><h3>Matchday '+fdata.fixtures[fd].matchday+'</h3><span class="home-team">'+fdata.fixtures[fd].homeTeamName+'</span> vs <span class="away-team">'+fdata.fixtures[fd].awayTeamName+'</span></div>');
	    }
        document.getElementById("fixtures").innerHTML = fixturesList.join("");
        
	   } else {
        alert('There was a problem with the request.');
      }
    } 
  }
  
  
  
 
  // Controller - User Triggers (view.js file?)
  document.getElementById('get-competitions').onclick = function() { 
	  makeRequest('http://api.football-data.org/v1/competitions/?season=2016',competitionsData); 
	  this.className = ' hidden';
  };
  					 
			  
})();