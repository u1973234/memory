function scores(){
	loadpage("./html/scores.html")
}

function phaser_games(){
	
	var newName = prompt("User name");
	if (namePl != newName){
		numberPl += 1;
		namePl = newName;
		maxScorePl = 0
	}
	loadpage("./html/gameSelector.html");
}

function phaser_game_one(){
	loadpage("./phasergameOne.html");
}

function phaser_game_two(){
	var round_data = {
		cards:2, dificulty:"easy", player:namePl, maxScore:maxScorePl, actScore:0, number:numberPl
	};
	localStorage.setItem("round", JSON.stringify(round_data));
	loadpage("./phasergameTwo.html");
}

function menu(){
	loadpage("../");
}

function exit (){
	if (namePl != ""){
		alert("Leaving " + namePl + "'s game");
	}
	namePl = "";
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./html/load.html");
}

