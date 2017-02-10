function loadScript(url,callback){var script=document.createElement("script")
script.type="text/javascript";if(script.readyState){script.onreadystatechange=function(){if(script.readyState=="loaded"||script.readyState=="complete"){script.onreadystatechange=null;callback();}};}else{script.onload=function(){callback();};}
script.src=url;document.body.appendChild(script);}

loadScript("js/app.js", function(){
	
	// Set Global Variables
	var dataUrl = App.settings.dataUrl, 
	competitionData, 
	competitionListUl = document.getElementById('competitions-list'),
	competitionsList = [],
	clubData,
	clubHtmlContainer =  document.getElementById('clubs'),
	clubListUl = document.getElementById('clubs-list'),
	clubList = [],
	clubListOutput,
	backToCompetitions = document.getElementById('back-to-competitions'),
	chosenClubData,
	chosenClubFixturesList = [],
	fixturesHtmlContainer = document.getElementById("fixtures"),
	clubName,
	hiddenClass = ' hidden';
	
	// Get Competitions List
  	document.getElementById('get-competitions').onclick = function() { 
	  	App.getData(dataUrl+"/competitions/?season=2016").then(function(response) {
		  	competitionData = JSON.parse(response);
		  	for(var i=0;i<competitionData.length;i++){
	        	competitionsList.push('<li class="league" data-leagueid="'+competitionData[i].id+'">'+competitionData[i].caption+'</li>');
		    }
		    competitionsListOutput = competitionsList.join("");
		    competitionListUl.innerHTML = competitionsListOutput;
		    
		    // Store Competition Id's
		    console.log(competitionData);
		    
		}, function(error) {
			console.error("Failed!", error);
		});
		this.className = hiddenClass;
	};  
	
	// Select a Competition and Load Teams
	competitionListUl.addEventListener('click', function (e) {
		this.className = 'options-list '+hiddenClass+'';
		clubHtmlContainer.querySelector(".club-title").innerHTML = e.target.textContent;
		clubHtmlContainer.className = '';
		App.getData(dataUrl+'/competitions/'+e.target.dataset.leagueid+'/teams').then(function(response) {
		  	clubData = JSON.parse(response);
		  	console.log(clubData);
	        for(var i=0;i<clubData.teams.length;i++){
		        clubList.push('<li class="club" data-name="'+clubData.teams[i].name+'" data-url="'+clubData.teams[i]._links.self.href+'">'+clubData.teams[i].name+'<button class="view-club small-button button grey-button">View</button><button class="follow-club small-button button">Follow</button></li>');
		    }
		    clubListOutput = clubList.join("");
		    clubListUl.innerHTML = clubListOutput;
		}, function(error) {
			console.error("Failed!", error);
		});
	});
	
	// Go back to Competition Selection
	backToCompetitions.addEventListener('click', function(e) { 
		competitionListUl.className = 'options-list';
		clubHtmlContainer.className = 'hidden';
		clubList.length = 0;
		clubListUl.innerHTML = '';
	});
	
	// Follow a Club
	clubListUl.addEventListener('click', function (e) {
		App.addClub(e.target.parentNode.dataset.name,e.target.parentNode.dataset.url);
	});
	
	/*clubListUl.addEventListener('click', function (e) {
		this.className = ' hidden';
		clubHtmlContainer.innerHTML = '<h2>'+e.target.textContent+'</h2>';
		App.getData(e.target.dataset.fixtures).then(function(response) {
			var chosenClubData = JSON.parse(response);
	        for(var i=0;i<chosenClubData.fixtures.length;i++){
		        chosenClubFixturesList.push('<div class="fixture"><h3>Matchday '+chosenClubData.fixtures[i].matchday+'</h3><span class="home-team">'+chosenClubData.fixtures[i].homeTeamName+'</span> vs <span class="away-team">'+chosenClubData.fixtures[i].awayTeamName+'</span></div>');
		    }
	        fixturesHtmlContainer.innerHTML = chosenClubFixturesList.join("");
		}, function(error) {
			console.error("Failed!", error);
		});
	}); */
	
	
			
});



